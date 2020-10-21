from django.views import generic

from rest_framework import viewsets

# from django.views.generic.base import TemplateView

from .serializers import SurveyResponseSerializer
from .models import SurveyResponse

class Index(generic.TemplateView):
    template_name = "survey/index.html"

class Dashboard(generic.TemplateView):
    template_name = "survey/dashboard.html"

class Survey(generic.TemplateView):
    template_name = "survey/individual_survey.html"


class SurveyResponseViewSet(viewsets.ModelViewSet):
    queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer