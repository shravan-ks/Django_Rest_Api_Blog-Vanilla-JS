from django.urls import path

from blog.views import PostListView, PostCreateView, PostDetailView,PostUpdateView,AuthorDetailView,PostDeleteView

urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
    path('author/<int:pk>', AuthorDetailView.as_view(), name='author'),
    path('create', PostCreateView.as_view(), name='post-create'),
    path('<int:pk>', PostDetailView.as_view(), name='post-view'),
    path('<int:pk>/update', PostUpdateView.as_view(), name='post-update'),
    path('<int:pk>/delete', PostDeleteView.as_view(), name='post-delete'),
]