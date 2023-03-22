from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer

@api_view(['GET', 'POST'])
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