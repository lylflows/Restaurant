from django.http import HttpResponse, Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import TableSerializer
from ..models import Table
# Create your views here.
from rest_framework import generics

class TablesList(generics.ListCreateAPIView):

    serializer_class = TableSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get','post']
    filter_backends = (DjangoFilterBackend, OrderingFilter,SearchFilter,)
    ordering=("number_of_seats",)
    search_fields = ('=status',)
    def get_queryset(self):
        q=Table.objects.all()
        return q


class TableDetail(APIView):
    def get_object(self, pk):
        try:
            return Table.objects.get(id=pk)
        except Table.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        t = self.get_object(pk)
        serializer = TableSerializer(t)
        return Response(serializer.data)


    def put(self,request,pk):
        t = self.get_object(pk)
        print(request.data)
        serializer = TableSerializer(instance=t, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
