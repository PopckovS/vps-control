from django.contrib import admin
from .models import VpsModel

# регистрируем модель VPS в админке
admin.site.register(VpsModel)
