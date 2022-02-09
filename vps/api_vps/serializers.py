from rest_framework import serializers
from .models import VpsModel


class VpsSerializers(serializers.ModelSerializer):
    """ Сериализатор для модели VpsModel """

    class Meta:
        model = VpsModel
        fields = ['pk', 'uid', 'cpu', 'ram', 'hdd', 'status']


class VpsSerializerForStatus(serializers.ModelSerializer):
    """ Сериализатор для модели VpsModel, сериализует поля для смены статуса """

    class Meta:
        model = VpsModel
        fields = ['pk', 'uid', 'status']
