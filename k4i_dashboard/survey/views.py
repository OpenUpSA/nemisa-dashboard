from django.views import generic

from rest_framework import viewsets

from .serializers import SurveyResponseSerializer
from .models import SurveyResponse

class SurveyResponseViewSet(viewsets.ModelViewSet):
    queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer