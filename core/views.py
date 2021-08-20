from django.shortcuts import render
from django.http import JsonResponse 
import json 
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import PostSerializer
from .models import Post


f = open('tag.json') 

data = json.load(f)
# Create your views here.

class TestView(APIView): 
    def get(self, request, *args, **kwargs):
        return Response(data) 

    def post(self, request, *args, **kwargs): 
        serializer = PostSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


# def test_view(request):
#     return JsonResponse(data, safe = False)

