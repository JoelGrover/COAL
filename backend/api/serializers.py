from rest_framework import serializers
from .models import *

class VesselInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VesselInfo
        fields = '__all__'

class MoistureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moisture
        fields = '__all__'

class TableDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableData
        fields = '__all__'

class UltimateDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UltimateData
        fields = '__all__'

class PetrographyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetrographyData
        fields = '__all__'

class AshDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AshData
        fields = '__all__'

class SlaggingDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlaggingData
        fields = '__all__'

class AdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalInfo
        fields = '__all__'
