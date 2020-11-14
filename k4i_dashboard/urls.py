from django.contrib import admin
from django.urls import include, path

from django.views.generic.base import TemplateView, RedirectView

from . import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("about.html",  TemplateView.as_view(template_name='about.html')),
    path("contact.html",  TemplateView.as_view(template_name='contact.html')),
    path("index.html",  TemplateView.as_view(template_name='index.html')),
    path('industry-results.html', TemplateView.as_view(template_name="industry-results.html")),


    path("",  TemplateView.as_view(template_name='index.html')),

    path("", include("k4i_dashboard.survey.urls"),),

    path('js/<path:path>', RedirectView.as_view(url='/static/js/%(path)s')),
    path('css/<path:path>', RedirectView.as_view(url='/static/css/%(path)s')),
    path('scss/<path:path>', RedirectView.as_view(url='/static/scss/%(path)s')),
    path('fonts/<path:path>', RedirectView.as_view(url='/static/fonts/%(path)s')),
    path('images/<path:path>', RedirectView.as_view(url='/static/images/%(path)s')),
]

