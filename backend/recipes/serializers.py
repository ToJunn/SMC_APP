from rest_framework import serializers
from .models import Recipe, Favorite

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ("id", "title", "ingredients", "steps", "nutrition", "created_at")

class FavoriteSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ("id", "recipe", "created_at")
