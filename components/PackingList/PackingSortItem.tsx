import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { Item } from "./PackingListItem";

type Props = {
  label: string;
  name: string;
  sortType: keyof Item;
  sortDir: "ASC" | "DESC";
  onSortChange: () => void;
};
export const PackingSortItem = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onSortChange} style={styles.sort}>
      <Text style={styles.sortText}>{props.label}</Text>
      {props.sortType === props.name && (
        <IconSymbol
          name={props.sortDir === "ASC" ? "arrow.up" : "arrow.down"}
          size={20}
          color={props.sortDir === "ASC" ? "green" : "blue"}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sort: {
    gap: 5,
    flexDirection: "row",
  },
  sortText: {
    fontSize: 18,
  },
});
