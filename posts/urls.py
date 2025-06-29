from django.urls import path
from .views import IndexView, DetailPostView, UpdatePost

urlpatterns = [
    path('', IndexView.as_view(), name='posts'),
    path('detail/<int:pk>/', DetailPostView.as_view(), name='post_detail'),
    path('update/<int:pk>/', UpdatePost.as_view(), name='post_update'),
]