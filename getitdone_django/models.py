from django.db import models

# Create your models here.
from django.db import models
from datetime import datetime

class Task(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateField(default=datetime.now)
    completed = models.BooleanField(default=False)