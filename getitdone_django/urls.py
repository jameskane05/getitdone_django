from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^getitdone_django/new_task', views.new_task, name="new_task"),
    url(r'^getitdone_django/complete', views.complete, name="complete"),
    url(r'^getitdone_django/delete', views.delete, name="delete"),
    url(r'^getitdone_django/repeat', views.repeat, name="repeat")
]
