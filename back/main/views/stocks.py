from django.http import Http404
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Stock
from ..serializers import StockSerializer


class StockList(generics.ListAPIView):
        queryset = Stock.objects.all()
        serializer_class = StockSerializer


class StockListDetail(APIView):

    def get_object(self, pk):
        try:
            return Stock.objects.get(id=pk)
        except Stock.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        list = self.get_object(pk)
        serializer = StockSerializer(list)
        return Response(serializer.data)

