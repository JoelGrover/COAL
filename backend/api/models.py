from django.db import models
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import math
import json
from decimal import Decimal
import math
import logging

logger = logging.getLogger(__name__)

class VesselInfo(models.Model):
    vessel_name = models.CharField(max_length=255)
    vessel_type = models.CharField(max_length=255)
    origin = models.CharField(max_length=255)
    load_port = models.CharField(max_length=255)
    destination_port = models.CharField(max_length=255)
    gcv = models.DecimalField(max_digits=10, decimal_places=2)
    ncv = models.DecimalField(max_digits=10, decimal_places=2)
    hgi = models.DecimalField(max_digits=10, decimal_places=2)

class Moisture(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    tm = models.DecimalField(max_digits=10, decimal_places=2)
    im = models.DecimalField(max_digits=10, decimal_places=2)

    basis_of_measurement = models.CharField(max_length=255, blank=True)  # Accepts any user input

    def save(self, *args, **kwargs):
        """Ensure that 'other_basis' is saved only when 'Others' is selected"""
        if self.basis_of_measurement != "Others":
            self.other_basis = None  # Clear custom value if another option is selected
        super().save(*args, **kwargs)
        
def update_boiler_efficiency(vessel):
    try:
        ash_row = TableData.objects.filter(vessel=vessel, parameter__iexact="ASH_PA").first()
        moisture = Moisture.objects.filter(vessel=vessel).first()
        hydrogen_row = UltimateData.objects.filter(vessel=vessel, parameter__iexact="Hydrogen").first()

        ash = float(ash_row.arb) if ash_row and ash_row.arb else None
        tm = float(moisture.tm) if moisture and moisture.tm else None
        hydrogen = float(hydrogen_row.arb) if hydrogen_row and hydrogen_row.arb else None
        gcv = float(vessel.gcv) if vessel.gcv else None

        if ash is not None and tm is not None and hydrogen is not None and gcv:
            efficiency = 92.5 - (50 * ash + 630 * (tm + 9 * hydrogen)) / max(gcv, 1)
            ash_row.boiler_efficiency = round(efficiency, 2)
            ash_row.save()
    except:
        pass  # Keep it simple: skip errors


class TableData(models.Model):
    vessel = models.ForeignKey('VesselInfo', on_delete=models.CASCADE)
    parameter = models.CharField(max_length=255)
    arb = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    adb = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    db = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    fc_vm_arb = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fc_vm_adb = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fc_vm_db = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    boiler_efficiency = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # New field
 
def save(self, *args, **kwargs):
    if self.parameter.upper() == "FC":
        vm_row = TableData.objects.filter(vessel=self.vessel, parameter__iexact="VM").first()
        if vm_row:
            self.fc_vm_arb = round((self.arb / vm_row.arb), 2) if (vm_row.arb and self.arb) else None
            self.fc_vm_adb = round((self.adb / vm_row.adb), 2) if (vm_row.adb and self.adb) else None
            self.fc_vm_db = round((self.db / vm_row.db), 2) if (vm_row.db and self.db) else None

    super().save(*args, **kwargs)

    if self.parameter.upper() == "ASH_PA":
        update_boiler_efficiency(self.vessel)

class UltimateData(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=255)
    arb = models.DecimalField(max_digits=10, decimal_places=2)
    adb = models.DecimalField(max_digits=10, decimal_places=2)
    db = models.DecimalField(max_digits=10, decimal_places=2)
    dulong_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New Field

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save first, so the current instance is in the DB

    # Fetch all parameters again
        data = UltimateData.objects.filter(vessel=self.vessel)
        carbon = data.filter(parameter="Carbon").values_list("db", flat=True).first()
        hydrogen = data.filter(parameter="Hydrogen").values_list("db", flat=True).first()
        oxygen = data.filter(parameter="Oxygen").values_list("db", flat=True).first()

    # Ensure all values exist
        if carbon is not None and hydrogen is not None and oxygen is not None:
            dulong = round((8080 * float(carbon) + 34500 * (float(hydrogen) - float(oxygen) / 8) + 2240 * float(oxygen)) / 100, 2)
            self.dulong_value = dulong
            UltimateData.objects.filter(id=self.id).update(dulong_value=dulong)
            
        else:
            print("⚠️ Missing Carbon, Hydrogen, or Oxygen data.")
            
        if self.parameter.upper() == "HYDROGEN":
            update_boiler_efficiency(self.vessel)

class UltimateData1(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=255)
    arb = models.DecimalField(max_digits=10, decimal_places=2)
    adb = models.DecimalField(max_digits=10, decimal_places=2)
    db = models.DecimalField(max_digits=10, decimal_places=2)
    dulong_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New Field

    def save(self, *args, **kwargs):
        """Calculate Dulong's value every time an entry is saved"""

        # Fetch Carbon, Hydrogen, and Oxygen values for the same vessel
        carbon = UltimateData1.objects.filter(vessel=self.vessel, parameter="Carbon").values_list("db", flat=True).first()
        hydrogen = UltimateData1.objects.filter(vessel=self.vessel, parameter="Hydrogen").values_list("db", flat=True).first()
        oxygen = UltimateData1.objects.filter(vessel=self.vessel, parameter="Oxygen").values_list("db", flat=True).first()

        # Ensure all three values exist before calculating
        if carbon is not None and hydrogen is not None and oxygen is not None:
            self.dulong_value = round((8080 * carbon + 34500 * (hydrogen - oxygen / 8) + 2240 * oxygen) / 100, 2)

        super().save(*args, **kwargs)  # Save the instance

class PetrographyData(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    total_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New Field
    vi_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New Field
    mmr = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        """Calculate total value and VI value"""
        # Calculate total value for the vessel
        # Include the current row's value in the total sum
        total = PetrographyData.objects.filter(vessel=self.vessel).aggregate(total=models.Sum("value"))["total"] or 0
        total += self.value or 0  # Add current row's value to the total
        
        self.total_value = round(total, 2)

        # Calculate VI value (sum of Vitrinite (Vol %) and Inertinite)
        vitrinite = PetrographyData.objects.filter(vessel=self.vessel, parameter="Vitrinite (Vol %)").first()
        inertinite = PetrographyData.objects.filter(vessel=self.vessel, parameter="Inertinite").first()

        if vitrinite and inertinite:
            self.vi_value = round(vitrinite.value + inertinite.value, 2)

        super().save(*args, **kwargs)

class AshData(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=255)
    key = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    total_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New Field

    def save(self, *args, **kwargs):
    # If updating an existing record
        if self.pk:
            total = AshData.objects.filter(vessel=self.vessel).exclude(pk=self.pk).aggregate(total=models.Sum("value"))["total"] or 0
        else:
        # New record, just aggregate all values for the vessel
            total = AshData.objects.filter(vessel=self.vessel).aggregate(total=models.Sum("value"))["total"] or 0
    
    # Add this row's value to the total
        total += self.value or 0

        self.total_value = round(total, 2)
        super().save(*args, **kwargs)


def safe_decimal(value):
    """Converts the value to Decimal, handling errors."""
    try:
        return Decimal(value)
    except Exception as e:
        logger.error(f"Error in converting value to decimal: {value}, Error: {str(e)}")
        return Decimal('0')

class SlaggingData(models.Model):
    vessel = models.ForeignKey('VesselInfo', on_delete=models.CASCADE)
    hemispherical_temp = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    initial_deformation_temp = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ash_fusion_temp = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    base_acid_ratio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    M1 = models.DecimalField(max_digits=10, decimal_places=5, null=True, blank=True)
    C1 = models.DecimalField(max_digits=10, decimal_places=5, null=True, blank=True)
    T250_temperature = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    slagging_factor = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    iron_calcium_ratio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    iron_plus_calcium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    slagging_index = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    silica_percent = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def safe_decimal(self, value):
        try:
            return Decimal(value) if value is not None else Decimal('0.00')
        except (ValueError, TypeError):
            return Decimal('0.00')

    def calculate_metrics(self):
        ash_data = AshData.objects.filter(vessel=self.vessel)

        def parse_value(param):
            return ash_data.filter(key=param).aggregate(models.Sum("value"))["value__sum"] or 0

        base = sum(self.safe_decimal(parse_value(k)) for k in ["cao", "mgo", "na2o", "k2o", "fe2o3"])
        acid = sum(self.safe_decimal(parse_value(k)) for k in ["sio2", "al2o3", "tio2"])

        self.base_acid_ratio = round(base / acid, 2) if acid else Decimal('0.00')

        sio2 = self.safe_decimal(parse_value("sio2"))
        al2o3 = self.safe_decimal(parse_value("al2o3"))
        fe2o3 = self.safe_decimal(parse_value("fe2o3"))
        cao = self.safe_decimal(parse_value("cao"))
        mgo = self.safe_decimal(parse_value("mgo"))
        so3 = self.safe_decimal(parse_value("so3"))

        self.M1 = round(0.00835 * float(sio2) + 0.00601 * float(al2o3) - 0.109, 5)
        self.C1 = round(0.0415 * float(sio2) + 0.0192 * float(al2o3) + 0.276 * float(fe2o3) + 0.016 * (float(cao) - 3.92), 5)

        log_value = math.log10(250)
        sqrt_value = ((self.M1 * 1e7) / log_value) - self.C1
        self.T250_temperature = round(math.sqrt(sqrt_value) + 150, 2) if sqrt_value > 0 else None

        self.slagging_factor = round(float(self.base_acid_ratio) * float(so3), 2)
        self.iron_calcium_ratio = round(float(fe2o3) / float(cao), 2) if cao else Decimal('0.00')
        self.iron_plus_calcium = round(float(fe2o3) + float(cao), 2)
        self.silica_percent = round(
            (float(sio2) * 100) / (float(sio2) + float(fe2o3) + float(cao) + float(mgo)), 2
        ) if sio2 else Decimal('0.00')
        if self.hemispherical_temp is not None and self.initial_deformation_temp is not None:
            self.slagging_index = round(
                self.hemispherical_temp + (4 * self.initial_deformation_temp) / 5, 2
            )
        else:
            self.slagging_index = None
        print({self.hemispherical_temp, self.initial_deformation_temp,self.ash_fusion_temp})
class AdditionalInfo(models.Model):
    vessel = models.ForeignKey(VesselInfo, on_delete=models.CASCADE)
    remark = models.TextField()


# models.py for logistics data 
from django.db import models
import json

class Section(models.Model):
    title = models.CharField(max_length=255)
    columns = models.TextField()  # store as JSON string
    rows = models.TextField(blank=True, default="[]")  # list of lists in JSON

    def get_rows(self):
        return json.loads(self.rows)

    def get_columns(self):
        return json.loads(self.columns)

    def add_row(self, row):
        data = self.get_rows()
        data.append(row)
        self.rows = json.dumps(data)

    def update_row_value(self, row_index, column_index, new_value):
        data = self.get_rows()
        data[row_index][column_index] = new_value
        self.rows = json.dumps(data)
    def save_columns_and_rows(self, columns, rows):
        self.columns = json.dumps(columns)
        self.rows = json.dumps(rows)
        self.save()

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.username

