from django.http import HttpResponse, Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import CardSerializer
from ..models import Card
# Create your views here.
from rest_framework import generics, status


class CardsList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    http_method_names = ['get', 'post']


class CardListDetail(APIView):
    def get_object(self, pk):
        try:
            return Card.objects.get(id=pk)
        except Card.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        c = self.get_object(pk)
        serializer = CardSerializer(c)
        return Response(serializer.data)

    def put(self, request, pk):
        c = self.get_object(pk)
        serializer = CardSerializer(instance=c, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        c = self.get_object(pk)
        c.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)