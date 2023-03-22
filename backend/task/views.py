from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from .models import Task
from .serializers import TaskSerializer

@api_view(['GET','POST','PUT','DELETE'])
@permission_classes([AllowAny])
def task_list(request):
    if request.method == 'GET':
        date = request.query_params.get('date')
        if date:
            task = Task.objects.filter(date=date)
            serializer = TaskSerializer(task,many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        task_id = request.query_params.get('id')
        queryset = get_object_or_404(Task,id=task_id)
        serializer = TaskSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        task_id = request.query_params.get('id')
        task = Task.objects.filter(pk = task_id)
        task.delete()
        return Response(status=status.HTTP_202_ACCEPTED)




    
@api_view(['GET'])
@permission_classes([AllowAny])
def task_date_update(request):
    request_date = request.query_params.get('date')
    Task.objects.filter(status__in = ['backlog', 'doing']).filter(date__lt=request_date).update(date=request_date)
    return Response(status=status.HTTP_200_OK)
    


