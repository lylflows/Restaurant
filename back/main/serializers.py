from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Meal, Category, Table, Stock, Card, Order, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = Category
        fields = ('id', 'name')


class MealSerializer(serializers.ModelSerializer):
        id = serializers.IntegerField(read_only=True)
        name = serializers.CharField(required=True)
        price = serializers.FloatField(required=True)
        count = serializers.IntegerField(default=0,read_only=True)
        category = CategorySerializer(required=True)
        description = serializers.CharField(required=True)
        image=serializers.CharField(read_only=True)

        class Meta:
            model = Meal
            fields=('id', 'name','price','count','category','description','image')


class TableSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    status = serializers.CharField(required=True)
    number_of_seats = serializers.IntegerField(read_only=True)
    reserved_by=UserSerializer(required=True,allow_null=True)
    reserved_by_id=serializers.IntegerField(required=True,allow_null=True)
    def create(self, validated_data):
        table=Table(**validated_data)
        table.save()
        return table
    def update(self, instance, validated_data):

        instance.status=validated_data.get('status',instance.status)
        instance.reserved_by_id=validated_data.get('reserved_by_id',instance.reserved_by_id)

        try:
            instance.reserved_by=User.objects.get(id=instance.reserved_by_id)
        except User.DoesNotExist:
            instance.reserved_by=None
        print(type(instance.reserved_by))
        instance.save()
        return instance


# class StockSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(required=True)
#     description = serializers.CharField(read_only=True)
#     start_date = serializers.DateField(read_only=True)
#     end_date = serializers.DateField(read_only=True)
#
#     class Meta:
#         model = Stock
#         fields = '__all__'

class StockSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(read_only=True)
    start_date = serializers.DateField(read_only=True)
    end_date = serializers.DateField(read_only=True)

    def create(self, validated_data):
        stock = Stock(**validated_data)
        stock.save()
        return stock



class OrderSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    meals = serializers.CharField(required=True)
    status = serializers.CharField(required=True)
    sender=UserSerializer(read_only=True)
    sender_id = serializers.IntegerField(required=True)
    handler=UserSerializer(read_only=True)
    total_price = serializers.FloatField(required=True)
    class Meta:
        model = Order
        fields=('id','meals','status','total_price','sender','sender_id','handler',)

class CardSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    discount = serializers.FloatField(required=True, allow_null=True)
    owner = UserSerializer(read_only=True)
    owner_id = serializers.IntegerField(required=True)
    start_date = serializers.DateTimeField(read_only=True)
    end_date = serializers.DateTimeField(read_only=True)
    type = serializers.CharField(required=True)

    class Meta:
        model = Card
        fields = '__all__'

class OrderSerializer1(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    meals = serializers.CharField(required=True)
    status = serializers.CharField(required=True)
    sender=UserSerializer(read_only=True)
    sender_id = serializers.IntegerField(required=True, allow_null=True)
    handler=UserSerializer(read_only=True)
    handler_id = serializers.IntegerField(required=True, allow_null=True)
    total_price = serializers.FloatField(required=True)

    class Meta:
        model = Order
        fields=('id', 'meals', 'status', 'total_price', 'sender', 'sender_id', 'handler', 'handler_id', )


class MessageSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    sender_mail=serializers.CharField(read_only=True)
    sender_pass=serializers.CharField(read_only=True)
    text=serializers.CharField(required=True)
    dest_mail=serializers.CharField(required=True)

    class Meta:
        model= Message
        fields='__all__'