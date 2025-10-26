import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { COLORS, Spacing, Radius } from "../ui/theme";

export default function PostScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
      quality: 0.9,
    });
    if (res.didCancel) return;
    if (res.errorCode) return Alert.alert("Lỗi", res.errorMessage || "Không chọn được ảnh");
    const asset = res.assets?.[0];
    if (!asset?.uri) return;
    setPhoto(asset);
  };

  const onPost = async () => {
    if (!title || !content) return Alert.alert("Điền đầy đủ thông tin");
    setLoading(true);
    try {
      // Chuẩn bị FormData để gọi API backend sau này
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      if (photo?.uri) {
        form.append("image", {
          // @ts-ignore
          uri: photo.uri,
          type: photo.type || "image/jpeg",
          name: photo.fileName || `upload_${Date.now()}.jpg`,
        });
      }

      // ví dụ gửi:
      // const resp = await fetch("https://your.api/posts/", { method: "POST", body: form });
      // if (!resp.ok) throw new Error("Upload thất bại");

      Alert.alert("Đăng bài thành công!", `Món ăn: ${title}`);
      setTitle("");
      setContent("");
      setPhoto(null);
    } catch (e: any) {
      Alert.alert("Lỗi", e?.message || "Không thể đăng bài");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng món ăn</Text>

      {/* Upload box */}
      {!photo ? (
        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.9} onPress={pickImage}>
          <Text style={styles.uploadIcon}>＋</Text>
          <Text style={styles.uploadText}>Thêm ảnh món ăn</Text>
          <Text style={styles.uploadHint}>PNG, JPG (≤ 10MB)</Text>
      </TouchableOpacity>
      ) : (
        <View style={styles.previewWrap}>
          <Image source={{ uri: photo.uri }} style={styles.preview} resizeMode="cover" />
          <TouchableOpacity style={styles.removeBtn} onPress={() => setPhoto(null)}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>×</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Tên món ăn"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Mô tả hoặc công thức nấu"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={[styles.btn, loading && { opacity: 0.6 }]} onPress={onPost} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Đang đăng..." : "Đăng bài"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    padding: Spacing.large,
    paddingTop: 50 // Thêm khoảng cách phía trên
  },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 16, color: COLORS.darkGray },

  uploadBox: {
    height: 160,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.mediumGray,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  uploadIcon: { fontSize: 28, color: COLORS.primary, marginBottom: 6 },
  uploadText: { color: COLORS.darkGray, fontWeight: "600" },
  uploadHint: { color: COLORS.mediumGray, fontSize: 12, marginTop: 2 },

  previewWrap: { marginBottom: 14 },
  preview: { width: "100%", height: 200, borderRadius: Radius.large },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 28, height: 28, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: Radius.medium,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: Radius.large },
  btnText: { color: COLORS.white, textAlign: "center", fontWeight: "600" },
});
