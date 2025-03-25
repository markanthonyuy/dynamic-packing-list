import { View, StyleSheet, Text, FlatList } from "react-native";
import { PackingListItem, Item } from "./PackingListItem";
import { useCallback, useMemo, useState } from "react";
import { PackingSortItem } from "./PackingSortItem";

type PackingListProps = {
  items: Item[];
  onToggleCheck: (value: boolean, currentItem: Item) => void;
};

export const PackingList = (props: PackingListProps) => {
  const [sortType, setSortType] = useState<keyof Item>("name");
  const [sortDir, setSortDir] = useState<"ASC" | "DESC">("ASC");

  const sortedItems = useMemo(() => {
    return props.items.sort((a, b) => {
      if (sortDir === "DESC") {
        if (sortType === "quantity") {
          return b[sortType] > a[sortType] ? -1 : 1;
        }
        if (sortType === "isChecked") {
          return b[sortType] ? -1 : 1;
        }
        return (b[sortType] as string).localeCompare(a[sortType] as string);
      }

      if (sortType === "quantity") {
        return a[sortType] > b[sortType] ? -1 : 1;
      }
      if (sortType === "isChecked") {
        return a[sortType] ? -1 : 1;
      }
      return (a[sortType] as string).localeCompare(b[sortType] as string);
    });
  }, [props.items, sortType, sortDir]);

  const handleSortChange = useCallback((sortType: keyof Item) => {
    setSortType(sortType);
    setSortDir((dir) => {
      return dir === "DESC" ? "ASC" : "DESC";
    });
  }, []);

  return (
    <FlatList
      ListHeaderComponent={
        props.items.length ? (
          <View style={styles.headerContainer}>
            <View style={styles.leftSort}>
              <PackingSortItem
                label="Name"
                name="name"
                onSortChange={() => handleSortChange("name")}
                sortType={sortType}
                sortDir={sortDir}
              />
              <PackingSortItem
                label="Quantity"
                name="quantity"
                onSortChange={() => handleSortChange("quantity")}
                sortType={sortType}
                sortDir={sortDir}
              />
            </View>
            <PackingSortItem
              label="Checked"
              name="isChecked"
              onSortChange={() => handleSortChange("isChecked")}
              sortType={sortType}
              sortDir={sortDir}
            />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>Empty list! Add some...</Text>
        </View>
      }
      data={sortedItems}
      renderItem={({ item }) => (
        <PackingListItem item={item} onChange={props.onToggleCheck} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 20,
  },
  leftSort: {
    gap: 20,
    flexDirection: "row",
  },
});
