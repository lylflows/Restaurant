from django.http import HttpResponse, Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.
from rest_framework import generics, status
from rest_framework.views import APIView

from ..models import Order
from ..serializers import OrderSerializer1



class OrderList(generics.ListCreateAPIView):

    serializer_class = OrderSerializer1
    http_method_names = ['get', 'post']
    filter_backends = (DjangoFilterBackend, )
    filter_fields=("status",)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        print(self.request.user)
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.for_user(self.request.user)



class OrderListDetail(APIView):
    def get_object(self, pk):
        try:
            return Order.objects.get(id=pk)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        order = self.get_object(pk)
        serializer = OrderSerializer1(order)
        return Response(serializer.data)

    def put(self, request, pk):
        order = self.get_object(pk)
        serializer = OrderSerializer1(instance=order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)