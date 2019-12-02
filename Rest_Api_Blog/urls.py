
from django.contrib import admin
from django.urls import path, include

from blog.views import home, deailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/blog/', include('blog.urls')),
    path('' , home, name='home'),
    path('blog/<int:pk>' , deailView, name='deailView'),

]
