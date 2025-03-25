import { View, StyleSheet, Text, Switch, Pressable } from "react-native";

export type Item = {
  name: string;
  quantity: number;
  isChecked: boolean;
  id: string;
};

export type PackingListItemProps = {
  item: Item;
  onChange: (value: boolean, currentItem: Item) => void;
};

export const PackingListItem = (props: PackingListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{props.item.name}</Text>
        <Text style={styles.itemQuantity}>({props.item.quantity})</Text>
      </View>
      <Pressable
        onPress={() => {
          props.onChange(!props.item.isChecked, props.item);
        }}
      >
        <Switch
          value={props.item.isChecked}
          onValueChange={() => {
            props.onChange(!props.item.isChecked, props.item);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={props.item.isChecked ? "white" : "#bbb"}
          ios_backgroundColor="#3e3e3e"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 5,
    flexDirection: "row",
  },
  itemName: {
    fontSize: 24,
  },
  itemQuantity: {
    fontSize: 24,
  },
});
