
from django.urls import path
from . import views
urlpatterns=[
    path('login/',views.login),
    path('logout/',views.logout),

    path('categories/',views.CategoriesList.as_view()),
    path('categories/<int:pk>/',views.CategoryDetail.as_view()),
    path('categories/<int:pk>/meals/',views.CategoryMealsList.as_view()),
    path('categories/<int:pk>/meals/<int:mk>/',views.CategoryMealDetail.as_view()),

    path('meals/',views.MealsList.as_view()),
    path('meals/<int:pk>/',views.MealDetail.as_view()),

     path('tables/',views.TablesList.as_view()),
    path('tables/<int:pk>/',views.TableDetail.as_view()),

    path('stocks/',views.StockList.as_view()),
    path('stocks/<int:pk>/',views.StockListDetail.as_view()),

    path('cards/',views.CardsList.as_view()),
    path('cards/<int:pk>/',views.CardListDetail.as_view()),

    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('users/create/', views.UserCreate.as_view()),

    path('orders/',views.OrderList.as_view()),
    path('orders/<int:pk>/', views.OrderListDetail.as_view()),

    path('send/',views.Message.as_view()),

]