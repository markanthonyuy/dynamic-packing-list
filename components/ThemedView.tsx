import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        { backgroundColor },
        style,
        {
          paddingBottom: safeAreaInsets.bottom,
          paddingTop: safeAreaInsets.top,
          flex: 1,
        },
      ]}
      {...otherProps}
    />
  );
}
