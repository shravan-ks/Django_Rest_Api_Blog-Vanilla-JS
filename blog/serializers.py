from rest_framework import serializers

from blog.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
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

    def get_author(self,obj):
        return obj.author.user.username
