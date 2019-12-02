from rest_framework import serializers

from blog.models import Post, Author


# to get author name
class AuthorSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Author
        fields = (
            'username',
        )

    def get_username(self,obj):
        return obj.user.username




class PostSerializer(serializers.ModelSerializer):
    # author = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'publish_date',
            'updated',
            'author',
        )

    # def get_author(self,obj):
    #     return obj.author.user.username


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'author',
        )