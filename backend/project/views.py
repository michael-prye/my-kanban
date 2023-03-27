from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([AllowAny])
def project_list(request):
    if request.method == 'GET':
        project_id = request.query_params.get('id')
        if project_id:
            project = Project.objects.filter(pk=project_id)
            serializer = ProjectSerializer(project, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = ProjectSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "PUT":
        project_id = request.query_params.get('id')
        queryset = Project.objects.get(pk=project_id)
        serializer = ProjectSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "DELETE":
        project_id = request.query_params.get('id')
        project = Project.objects.filter(pk = project_id)
        project.delete()
        return Response(status=status.HTTP_200_OK)
