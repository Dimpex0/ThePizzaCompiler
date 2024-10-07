from django.urls import path

from .views import LoginAPI, CheckSessionViewAPI, LogoutViewAPI

urlpatterns = [
    path('login/', LoginAPI.as_view()),
    path('logout/', LogoutViewAPI.as_view()),
    path('check-session/', CheckSessionViewAPI.as_view()),
]
