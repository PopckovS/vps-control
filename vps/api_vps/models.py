from django.db import models
from django.urls import reverse
import uuid

"""
Модели для REST-API что бы управлять VPS 
"""


class VpsStatusType(models.TextChoices):
    """ Выбор статуса для сервиса VPS """
    STARTED = ('started', 'started')
    BLOCKED = ('blocked', 'blocked')
    STOPPED = ('stopped', 'stopped')


class VpsModel(models.Model):
    """ Объект VPS для управления виртуальными серверами """

    uid = models.UUIDField(default=uuid.uuid4, editable=False)

    cpu = models.SmallIntegerField(null=False, blank=False, verbose_name='Количество ядер')

    ram = models.SmallIntegerField(null=False, blank=False, verbose_name='Объем ram')

    hdd = models.SmallIntegerField(null=False, blank=False, verbose_name='Объем hdd')

    status = models.CharField(max_length=10,
                              choices=VpsStatusType.choices,
                              default=VpsStatusType.STOPPED,
                              verbose_name='Статус сервера'
                              )

    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True,
                                       verbose_name='Дата создания', editable=False
                                       )

    update_date = models.DateTimeField(auto_now=True, null=True, verbose_name='Дата обновления')

    class Meta:
        ordering = ('create_date',)
        db_table = 'api_vps'
        verbose_name = 'Объект VPS'
        verbose_name_plural = 'Объекты VPS'

    def __str__(self):
        return str(self.pk)
