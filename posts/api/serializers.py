from rest_framework import serializers
from ..models import CreatePosts


class CreatePostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatePosts
        fields = ['id', 'title', 'post_content', 'slug', 'post_image', 'created_at', 'updated_at', 'active']

