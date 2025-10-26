from django.urls import path
from .views import SuggestRecipeView, FavoritesView

urlpatterns = [
    path("suggest/", SuggestRecipeView.as_view(), name="suggest-recipe"),
    path("favorites/", FavoritesView.as_view(), name="favorites"),
]
