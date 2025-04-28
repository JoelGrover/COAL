# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.db import transaction
# from .models import (
#     VesselInfo, Moisture, TableData, UltimateData, 
#     PetrographyData, AshData, SlaggingData, AdditionalInfo
# )
# import json
# from decimal import Decimal, InvalidOperation
# import logging
# logger = logging.getLogger(__name__)

# def safe_decimal(value):
#     try:
#         return Decimal(value)
#     except Exception as e:
#         logger.error(f"Error in converting value to decimal: {value}, Error: {str(e)}")
#         return Decimal('0')

# @csrf_exempt
# def save_coal1_report(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             logger.info(f"Received data: {data}") 
            
#             with transaction.atomic():
#                 # Create vessel info
#                 vessel_info = VesselInfo.objects.create(
#                     vessel_name=data['moistureValues'].get('Vessel Name', ''),
#                     vessel_type=data['moistureValues'].get('Vessel Type', ''),
#                     origin=data['moistureValues'].get('Origin', ''),
#                     load_port=data['moistureValues'].get('Load Port', ''),
#                     destination_port=data['moistureValues'].get('Destination Port', ''),
#                     gcv=safe_decimal(data['moistureValues'].get('GCV', '0')),
#                     ncv=safe_decimal(data['moistureValues'].get('NCV', '0')),
#                     hgi=safe_decimal(data['moistureValues'].get('HGI', '0'))
#                 )
                
#                 # Create moisture data
#                 moisture = Moisture.objects.create(
#                     vessel=vessel_info,
#                     tm=safe_decimal(data['moistureValues'].get('TM', '0')),
#                     im=safe_decimal(data['moistureValues'].get('IM', '0')),
#                     basis_of_measurement=data['moistureValues'].get('basis_of_measurement', '')
#                 )
                
#                 # Create table data (proximate analysis)
#                 for item in data.get('tableData', []):
#                     TableData.objects.create(
#                         vessel=vessel_info,
#                         parameter=item.get('parameter', ''),
#                         arb=safe_decimal(item.get('arb', '0')),
#                         adb=safe_decimal(item.get('adb', '0')),
#                         db=safe_decimal(item.get('db', '0'))
#                     )
                
#                 # Create ultimate data (lab)
#                 for item in data.get('ultimateData', []):
#                     UltimateData.objects.create(
#                         vessel=vessel_info,
#                         parameter=item.get('parameter', ''),
#                         arb=safe_decimal(item.get('arb', '0')),
#                         adb=safe_decimal(item.get('adb', '0')),
#                         db=safe_decimal(item.get('db', '0'))
#                     )
#                 for item in data.get('ultimateData1', []):
#                     UltimateData1.objects.create(
#                         vessel=vessel_info,
#                         parameter=item.get('parameter', ''),
#                         arb=safe_decimal(item.get('arb', '0')),
#                         adb=safe_decimal(item.get('adb', '0')),
#                         db=safe_decimal(item.get('db', '0'))
#                     )
                
#                 # Create petrography data
#                 for item in data.get('petrographyData', []):
#                     PetrographyData.objects.create(
#                         vessel=vessel_info,
#                         parameter=item.get('parameter', ''),
#                         value=safe_decimal(item.get('value', '0')),
#                         mmr=item.get('mmr', '')
#                     )
                
#                 # Create ash data
#                 for item in data.get('ashData', []):
#                     AshData.objects.create(
#                         vessel=vessel_info,
#                         parameter=item.get('parameter', ''),
#                         key=item.get('key', ''),
#                         value=safe_decimal(item.get('value', '0'))
#                     )
                
#                 # Create slagging data
#                 for item in data.get('slaggingData', []):
#                     SlaggingData.objects.create(
#                         vessel=vessel_info,
#                         base_acid_ratio=safe_decimal(item.get('base_acid_ratio', '0')),
#                         M1=safe_decimal(item.get('M1', '0')),
#                         C1=safe_decimal(item.get('C1', '0')),
#                         T250_temperature=safe_decimal(item.get('T250_temperature', '0')),
#                         slagging_factor=safe_decimal(item.get('slagging_factor', '0')),
#                         iron_calcium_ratio=safe_decimal(item.get('iron_calcium_ratio', '0')),
#                         iron_plus_calcium=safe_decimal(item.get('iron_plus_calcium', '0'))
#                     )
                
#                 # Create additional info
#                 AdditionalInfo.objects.create(
#                     vessel=vessel_info,
#                     remark=data.get('remark', '')
#                 )
            
#             return JsonResponse({'status': 'success', 'message': 'Coal report saved successfully'})
        
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
#     elif request.method == 'GET':
#         try:
#             # Get all vessel names
#             vessels = list(VesselInfo.objects.values_list('vessel_name', flat=True))
            
#             # If a specific vessel is requested in the URL
#             vessel_name = request.GET.get('vessel')
#             if vessel_name:
#                 try:
#                     vessel = VesselInfo.objects.get(vessel_name=vessel_name)
                    
#                     # Collect all data for this vessel
#                     vessel_data = {}
                    
#                     # Add vessel info
#                     vessel_data.update({
#                         "Vessel Name": vessel.vessel_name,
#                         "Vessel Type": vessel.vessel_type,
#                         "Origin": vessel.origin,
#                         "Load Port": vessel.load_port,
#                         "Destination Port": vessel.destination_port,
#                         "GCV": str(vessel.gcv),
#                         "NCV": str(vessel.ncv),
#                         "HGI": str(vessel.hgi)
#                     })
                    
#                     # Add moisture data
#                     try:
#                         moisture = Moisture.objects.get(vessel=vessel)
#                         vessel_data.update({
#                             "TM-ARB": str(moisture.tm),
#                             "IM": str(moisture.im),
#                             "Basis of Measurement": moisture.basis_of_measurement
#                         })
#                     except Moisture.DoesNotExist:
#                         pass
                    
#                     # Add proximate analysis data
#                     for item in TableData.objects.filter(vessel=vessel):
#                         key = item.parameter
#                         vessel_data[f"{key}-ARB"] = str(item.arb)
#                         vessel_data[f"{key}-ADB"] = str(item.adb)
#                         vessel_data[f"{key}-DB"] = str(item.db)
                    
#                     # Add ultimate analysis data
#                     for item in UltimateData.objects.filter(vessel=vessel):
#                         key = item.parameter
#                         vessel_data[key] = str(item.arb)  # Using ARB values for the report
                    
#                     # Add ash data
#                     for item in AshData.objects.filter(vessel=vessel):
#                         vessel_data[item.parameter] = str(item.value)
                    
#                     # Add slagging data
#                     for item in SlaggingData.objects.filter(vessel=vessel):
#                         vessel_data[item.parameter] = str(item.value)
                    
#                     # Add additional info
#                     try:
#                         additional = AdditionalInfo.objects.get(vessel=vessel)
#                         vessel_data["MMR"] = additional.mmr
#                         vessel_data["Remarks"] = additional.remark
#                     except AdditionalInfo.DoesNotExist:
#                         pass
                    
#                     return JsonResponse(vessel_data)
                
#                 except VesselInfo.DoesNotExist:
#                     return JsonResponse({'status': 'error', 'message': 'Vessel not found'}, status=404)
            
#             return JsonResponse(vessels, safe=False)
        
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    
#     return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


# # Helper function to safely convert values to Decimal



# # API endpoints for the slagging component
# @csrf_exempt
# def get_vessels(request):
#     try:
#         vessels = list(VesselInfo.objects.values_list('vessel_name', flat=True))
#         return JsonResponse(vessels, safe=False)
#     except Exception as e:
#         return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

# @csrf_exempt
# def get_vessel_data(request, vessel_name):
#     try:
#         vessel = VesselInfo.objects.get(vessel_name=vessel_name)
        
#         # Collect all data for this vessel
#         vessel_data = {}
        
#         # Add vessel info
#         vessel_data.update({
#             "Vessel Name": vessel.vessel_name,
#             "Vessel Type": vessel.vessel_type,
#             "Origin": vessel.origin,
#             "Load Port": vessel.load_port,
#             "Destination Port": vessel.destination_port,
#             "GCV of Coal (Load Port)_ARB": str(vessel.gcv),
#             "NCV": str(vessel.ncv),
#             "HGI": str(vessel.hgi)
#         })
        
#         # Add moisture data
#         try:
#             moisture = Moisture.objects.get(vessel=vessel)
#             vessel_data.update({
#                 "TM-ARB": str(moisture.tm),
#                 "IM": str(moisture.im),
#                 "Basis of Measurement": moisture.basis_of_measurement
#             })
#         except Moisture.DoesNotExist:
#             pass
        
#         # Add proximate analysis data
#         for item in TableData.objects.filter(vessel=vessel):
#             if item.parameter == "FC":
#                 vessel_data["FC-ARB"] = str(item.arb)
#             elif item.parameter == "VM":
#                 vessel_data["VM-ARB"] = str(item.arb)
#             elif item.parameter == "Ash_PA":
#                 vessel_data["ASH-ARB"] = str(item.arb)
        
#         # Add ultimate analysis data
#         for item in UltimateData.objects.filter(vessel=vessel):
#             vessel_data[item.parameter] = str(item.arb)
        
#         # Add ash data
#         for item in AshData.objects.filter(vessel=vessel):
#             if item.key == "sio2":
#                 vessel_data["SiO₂"] = str(item.value)
#             elif item.key == "al2o3":
#                 vessel_data["Al₂O₃"] = str(item.value)
#             elif item.key == "fe2o3":
#                 vessel_data["Fe₂O₃"] = str(item.value)
#             elif item.key == "cao":
#                 vessel_data["CaO"] = str(item.value)
#             elif item.key == "mgo":
#                 vessel_data["MgO"] = str(item.value)
#             elif item.key == "na2o":
#                 vessel_data["Na₂O"] = str(item.value)
#             elif item.key == "k2o":
#                 vessel_data["K₂O"] = str(item.value)
#             elif item.key == "tio2":
#                 vessel_data["TiO₂"] = str(item.value)
#             else:
#                 vessel_data[item.parameter] = str(item.value)
        
#         # Add slagging data
#         for item in SlaggingData.objects.filter(vessel=vessel):
#             if item.key == "hemispherical_temp":
#                 vessel_data["Hemispherical Temp HT"] = str(item.value)
#                 vessel_data["Ash Fusion FT"] = str(item.value)  # Duplicate for compatibility
#             elif item.key == "initial_deformation_temp":
#                 vessel_data["INITIAL Deformation Temp IT"] = str(item.value)
#             elif item.key == "baseAcidRatio":
#                 vessel_data["Base-acid ratio"] = str(item.value)
#             elif item.key == "T250Temp":
#                 vessel_data["T250 Temperature"] = str(item.value)
#             elif item.key == "slaggingFactor":
#                 vessel_data["Slagging Factor"] = str(item.value)
#             elif item.key == "ironCalciumRatio":
#                 vessel_data["Iron Calcium Ratio"] = str(item.value)
#             elif item.key == "ironPlusCalcium":
#                 vessel_data["Iron plus Calcium"] = str(item.value)
#             elif item.key == "slaggingIndex":
#                 vessel_data["Slagging Index"] = str(item.value)
#             elif item.key == "silicaPercent":
#                 vessel_data["Silica %"] = str(item.value)
#             else:
#                 vessel_data[item.parameter] = str(item.value)
        
#         return JsonResponse(vessel_data)
    
#     except VesselInfo.DoesNotExist:
#         return JsonResponse({'status': 'error', 'message': f'Vessel {vessel_name} not found'}, status=404)
#     except Exception as e:
#         return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
import logging
import json
from decimal import Decimal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from .models import (
    VesselInfo, Moisture, TableData, UltimateData, UltimateData1,
    PetrographyData, AshData, SlaggingData, AdditionalInfo
)

logger = logging.getLogger(__name__)

def safe_decimal(value):
    """Convert a value to Decimal safely, logging any errors."""
    try:
        return Decimal(value)
    except Exception as e:
        logger.error(f"Error converting value to decimal: {value}, Error: {str(e)}")
        return Decimal('0')

@csrf_exempt
def save_coal1_report(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info(f"Received data: {data}")

            with transaction.atomic():
                # Create vessel info
                vessel_info = VesselInfo.objects.create(
                    vessel_name=data.get('moistureValues', {}).get('Vessel Name', ''),
                    vessel_type=data.get('moistureValues', {}).get('Vessel Type', ''),
                    origin=data.get('moistureValues', {}).get('Origin', ''),
                    load_port=data.get('moistureValues', {}).get('Load Port', ''),
                    destination_port=data.get('moistureValues', {}).get('Destination Port', ''),
                    gcv=safe_decimal(data.get('moistureValues', {}).get('GCV', '0')),
                    ncv=safe_decimal(data.get('moistureValues', {}).get('NCV', '0')),
                    hgi=safe_decimal(data.get('moistureValues', {}).get('HGI', '0'))
                )

                # Create moisture data
                Moisture.objects.create(
                    vessel=vessel_info,
                    tm=safe_decimal(data.get('moistureValues', {}).get('TM', '0')),
                    im=safe_decimal(data.get('moistureValues', {}).get('IM', '0')),
                    basis_of_measurement=data.get('moistureValues', {}).get('basis_of_measurement', '')
                )

                # Create table data (proximate analysis)
                for item in data.get('tableData', []):
                    TableData.objects.create(
                        vessel=vessel_info,
                        parameter=item.get('parameter', ''),
                        arb=safe_decimal(item.get('arb', '0')),
                        adb=safe_decimal(item.get('adb', '0')),
                        db=safe_decimal(item.get('db', '0'))
                    )

                # Create ultimate data (lab)
                for item in data.get('ultimateData', []):
                    UltimateData.objects.create(
                        vessel=vessel_info,
                        parameter=item.get('parameter', ''),
                        arb=safe_decimal(item.get('arb', '0')),
                        adb=safe_decimal(item.get('adb', '0')),
                        db=safe_decimal(item.get('db', '0'))
                    )

                # Create ultimate data 1 (calculated)
                for item in data.get('ultimateData1', []):
                    UltimateData1.objects.create(
                        vessel=vessel_info,
                        parameter=item.get('parameter', ''),
                        arb=safe_decimal(item.get('arb', '0')),
                        adb=safe_decimal(item.get('adb', '0')),
                        db=safe_decimal(item.get('db', '0'))
                    )

                # Create petrography data
                for item in data.get('petrographyData', []):
                    try:
                        PetrographyData.objects.create(
                            vessel=vessel_info,
                            parameter=item.get('parameter', ''),
                            value=safe_decimal(item.get('value', '0')),
                            mmr=data.get('mmr', '')  # Ensure this key exists in JSON
                        )
                    except Exception as e:
                        logger.error(f"Error processing petrography data: {str(e)}")

                # Create ash data
                for item in data.get('ashData', []):
                    AshData.objects.create(
                        vessel=vessel_info,
                        parameter=item.get('parameter', ''),
                        key=item.get('key', ''),
                        value=safe_decimal(item.get('value', '0'))
                    )

                slag = SlaggingData(vessel=vessel_info)

                for item in data.get('slaggingData', []):
                    key = item.get("key")
                    value = item.get("value")
                    if hasattr(slag, key):
                        setattr(slag, key, safe_decimal(value))

                slag.calculate_metrics()
                slag.save()

             # Create additional info
                AdditionalInfo.objects.create(
                    vessel=vessel_info,
                    remark=data.get('remark', '')
                )

            return JsonResponse({'status': 'success', 'message': 'Coal report saved successfully'})

        except Exception as e:
            logger.error(f"Error saving coal report: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    elif request.method == 'GET':
        try:
            vessels = list(VesselInfo.objects.values_list('vessel_name', flat=True))
            vessel_name = request.GET.get('vessel')

            if vessel_name:
                try:
                    vessel = VesselInfo.objects.get(vessel_name=vessel_name)
                    vessel_data = {
                        "Vessel Name": vessel.vessel_name,
                        "Vessel Type": vessel.vessel_type,
                        "Origin": vessel.origin,
                        "Load Port": vessel.load_port,
                        "Destination Port": vessel.destination_port,
                        "GCV": str(vessel.gcv),
                        "NCV": str(vessel.ncv),
                        "HGI": str(vessel.hgi),
                    }

                    # Add moisture data
                    moisture = Moisture.objects.filter(vessel=vessel).first()
                    if moisture:
                        vessel_data.update({
                            "TM-ARB": str(moisture.tm),
                            "IM": str(moisture.im),
                            "Basis of Measurement": moisture.basis_of_measurement
                        })

                    # Add proximate analysis data
                    for item in TableData.objects.filter(vessel=vessel):
                        vessel_data[f"{item.parameter}-ARB"] = str(item.arb)
                        vessel_data[f"{item.parameter}-ADB"] = str(item.adb)
                        vessel_data[f"{item.parameter}-DB"] = str(item.db)

                    # Add ash data
                    for item in AshData.objects.filter(vessel=vessel):
                        vessel_data[item.parameter] = str(item.value)

                    # Add slagging data
                    for item in SlaggingData.objects.filter(vessel=vessel):
                        vessel_data[item.parameter] = str(item.value)

                    # Add additional info
                    additional = AdditionalInfo.objects.filter(vessel=vessel).first()
                    if additional:
                        vessel_data["MMR"] = additional.mmr
                        vessel_data["Remarks"] = additional.remark

                    return JsonResponse(vessel_data)

                except VesselInfo.DoesNotExist:
                    return JsonResponse({'status': 'error', 'message': 'Vessel not found'}, status=404)

            return JsonResponse(vessels, safe=False)

        except Exception as e:
            logger.error(f"Error fetching vessel data: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

# API endpoints for the slagging component
@csrf_exempt
def get_vessels(request):
    try:
        vessels = list(VesselInfo.objects.values_list('vessel_name', flat=True))
        return JsonResponse(vessels, safe=False)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
@csrf_exempt
def get_vessel_data(request, vessel_name):
    try:
        # Use .filter() instead of .get() to handle multiple results gracefully
        vessels = VesselInfo.objects.filter(vessel_name=vessel_name)

        # If no vessels were found
        if not vessels.exists():
            return JsonResponse({'status': 'error', 'message': f'Vessel {vessel_name} not found'}, status=404)

        # If multiple vessels are found, you can either:
        # 1. Pick the first one (if you only expect one)
        # 2. Return a list of vessels (if multiple matches are expected)
        vessel = vessels.first()  # If you want to pick the first one

        # Collect all data for this vessel
        vessel_data = {}

        # Add vessel info
        vessel_data.update({
            "Vessel Name": vessel.vessel_name,
            "Vessel Type": vessel.vessel_type,
            "Origin": vessel.origin,
            "Load Port": vessel.load_port,
            "Destination Port": vessel.destination_port,
            "GCV of Coal (Load Port)_ARB": str(vessel.gcv),
            "NCV": str(vessel.ncv),
            "HGI": str(vessel.hgi)
        })

        # Add moisture data
        try:
            moisture = Moisture.objects.get(vessel=vessel)
            vessel_data.update({
                "TM-ARB": str(moisture.tm),
                "IM": str(moisture.im),
                "Basis of Measurement": moisture.basis_of_measurement
            })
        except Moisture.DoesNotExist:
            pass
        vessel_data = {}
        # Add proximate analysis data
        fc_value = None
        vm_value = None
        ash_pa_present = False

        for item in TableData.objects.filter(vessel=vessel):
            if item.parameter == "FC":
                vessel_data["FC-ARB"] = str(item.arb)
                vessel_data["FC/VM Ratio"] = str(item.fc_vm_arb) if item.fc_vm_arb is not None else "N/A"
                fc_value = item.arb  # optional

            elif item.parameter == "VM":
                vessel_data["VM-ARB"] = str(item.arb)
                vm_value = item.arb  # optional

            elif item.parameter == "Ash_PA":
                vessel_data["ASH-ARB"] = str(item.arb)
                ash_pa_present = True  # Set flag if Ash_PA is found

# Run boiler efficiency logic only if Ash_PA was present
        if ash_pa_present:
            for item in TableData.objects.filter(vessel=vessel):
                if item.parameter == "ASH_PA":
                    vessel_data["Boiler Efficiency"] = (
                        str(item.boiler_efficiency) if item.boiler_efficiency is not None else "N/A"
                    )
                    break 


        # Add ultimate analysis data
        for item in UltimateData.objects.filter(vessel=vessel):
            vessel_data[item.parameter] = str(item.arb)
        for item in UltimateData1.objects.filter(vessel=vessel):
            vessel_data[item.parameter] = str(item.arb)

        # Add ash data
        for item in AshData.objects.filter(vessel=vessel):
            if item.key == "sio2":
                vessel_data["SiO₂"] = str(item.value)
            elif item.key == "al2o3":
                vessel_data["Al₂O₃"] = str(item.value)
            elif item.key == "fe2o3":
                vessel_data["Fe₂O₃"] = str(item.value)
            elif item.key == "cao":
                vessel_data["CaO"] = str(item.value)
            elif item.key == "mgo":
                vessel_data["MgO"] = str(item.value)
            elif item.key == "na2o":
                vessel_data["Na₂O"] = str(item.value)
            elif item.key == "k2o":
                vessel_data["K₂O"] = str(item.value)
            elif item.key == "tio2":
                vessel_data["TiO₂"] = str(item.value)
            else:
                vessel_data[item.parameter] = str(item.value)

        
        # Add slagging data
        for item in SlaggingData.objects.filter(vessel=vessel):
            if item.hemispherical_temp:
                vessel_data["Hemispherical Temp HT"] = str(item.hemispherical_temp)
                vessel_data["Ash Fusion FT"] = str(item.hemispherical_temp)  # Duplicate for compatibility
            if item.initial_deformation_temp:
                vessel_data["INITIAL Deformation Temp IT"] = str(item.initial_deformation_temp)
            if item.base_acid_ratio:
                vessel_data["Base-acid ratio"] = str(item.base_acid_ratio)
            if item.T250_temperature:
                vessel_data["T250 Temperature"] = str(item.T250_temperature)
            if item.slagging_factor:
                vessel_data["Slagging Factor"] = str(item.slagging_factor)
            if item.iron_calcium_ratio:
                vessel_data["Iron Calcium Ratio"] = str(item.iron_calcium_ratio)
            if item.iron_plus_calcium:
                vessel_data["Iron plus Calcium"] = str(item.iron_plus_calcium)
            if item.slagging_index:
                vessel_data["Slagging Index"] = str(item.slagging_index)
            if item.silica_percent:
                vessel_data["Silica %"] = str(item.silica_percent)


            return JsonResponse(vessel_data)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def vessel_data(request, vessel_name):
    try:
        # Filter the VesselData based on the vessel_name
        vessel_data = VesselData.objects.filter(vessel_name=vessel_name)
        
        if not vessel_data:
            return JsonResponse({"error": "Vessel not found or no data available"}, status=404)

        # Prepare the data to be sent in the response
        data = [
            {
                "parameter": item.parameter,
                "value": item.value if item.value != "N/A" and item.value is not None else "No Data"
            }
            for item in vessel_data
        ]
        
        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
    
# views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Section
# const initialSections = [
#     {
#       title: "Ash Realization",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["VJN-Revenue-Domestic", "INR/MT", "128"],
#         ["VJN-Revenue-Export", "USD/MT", "1.6"],
#         ["VJN-Penalty", "INR/MT", "-180"],
#         ["VJN-Ash Placed", "%", "73"],
#         ["Ash Exported", "%", "0"],
#       ],
#     },
#     {
#       title: "Losses",
#       columns: ["Loss", "UOM", "Value", "Edit"],
#       rows: [
#         ["Transit loss", "%", "1"],
#         ["Handling losses", "%", "0.5"],
#         ["CV Quality loss", "%", "0.8"],
#       ],
#     },
#     {
#       title: "Holding Period",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["LC Opening to Discharge", "MT", "40"],
#         ["Unloading at Port", "Days", "5"],
#         ["Road-Rake Movement", "Days", "5"],
#         ["Consumption for single port", "Days", "16"],
#         ["Extra-Addition for Twin-Port-Movement", "Days", "12"],
#       ],
#     },
#     {
#       title: "Rake Transit Time",
#       columns: ["Discharge Port", "No. of Days", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Commerical Fixed Inputs",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["JITPL Margin", "%", "1.00"],
#         ["Clean Energy Cess", "INR/MT", "400"],
#         ["Stamp Duty", "%", "0.10"],
#         ["Demmurage", "USD/MT", "0.00"],
#         ["Manufacture Margin", "%", "0.00"],
#       ],
#     },
#     {
#       title: "Technical Fixed Inputs",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["Reference Air Temperature", "degree C", "33.7994"],
#         ["Partial Pressure", "KSC", "0.0703"],
#         ["Weight of water vapour per kg of dry air", "Kg/Kg", "0.210"],
#         ["Temp of bottom ash above ambient", "degree C", "600.00"],
#         ["Distribution of fly ash", "%", "90.00"],
#         ["Instantaneous SP heat of flue gas at TRA", "Kg/Kg/degree C", "0.9920"],
#         ["Instantaneous SP heat of flue gas at Tg", "Kg/Kg/degree C", "1.0780"],
#         ["Sensible heat of bottom ash", "Kg/Kg/degree C", "0.2500"],
#         ["Specific head of fly ash", "Kg/Kg/degree C", "0.2000"],
#         ["Manufacture margin and upaccounted", "%", "0.7400"],
#       ],
#     },
#     {
#       title: "Financing Cost",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["LC", "%", "1.00"],
#         ["Imported Cost of Capital", "%p.a.", "0.50"],
#         ["Supplier's Cost", "%p.a.", "5.1"],
#         ["Hedging Cost", "%p.a.", "0.60"],
#         ["Free Cashflows Cost of Capital", "%p.a.", "4.50"],
#         ["Credit Line Cost", "%p.a.", "8.75"],
#       ],
#     },
#     {
#       title: "Import Duties",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["Australia", "%", "0.00"],
#         ["South African", "%", "2.75"],
#         ["Mozambique", "%", "0.00"],
#         ["Indonesia", "%", "0.00"],
#         ["Colombia", "%", "2.75"],
#         ["Russsian Fedration", "%", "2.75"],
#       ],
#     },
#     {
#       title: "GST on Import Duty and Freight",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["JSW Steel", "%", "0.00"],
#         ["JSW Energy", "%", "5.00"],
#       ],
#     },
#     {
#       title: "GST on PDA",
#       columns: ["Parameter", "UOM", "Value", "Edit"],
#       rows: [
#         ["JSW Steel", "%", "0.00"],
#         ["JSW Energy", "%", "18.00"],
#       ],
#     },
#     {
#       title: "Load Port Options",
#       columns: ["Country", "Load Port", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Discharge Port Options",
#       columns: ["Country", "Discharge Port", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Discharge Rate Options",
#       columns: ["Discharge Port", "Vessel Type", "MT/Hours", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Vessel",
#       columns: ["Type", "UOM", "Value", "Edit"],
#       rows: [
#         ["Cape", "kT", "150000.00"],
#         ["Panamax", "kT", "75000.00"],
#       ],
#     },
#     {
#       title: "Ocean Freight",
#       columns: ["Load Port", "Destination Port", "Plant", "Vessel Type", "USD/MT", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Rail/Road Transport(Inland Freight)",
#       columns: ["Port of Discharge", "Vessel Type", "INR/MT", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Indices",
#       columns: ["Coal Indices", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Port PDA for Full Shipment",
#       columns: ["Port", "Vessel Type", "Value", "Edit"],
#       rows: [],
#     },
#     {
#       title: "Port Handling Charges",
#       columns: ["Port", "Vessel Type", "Value", "Edit"],
#       rows: [],
#     },
#   ]

def get_or_create_sections():
    # Check if there are existing sections
    sections = Section.objects.all()
    
    if not sections:  # If no sections exist, create the default sections
        for section in initialSections:
            # Create a new Section record with columns and rows
            section_obj = Section(title=section["title"])
            section_obj.save_columns_and_rows(section["columns"], section["rows"])
    
    # Return the current sections from the database
    return Section.objects.all()

def sections_view(request):
    sections = get_or_create_sections()
    
    # Convert Section objects into the desired format
    sections_data = []
    for section in sections:
        sections_data.append({
            'title': section.title,
            'columns': section.get_columns(),
            'rows': section.get_rows()
        })
    
    return JsonResponse(sections_data, safe=False)

def update_section(request, section_id):
    section = Section.objects.get(id=section_id)
    
    # Update rows or columns based on your request data
    data = json.loads(request.body)
    if 'rows' in data:
        section.rows = json.dumps(data['rows'])
    if 'columns' in data:
        section.columns = json.dumps(data['columns'])
    
    section.save()
    return JsonResponse({'message': 'Section updated successfully'})

def get_sections(request):
    sections = Section.objects.all()
    data = [{
        "title": s.title,
        "columns": json.loads(s.columns),
        "rows": json.loads(s.rows)
    } for s in sections]
    return JsonResponse(data, safe=False)


@csrf_exempt
def add_row(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        section = Section.objects.get(title=data['sectionTitle'])
        section.add_row(data['row'])
        section.save()
        return JsonResponse({"status": "row added"})

@csrf_exempt
def update_row(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        section = Section.objects.get(title=data['sectionTitle'])
        section.update_row_value(
            data['rowIndex'], data['columnIndex'], data['newValue']
        )
        section.save()
        return JsonResponse({"status": "value updated"})

@csrf_exempt
def save_sections(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request
            data = json.loads(request.body)
            
            # Get sections data from the request
            sections_data = data.get('sections', [])
            
            # Validate that sections_data is a list
            if not isinstance(sections_data, list):
                return JsonResponse({'error': 'Invalid data format for sections'}, status=400)

            # Loop over each section and save or update it
            for section_data in sections_data:
                title = section_data.get('title')
                columns = json.dumps(section_data.get('columns', []))
                rows = json.dumps(section_data.get('rows', []))

                if not title:
                    return JsonResponse({'error': 'Section title is required'}, status=400)

                # Update if exists, else create a new section
                section, created = Section.objects.update_or_create(
                    title=title,
                    defaults={
                        'columns': columns,
                        'rows': rows,
                    }
                )

            return JsonResponse({'status': 'Sections saved successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
@csrf_exempt
def delete_row(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            section = Section.objects.get(title=data['sectionTitle'])
            
            # Get the rows and remove the specified row
            rows = json.loads(section.rows)
            row_index = data['rowIndex']
            
            if row_index < len(rows):
                del rows[row_index]
            
            # Update the section with the new rows
            section.rows = json.dumps(rows)
            section.save()

            return JsonResponse({"status": "row deleted successfully"})
        
        except Section.DoesNotExist:
            return JsonResponse({"error": "Section not found"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid HTTP method"}, status=405)

# api/views.py

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
import json
from .models import CustomUser

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        department = data.get('department')

        if not (name and email and password and department):
            return JsonResponse({'error': 'Please fill all fields'}, status=400)

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered'}, status=400)

        user = CustomUser.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
            department=department
        )
        return JsonResponse({'message': 'User registered successfully'}, status=201)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)
