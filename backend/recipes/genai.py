# recipes/genai.py
import os, json, re
from typing import List, Dict, Any

import google.generativeai as genai

# Model mặc định: Gemini 2.0 Flash (alias ổn định)
DEFAULT_MODEL = os.getenv("GEN_MODEL") or "gemini-2.0-flash"

# Cấu hình SDK (đọc GEMINI_API_KEY từ .env)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def _extract_json(text: str) -> Dict[str, Any]:
    """
    Trích JSON từ đầu ra (nhiều model trả kèm markdown). Ưu tiên ```json ...```.
    """
    m = re.search(r"```json\s*(\{.*?\})\s*```", text, re.S)
    if not m:
        m = re.search(r"(\{.*\})", text, re.S)
    if not m:
        raise ValueError("Không tìm thấy JSON trong phản hồi của model.")
    return json.loads(m.group(1))

def _prompt_vi(ingredients: List[str]) -> str:
    """
    Prompt tiếng Việt chi tiết – tạo công thức nấu ăn với các bước rõ ràng.
    """
    return f"""
Bạn là **SmartChef**, trợ lý nấu ăn thông minh nói tiếng Việt.

Với danh sách nguyên liệu sau: {ingredients}

Hãy tạo **một công thức nấu ăn chi tiết** và TRẢ VỀ DUY NHẤT một đối tượng JSON theo đúng cấu trúc sau:

{{
  "title": string,                // tên món (ngắn gọn, hấp dẫn, tiếng Việt)
  "ingredients": string[],        // danh sách nguyên liệu tiếng Việt, đã chuẩn hóa, bao gồm định lượng nếu có thể
  "steps": string[],              // Mỗi phần tử mô tả 1 bước nấu rõ ràng, tuần tự (ít nhất 5 bước)
  "nutrition": {{
    "calories": number,           // ước tính kcal
    "protein_g": number,
    "fat_g": number,
    "carb_g": number
  }}
}}

**YÊU CẦU:**
- Dùng các nguyên liệu được cung cấp làm thành phần chính.
- Có thể thêm gia vị cơ bản: muối, tiêu, hành, tỏi, dầu ăn, nước mắm, đường.
- Viết ngắn gọn, dễ hiểu, theo văn phong hướng dẫn nấu ăn tiếng Việt.
- Mỗi bước cần nêu hành động cụ thể (ví dụ: "Xào thịt bò 2–3 phút", "Luộc rau 5 phút", "Nêm nếm lại cho vừa miệng").
- Không được viết markdown, không thêm mô tả ngoài JSON.

Ví dụ về mảng "steps":
[
  "Sơ chế: Rửa sạch rau, cắt khúc 5cm; thái mỏng thịt bò, ướp với muối, tiêu 10 phút.",
  "Đun nóng 1 muỗng dầu, phi thơm hành tỏi.",
  "Cho thịt bò vào xào lửa lớn 2–3 phút cho săn lại.",
  "Thêm rau vào, đảo nhanh tay 2 phút, nêm nước mắm, hạt nêm, đường.",
  "Tắt bếp, rắc tiêu, dọn ra đĩa và thưởng thức."
]

**Chỉ trả về JSON hợp lệ.**
""".strip()

def generate_recipe(ingredients: List[str]) -> Dict[str, Any]:
    """
    Gọi Gemini 2.0 để tạo công thức. Luôn trả về dict JSON theo schema trên.
    Có fallback an toàn nếu lỗi (để FE không vỡ).
    """
    ingredients = [s.strip() for s in ingredients if isinstance(s, str) and s.strip()]
    try:
        model = genai.GenerativeModel(DEFAULT_MODEL)
        resp = model.generate_content(_prompt_vi(ingredients))
        text = (resp.text or "").strip()
        data = _extract_json(text)
        # Bảo vệ tối thiểu:
        data.setdefault("title", f"Món từ {', '.join(ingredients[:3]) or 'nguyên liệu có sẵn'}")
        data.setdefault("ingredients", ingredients or [])
        data.setdefault("steps", [])
        data.setdefault("nutrition", {"calories": 0, "protein_g": 0, "fat_g": 0, "carb_g": 0})
        return data
    except Exception as e:
        # Fallback an toàn cho môi trường dev/thiếu key
        return {
            "title": f"Món từ {', '.join(ingredients[:3]) or 'nguyên liệu có sẵn'}",
            "ingredients": ingredients or ["trứng", "rau", "thịt bò"],
            "steps": [
                "Sơ chế nguyên liệu sạch.",
                "Ướp nhẹ với muối, tiêu, dầu ăn 10 phút.",
                "Xào/nấu đến khi chín vừa.",
                "Nêm nếm lại và trình bày."
            ],
            "nutrition": {"calories": 350, "protein_g": 20, "fat_g": 15, "carb_g": 30},
            "_fallback": True,
            "_error": str(e),
        }
