import React from "react";
import { Button, useTheme } from "react-native-paper";

export default function PrimaryButton(props: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      loading={props.loading}
      disabled={props.disabled}
      style={{
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
      }}
      contentStyle={{ height: 48 }}
      labelStyle={{
        fontWeight: "700",
        letterSpacing: 0.3,
        color: "#fff",
      }}
    >
      {props.title}
    </Button>
  );
}
