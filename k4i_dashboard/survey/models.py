from django.db import models
from django.contrib.postgres.fields import JSONField


class Survey(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    description = models.TextField()


class SurveyResponse(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    data = JSONField()
    survey = models.ForeignKey(
        'Survey',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"Survey Response: {self.created}"
