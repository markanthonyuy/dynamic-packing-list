import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Created by: Mark Uy</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
