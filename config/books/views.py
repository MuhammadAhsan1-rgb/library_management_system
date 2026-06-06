from django.shortcuts import render
from .models import booksModel
from .serializers import booksSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
@api_view(['GET'])
def getBooks(request):
    students = booksModel.objects.all()
    serializers = booksSerializers(students , many=True)
    return Response(serializers.data)

@api_view(['POST'])
def addBooks(request):
    serializers = booksSerializers(data=request.data)

    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data) 

    return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)       

@api_view(['PUT', 'PATCH'])
def updateBook(request,pk):
    try:
        book = booksModel.objects.get(id=pk)
    except booksModel.DoesNotExist():
        return Response({"success": False, "message": "Book not found"}, status=404)
    if request.method == 'PATCH':
        serailzer = booksSerializers(book , data=request.data , partial=True)
    else:    
        serailzer = booksSerializers(book , data=request.data)
    if serailzer.is_valid():
        serailzer.save()
        return Response(serailzer.data)
    return Response(serailzer.errors , status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def deleteBook(request , pk):
    try:
        book = booksModel.objects.get(id = pk)
    except booksModel.DoesNotExist():
        return Response({"success": False, "message": "Book not found"}, status=404)  

    book.delete()
    return Response( { "message" : "Book deleted Successfully." } ,status=status.HTTP_204_NO_CONTENT)  