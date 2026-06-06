from django.urls import path
from . import views
urlpatterns = [
    path('books/', views.getBooks),
    path('books/add/', views.addBooks),
    path('books/update/<int:pk>/', views.updateBook),
    path('books/delete/<int:pk>/', views.deleteBook)
]
