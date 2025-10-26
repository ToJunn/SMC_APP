from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Recipe, Favorite, GenerationRequest
from .serializers import RecipeSerializer, FavoriteSerializer
from .genai import generate_recipe


# ---- GenAI giả lập (thay bằng model thật sau) ----
def generate_recipe_from_ingredients(ings: list[str]) -> dict:
    title = f"Món từ {', '.join(ings[:3])}" if ings else "Món bất kỳ"
    steps = [
        "Sơ chế nguyên liệu sạch sẽ.",
        "Ướp gia vị cơ bản (muối, tiêu) 10 phút.",
        "Xào/chế biến đến khi chín vừa.",
        "Nêm nếm lại và trình bày."
    ]
    nutrition = {"calories": 350, "protein_g": 20, "fat_g": 15, "carb_g": 30}
    return {
        "title": title,
        "ingredients": ings,
        "steps": steps,
        "nutrition": nutrition
    }

class SuggestRecipeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        ings = request.data.get("ingredients", [])
        if not isinstance(ings, list) or not all(isinstance(x, str) for x in ings):
            return Response({"detail": "ingredients phải là list[string]"}, status=400)

        out = generate_recipe(ings)  # <-- Gọi Gemini 2.0 (tiếng Việt)
        recipe = Recipe.objects.create(
            title=out.get("title"),
            ingredients=out.get("ingredients") or ings,
            steps=out.get("steps") or [],
            nutrition=out.get("nutrition") or {},
        )
        GenerationRequest.objects.create(
            user=request.user,
            input_ingredients=ings,
            output=RecipeSerializer(recipe).data | ({"_fallback": out.get("_fallback")} if "_fallback" in out else {}),
            status="ok" if "_fallback" not in out else "fallback",
        )
        return Response(RecipeSerializer(recipe).data, status=200)

class FavoritesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = Favorite.objects.filter(user=request.user).select_related("recipe").order_by("-created_at")
        return Response(FavoriteSerializer(qs, many=True).data)

    def post(self, request):
        recipe_id = request.data.get("recipe_id")
        if not recipe_id:
            return Response({"detail":"recipe_id required"}, status=400)
        try:
            recipe = Recipe.objects.get(id=recipe_id)
        except Recipe.DoesNotExist:
            return Response({"detail":"recipe not found"}, status=404)
        fav, created = Favorite.objects.get_or_create(user=request.user, recipe=recipe)
        return Response({"detail": "ok", "favorite_id": fav.id}, status=201)

    def delete(self, request):
        recipe_id = request.data.get("recipe_id")
        Favorite.objects.filter(user=request.user, recipe_id=recipe_id).delete()
        return Response(status=204)
