"""
URL configuration for mypage project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from proyecto_inv import views
from django.views.generic.base import TemplateView  # new
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from proyecto_inv.views import get_areas, get_usuarios, get_niveledu, get_nivelsnii, delete_investigador, investigador_stats, proyecto_stats, evento_stats
from proyecto_inv.views import  InvestigadorListView, InvestigadorDetailView, especialidadesListView, especialidadesDetailView, UnidadesListView

schema_view = get_schema_view(
    openapi.Info(
        title="API de Investigadores",
        default_version="v1",
        description="Documentación de la API para el proyecto de investigadores",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="tuemail@ejemplo.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)




urlpatterns = [


    # path('api/usuarios/', get_usuarios, name='get_usuarios'),
    # path('api/areas/', get_areas, name='get_areas'),
    # path('api/niveledu/', get_niveledu, name='get_niveledu'),
    # path('api/nievlsnii/', get_nivelsnii, name='get_nivelsnii'),
    # path('api/Investigador/<int:id>/', delete_investigador, name='delete_investigador'),
    # # path('api/estudiantes/investigador/<int:investigador_id>/', EstudiantesPorInvestigadorView.as_view(), name='estudiantes-por-investigador'),
    path('api/investigadores/<int:id>/stats', investigador_stats, name='investigador_stats'),
    path('api/investigadores/<int:id>/proyecto_stats', proyecto_stats, name='proyecto_stats'),
    path('api/investigadores/<int:id>/evento_stats', evento_stats, name='evento_stats'),




    path("proyecto_inv/", include("proyecto_inv.urls")),
    path("admin/", admin.site.urls),
    
    path("accounts/", include("proyecto_inv.urls")),  
    path("accounts/", include("django.contrib.auth.urls")),
    path("", TemplateView.as_view(template_name="home.html"), name="home"),  
    path('api/', include('proyecto_inv.urls')),
    # path('api/Investigadores/', views.InvestigadoresListCreateView.as_view(), name='investigadores-list-create'),
    # path('api/Investigadores/<int:pk>/', views.investigador_detail.as_view(), name='investigadores-detail'),
    path('swagger/', schema_view.with_ui('swagger'), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc'), name='schema-redoc'),
]
