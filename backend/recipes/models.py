from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Ingredient(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.JSONField(default=list)  # danh sách chuỗi
    steps = models.JSONField(default=list)        # danh sách chuỗi
    nutrition = models.JSONField(default=dict, blank=True)  # dict {calo, protein,...}
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "recipe")

class GenerationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    input_ingredients = models.JSONField(default=list)
    output = models.JSONField(default=dict)  # lưu response gen
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="ok")  # ok/failed
