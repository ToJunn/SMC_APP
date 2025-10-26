import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS, Spacing, Radius } from "../ui/theme";

export default function PostScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onPost = () => {
    if (!title || !content) return Alert.alert("Điền đầy đủ thông tin");
    Alert.alert("Đăng bài thành công!", `Món ăn: ${title}`);
    setTitle("");
    setContent("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Đăng món ăn</Text>
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
      <TouchableOpacity style={styles.btn} onPress={onPost}>
        <Text style={styles.btnText}>Đăng bài</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: Spacing.large },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 16, color: COLORS.darkGray },
  input: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: Radius.medium,
    padding: 10,
    marginBottom: 12,
  },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: Radius.large },
  btnText: { color: COLORS.white, textAlign: "center", fontWeight: "600" },
});
