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
    filter_fields = ['cpu', 'ram', 'hdd', 'status', 'create_date', 'update_date']


class VpsRetrieveUpdate(generics.RetrieveUpdateAPIView):
    """Точка API. Создание одной записи, обновление статуса."""
    queryset = VpsModel.objects.all()
    lookup_field = 'uid'

    def retrieve(self, request, *args, **kwargs):
        """Переопределяем род.метод, задаем сериализатор для одной записи"""
        self.serializer_class = VpsSerializers
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Переопределяем род.метод, задаем сериализатор дял обновления статуса"""
        self.serializer_class = VpsSerializerForStatus
        return super().update(request, *args, **kwargs)



