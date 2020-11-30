from django.views import generic

from rest_framework import viewsets

from .serializers import SurveySerializer, SurveyResponseSerializer
from .models import Survey, SurveyResponse


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer


class SurveyResponseViewSet(viewsets.ModelViewSet):
    # queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer

    def get_queryset(self):
        queryset = SurveyResponse.objects.all()
        survey = self.request.query_params.get('survey', None)
        if survey is not None:
            queryset = queryset.filter(survey=survey)
        return queryset
