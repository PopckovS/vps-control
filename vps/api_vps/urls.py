from django.urls import path, include
from .views import VpsGetListOrCreate, VpsGetOne, VpsUpdateOne

urlpatterns = [
     path('vps', VpsGetListOrCreate.as_view(), name='vps_get_list_or_create_one'),
     path('vps/get/<str:uid>', VpsGetOne.as_view(), name='vps_get_one'),
     path('vps/update/<str:uid>', VpsUpdateOne.as_view(), name='vps_update_one'),
]
