from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import smtplib
from ..views.auth import UserSerializer1
from ..serializers import CategorySerializer, MealSerializer, UserSerializer, MessageSerializer
from ..models import Category, Meal, Message
# Create your views here.
from rest_framework import generics, status
from rest_framework.filters import OrderingFilter, SearchFilter


class CategoriesList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']
    permission_classes = (AllowAny,)


class CategoryDetail(APIView):

    def get_object(self, pk):
        try:
            return Category.objects.get(id=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        list = self.get_object(pk)
        serializer = CategorySerializer(list)
        return Response(serializer.data)


class CategoryMealsList(APIView):

    def get(self, request, pk):
        try:
            c = CategoryDetail.get_object(self, pk=pk)
        except Category.DoesNotExist:
            raise Http404
        meals = Meal.objects.filter(category=c)
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data)




class MealsList(generics.ListAPIView):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    http_method_names = ['get']
    permission_classes = (AllowAny,)


class MealDetail(APIView):

    def get_object(self, pk):
        try:
            return Meal.objects.get(id=pk)
        except Meal.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        m = self.get_object(pk)
        serializer = MealSerializer(m)
        return Response(serializer.data)

class CategoryMealDetail(APIView):

    def get(self, request, **kwargs):
        try:
            li = Category.objects.get(id=self.kwargs.get('pk'))
        except Category.DoesNotExist:
            raise Http404

        ls = Meal.objects.filter(category=li)
        det = ls.get(id=self.kwargs.get('mk'))
        serializer2 = MealSerializer(det)
        return Response(serializer2.data)

class UserDetail(APIView):

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer1(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer1(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Message(APIView):

    def post(self, request):
        serializer=MessageSerializer(data=request.data)

        # password = 'Meliss05'
        # server = smtplib.SMTP('smtp.gmail.com', 587)
        # server.ehlo()
        # server.starttls()
        # server.ehlo()
        # server.login(from_, password)
        # server.sendmail(from_, to, message)
        # server.quit()
        if serializer.is_valid():
            # server.quit()
            mes=serializer.save()
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(mes.sender_mail, mes.sender_pass)
            server.sendmail(mes.sender_mail, mes.dest_mail, mes.text)
            print(mes.text)
            server.quit()
            print(serializer.data.get('sender_mail'))
            if mes:
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return  Response(serializer.errors)

