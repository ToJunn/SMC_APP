import React from "react";
import { Button, useTheme } from "react-native-paper";

export default function SecondaryButton(props: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();

  return (
    <Button
      mode="outlined"
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        borderRadius: 16,
        borderColor: theme.colors.primary,
      }}
      contentStyle={{ height: 48 }}
      labelStyle={{
        fontWeight: "700",
        letterSpacing: 0.3,
        color: theme.colors.primary,
      }}
    >
      {props.title}
    </Button>
  );
}
