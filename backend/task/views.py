from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from .models import Task
from .serializers import TaskSerializer

@api_view(['GET','POST','PUT'])
@permission_classes([AllowAny])
def task_list(request):
    if request.method == 'GET':
        date = request.query_params.get('date')
        if date:
            task = get_object_or_404(Task, date=date)
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


