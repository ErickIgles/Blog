from ..models import CreatePosts
from rest_framework import viewsets

from .serializers import CreatePostsSerializer

class CreatePostsViewSets(viewsets.ModelViewSet):
    queryset = CreatePosts.objects.all()
    serializer_class = CreatePostsSerializer
