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

    def create(self, data):
        survey = self.context['request'].query_params.get('survey', None)
        data['survey'] = Survey.objects.get(id=survey)
        return SurveyResponse.objects.create(**data)
