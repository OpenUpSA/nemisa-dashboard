from django.db import models
from django.contrib.postgres.fields import JSONField

class SurveyResponse(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    data = JSONField()

    def __str__(self):
        return f"Survey Response: {self.created}"

