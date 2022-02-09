from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_framework import response
from .serializers import VpsSerializers, VpsSerializerForStatus
from .models import VpsModel

# модуль для фильтрации по параметрам
from django_filters.rest_framework import DjangoFilterBackend


"""
Классы представлений поддерживает следующие операции для API:
    - создать VPS
    - получить VPS по uid
    - получить список VPS с возможностью фильтрации по параметрам
    - перевести VPS в другой статус
"""


class VpsGetListOrCreate(generics.ListCreateAPIView):
    """ Точка API. Создание одного экземпляра или получение коллекции экземпляров модели """
    queryset = VpsModel.objects.all()
    serializer_class = VpsSerializers

    filter_backends = [DjangoFilterBackend]
    filter_fields = ['cpu', 'ram', 'hdd', 'status'] #  'create_date', 'update_date'


class VpsGetOne(generics.RetrieveAPIView):
    """ Точка API. Только чтение, получение одного экземпляра модели происходит по полю uid """
    queryset = VpsModel.objects.all()
    serializer_class = VpsSerializers
    lookup_field = 'uid'


class VpsUpdateOne(generics.UpdateAPIView):
    """ Точка API. Только обновление для одного экземпляра модели по полю uid """
    queryset = VpsModel.objects.all()
    serializer_class = VpsSerializerForStatus
    lookup_field = 'uid'









# TODO сделать как отдельное представление ?
# class VpsCreateOne(generics.CreateAPIView):
#     """Точка API. Создание одного экземпляра модели"""
#     queryset = VpsModel.objects.all()
#     serializer_class = VpsSerializers


















# TODO определение CRUD сразу для всей модели
# class VpsViewSet(viewsets.ModelViewSet):
#     """
#     Представление для операций REST, к модели VpsModel
#
#     API поддерживает операции:
#         - создать VPS
#         - получить VPS по uid
#         - получить список VPS с возможностью фильтрации по параметрам
#         - перевести VPS в другой статус
#     """
#
#     queryset = VpsModel.objects.all()
#     serializer_class = VpsSerializers
#
#     # Для фильтрации
#     # filter_backends = [DjangoFilterBackend, OrderingFilter]
#     # filter_fields = ['id', 'type']
#     # ordering_fields = ['id', 'type']
#
#     # пока даем допуск к API кому угодно
#     permission_classes = {permissions.AllowAny}





