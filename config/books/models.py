from django.db import models

class booksModel(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10,decimal_places=0)
    available = models.BooleanField(default=True)
