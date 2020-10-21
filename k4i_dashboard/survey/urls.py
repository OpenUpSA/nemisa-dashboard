from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt

from rest_framework import routers

from . import views
from django.shortcuts import redirect

from django.views.generic.base import TemplateView, RedirectView

router = routers.DefaultRouter()
router.register(r'responses', views.SurveyResponseViewSet)

urlpatterns = [

    path('', views.Index.as_view()),
    path('index.html', RedirectView.as_view(url='/')),
    path('survey/index.html', RedirectView.as_view(url='/')),
    path('dashboard/index.html', RedirectView.as_view(url='/')),

    path('survey.html', RedirectView.as_view(url='/survey/')),
    path('dashboard/survey.html', RedirectView.as_view(url='/survey/')),
    path('individual-survey.html', RedirectView.as_view(url='/survey/')),
    path('survey/', csrf_exempt(views.Survey.as_view())),
    path('survey/individual-survey.html', RedirectView.as_view(url='/survey/')),

    path('dashboard.html', RedirectView.as_view(url='/dashboard/')),
    path('survey/dashboard.html', RedirectView.as_view(url='/dashboard/')),
    path('dashboard/dashboard.html', RedirectView.as_view(url='/dashboard/')),
    path('dashboard/', csrf_exempt(views.Dashboard.as_view())),


    path('js/<path:path>', RedirectView.as_view(url='/static/js/%(path)s')),
    path('css/<path:path>', RedirectView.as_view(url='/static/css/%(path)s')),
    path('scss/<path:path>', RedirectView.as_view(url='/static/scss/%(path)s')),
    path('fonts/<path:path>', RedirectView.as_view(url='/static/fonts/%(path)s')),
    path('images/<path:path>', RedirectView.as_view(url='/static/images/%(path)s')),

    path('survey/js/<path:path>', RedirectView.as_view(url='/static/js/%(path)s')),
    path('survey/css/<path:path>', RedirectView.as_view(url='/static/css/%(path)s')),
    path('survey/scss/<path:path>', RedirectView.as_view(url='/static/scss/%(path)s')),
    path('survey/fonts/<path:path>', RedirectView.as_view(url='/static/fonts/%(path)s')),
    path('survey/images/<path:path>', RedirectView.as_view(url='/static/images/%(path)s')),
    
    path('dashboard/js/<path:path>', RedirectView.as_view(url='/static/js/%(path)s')),
    path('dashboard/css/<path:path>', RedirectView.as_view(url='/static/css/%(path)s')),
    path('dashboard/scss/<path:path>', RedirectView.as_view(url='/static/scss/%(path)s')),
    path('dashboard/fonts/<path:path>', RedirectView.as_view(url='/static/fonts/%(path)s')),
    path('dashboard/images/<path:path>', RedirectView.as_view(url='/static/images/%(path)s')),

    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]