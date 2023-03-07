from django.db import models
from project.models import Project

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=255)
    project = models.OneToOneField(Project, null=True, blank=True, on_delete=models.PROTECT)