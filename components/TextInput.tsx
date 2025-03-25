import { View, TextInput, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  value?: string;
  type: "text" | "number";
  onChange: (vakue: string) => void;
};

export const MyTextInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        keyboardType={props.type === "text" ? "default" : "numeric"}
        style={styles.textInput}
        onChangeText={props.onChange}
        defaultValue={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
});
