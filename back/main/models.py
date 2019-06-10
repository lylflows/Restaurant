from django.db import models
from django.contrib.auth.models import  User
from datetime import datetime

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class OrderManager(models.Manager):
    def for_user(self, user):
        return self.filter(sender=user)

class Stock(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(max_length=300)
    start_date = models.DateField(default=datetime.now)
    end_date = models.DateField(default=datetime.now)

    def __str__(self):
        return '{} {} {} {}'.format(self.name, self.description, self.start_date, self.end_date)

    def to_json(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }


class Table(models.Model):
    STATUS_CHOICES = (
        ('UNRESERVED', 'unreserved'),
        ('RESERVED', 'reserved'),
    )
    status = models.CharField(max_length=10,choices = STATUS_CHOICES, default = 'UNRESERVED')
    number_of_seats = models.IntegerField()
    reserved_by=models.ForeignKey(User,on_delete=models.SET_NULL,blank=True,null=True)
    # service = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)

    def __str__(self):
        return "{} {} ".format(self.status, self.number_of_seats)

    def to_json(self):
        return{
            'id': self.id,
            'number_of_seats': self.number_of_seats,
            'status': self.status,
            # 'service': self.service,
        }




class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Meal(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    count = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name="meals")
    description = models.CharField(max_length=200)
    image=models.CharField(max_length=200)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': id,
            'name': self.name,
            'count': self.count,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'image':self.image
        }


class Order(models.Model):
    objects=OrderManager()
    STATUS_CHOICES = (
        ('DONE', 'Done'),
        ('IN PROCESS', 'In Process'),
        ('UNDONE', 'Undone'),
    )
    meals = models.CharField(max_length=500)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='UNDONE')
    sender = models.ForeignKey(User, on_delete=models.CASCADE,related_name='sender',)
    handler = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,related_name='handler')
    total_price = models.FloatField(default=0)

class Card(models.Model):
    TYPE_CHOICES = (
        ('GOLD', 'gold'),
        ('SILVER', 'silver'),
        ('PLATINUM', 'platinum'),
        ('BRONZE', 'bronze'),
    )
    discount = models.FloatField(default=5)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=datetime.now)
    end_date = models.DateTimeField(default=datetime.now)
    type = models.CharField(max_length=8, choices=TYPE_CHOICES, default='BRONZE')

    def str(self):
        return "{} {}".format(self.type,self.owner)

    def to_json(self):
        return{
            'id':self.id,
            'discount':self.discount,
            'owner':self.owner,
            'type':self.type,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }
class Message(models.Model):
    text=models.CharField(max_length=100)
    sender_mail=models.CharField(max_length=19, default="ifoodkbtu@gmail.com")
    sender_pass=models.CharField(default="ifoodsoft",max_length=9)
    dest_mail=models.CharField(max_length=100)

    def to_json(self):
        return{
            'id':self.id,
            'text': self.text,
            'sender_mail':self.sender_mail,
            'sender_pass':self.sender_pass,
            'dest_mail':self.dest_mail,
        }
