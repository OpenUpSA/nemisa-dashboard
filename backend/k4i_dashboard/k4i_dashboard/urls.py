from django.contrib import admin
from django.urls import include, path

from django.views.generic.base import TemplateView, RedirectView

from . import views


urlpatterns = [
    path("", include("k4i_dashboard.survey.urls"),),
    path("admin/", admin.site.urls),
]

