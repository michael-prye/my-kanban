from django.urls import path
from task import views

urlpatterns=[
    path('', views.task_list),
    path('date', views.task_date_update)
]