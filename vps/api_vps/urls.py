from django.urls import path, include
# from .views import VpsGetListOrCreate, VpsGetOne, VpsUpdateOne
from .views import VpsGetListOrCreate, VpsRetrieveUpdate

urlpatterns = [
    path('vps', VpsGetListOrCreate.as_view(), name='vps_get_list_or_create_one'),
    path('vps/<str:uid>', VpsRetrieveUpdate.as_view(), name='vps_retrieve_update'),
]
