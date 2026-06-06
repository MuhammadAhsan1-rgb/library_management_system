# admin.py - Complete working code
from django.contrib import admin
from .models import booksModel

@admin.register(booksModel)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'price', 'available')
    