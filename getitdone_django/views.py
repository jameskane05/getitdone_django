from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "getitdone_django/index.html")


# {{ }} double bracket notifications is like echo in php