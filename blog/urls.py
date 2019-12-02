from django.urls import path

from blog.views import PostListView, PostCreateView, PostDetailView

urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
    path('create', PostCreateView.as_view(), name='post-create'),
    path('<int:pk>', PostDetailView.as_view(), name='post-view'),
]