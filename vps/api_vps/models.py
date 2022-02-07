from django.db import models
from django.urls import reverse
import uuid


"""
Модели для REST-API что бы управлять VPS 
"""


class VpsModel(models.Model):
    """ Объект VPS для управления виртуальными серверами """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    cpu = models.SmallIntegerField(null=False, blank=False, verbose_name='Количество ядер')

    ram = models.SmallIntegerField(null=False, blank=False, verbose_name='Объем ram')

    hdd = models.SmallIntegerField(null=False, blank=False, verbose_name='Объем hdd')

    status = models.BooleanField(default=True, verbose_name='Публиковать да/нет ?')

    create_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    update_date = models.DateTimeField(auto_now=True, null=True, verbose_name='Дата обновления')

    soft_delete = models.BooleanField(default=False, verbose_name='Мягкое удаление')

    class Meta:
        ordering = ('create_date',)
        # db_table = 'blog_commentary'
        verbose_name = 'Объект VPS'
        verbose_name_plural = 'Объекты VPS'

    def __str__(self):
        return str(self.pk)

    def get_absolute_url(self):
        """Возвращает абсолютный путь к конкретному объекту модели по ее pk"""
        return reverse('blog_one_post', kwargs={'post_id': self.pk})
