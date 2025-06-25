from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreatePostsViewSets

router = DefaultRouter()
router.register(r'', CreatePostsViewSets)

urlpatterns = [
    path('', include(router.urls)),
]
