import React from "react";
import { TextInput, useTheme } from "react-native-paper";

export default function TextInputBox({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}) {
  const theme = useTheme();
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      outlineColor={theme.colors.outline}
      activeOutlineColor={theme.colors.primary}
      style={{ marginBottom: 12, backgroundColor: theme.colors.surface }}
    />
  );
}
