# serializers.py
from rest_framework import serializers

from .models import Survey, SurveyResponse


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('id', 'description',)


class SurveyResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = ('survey', 'data',)
