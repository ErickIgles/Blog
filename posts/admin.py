from django.contrib import admin
from .models import CreatePosts

@admin.register(CreatePosts)
class CreatePostsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'post_content', 'slug','post_image', 'created_at', 'updated_at', 'active')
    list_display_links = ('title', 'post_content')

