from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    date = models.DateField()
    status = models.CharField(max_length=255)