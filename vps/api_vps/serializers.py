from rest_framework import serializers
from .models import VpsModel


class VpsSerializers(serializers.ModelSerializer):
    """ Сериализатор для модели VpsModel """

    class Meta:
        model = VpsModel
        fields = ['pk', 'uid', 'cpu', 'ram', 'hdd', 'status']

