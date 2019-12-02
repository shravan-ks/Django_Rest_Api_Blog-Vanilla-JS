from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import AllowAny

from blog.models import Post, Author
from blog.serializers import PostSerializer, CreatePostSerializer, AuthorSerializer


def home(request):
    return render(request, 'index.html')


def deailView(request, pk):
    return render(request, 'detail.html')


class AuthorDetailView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class PostListView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer


class PostDetailView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostUpdateView(generics.UpdateAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer


class PostDeleteView(generics.DestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = Post.objects.all()
