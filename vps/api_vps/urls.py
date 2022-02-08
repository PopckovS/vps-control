from django.urls import path, include
from .views import VpsList, VpsOne

urlpatterns = [
     path('vps', VpsList.as_view(), name='vps_list'),
     path('vps/<int:pk>', VpsOne.as_view(), name='vps_one'),
]
