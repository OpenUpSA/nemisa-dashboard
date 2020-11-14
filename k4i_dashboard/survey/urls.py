from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt

from rest_framework import routers

from . import views
from django.shortcuts import redirect

from django.views.generic.base import TemplateView, RedirectView

router = routers.DefaultRouter()
router.register(r'responses', views.SurveyResponseViewSet)

urlpatterns = [

    path('individual-survey.html', csrf_exempt(TemplateView.as_view(template_name="survey/individual_survey.html"))),

    # TODO
    # This file needs to be implemented in the same way as the individual-survey.html
    # Also need to  create an API endpoint
    path('industry-digital-skills-survey.html', TemplateView.as_view(template_name="survey/industry-digital-skills-survey.html")),

    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]