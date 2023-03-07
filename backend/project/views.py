from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer

@api_view(['GET', 'POST'])
def project_list(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)