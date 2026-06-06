from rest_framework import serializers
from .models import booksModel

class booksSerializers(serializers.ModelSerializer):
    class Meta:
        model = booksModel
        fields = "__all__"