from django.shortcuts import render
from .models import Task
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    tasks = Task.objects.all()
    return render(request, "getitdone_django/index.html", { 'tasks': tasks })
        # {{ }} double bracket notifications is like echo in php

@csrf_exempt
def new_task(request):
    title = request.POST.get('title')
    task = Task.objects.create(title=title)
    return JsonResponse({ 'id': task.id, 'title': title, 'completed': task.completed, 'created': task.created})

@csrf_exempt
def complete(request):
    id = getTaskIdFromRequest(request)
    task = Task.objects.get(id=id)
    task.completed = True
    task.save()
    return JsonResponse({ 'id': task.id, 'title': task.title, 'completed': task.completed, 'created': task.created})

@csrf_exempt
def delete(request):
    id = getTaskIdFromRequest(request)
    task = Task.objects.get(id=id)
    task.delete()
    return JsonResponse({ 'id': id, 'deleted': True })

@csrf_exempt
def repeat(request):
    id = getTaskIdFromRequest(request)
    task = Task.objects.get(id=id)
    task.completed = False
    task.save()
    return JsonResponse({ 'id': task.id, 'title': task.title, 'completed': task.completed, 'created': task.created})

#using Chris' getTaskId function here for convenience
def getTaskIdFromRequest(request):
    if request.method == 'POST':
        return int(request.POST.get("id"))
    else:
        return None
