from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("id", "email", "username", "password")
        extra_kwargs = {
            "email": {"required": True},
            "username": {"required": False, "allow_blank": True},
        }

    def create(self, validated_data):
        email = validated_data.get("email")
        username = validated_data.get("username") or email.split("@")[0]
        password = validated_data.pop("password")
        user = User.objects.create(username=username, email=email)
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")
