from django.contrib import admin
from .models import Table, Stock, Card, Meal, Category, Order, Message


# Register your models here.

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'number_of_seats', 'reserved_by',)


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'start_date', 'end_date', )


@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price',  'category', 'description', 'image',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'meals', 'status', 'sender','sender_id','handler', 'total_price', )


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('id', 'discount', 'owner', 'start_date', 'end_date', 'type', )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


admin.site.register(Message)
