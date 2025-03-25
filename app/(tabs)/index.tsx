import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { PackingList } from "@/components/PackingList/PackingList";
import { Item } from "@/components/PackingList/PackingListItem";
import { useCallback, useRef, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { MyTextInput } from "@/components/TextInput";

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [toAdd, setToAdd] = useState<Record<string, string>>();
  const [isOpenSheet, setOpenSheet] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setOpenSheet(!!index);
  }, []);

  const handleAddItem = (item?: Partial<Item>) => {
    if (!item || !item.name || !item.quantity) {
      return;
    }
    setItems([
      ...items,
      {
        name: item.name,
        quantity: item.quantity,
        id: guidGenerator(),
        isChecked: false,
      },
    ]);
    setToAdd({
      name: "",
      quantity: "",
    });
  };

  const handleToggleCheck = (value: boolean, currentItem: Item) => {
    console.log(currentItem);
    const filteredItems = items.filter((item) => {
      return item.id !== currentItem.id;
    });
    setItems([
      ...filteredItems,
      {
        name: currentItem.name,
        quantity: currentItem.quantity,
        id: currentItem.id,
        isChecked: value,
      },
    ]);
  };

  return (
    <ThemedView>
      <GestureHandlerRootView style={styles.sheetContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Dynamic Packing List</Text>
            <Pressable
              onPress={() => {
                if (isOpenSheet) {
                  bottomSheetRef.current?.close();
                  setOpenSheet(false);
                  return;
                }
                bottomSheetRef.current?.expand();
                setOpenSheet(true);
              }}
            >
              <IconSymbol
                name={isOpenSheet ? "minus.circle.fill" : "plus.app.fill"}
                size={40}
                color={isOpenSheet ? "red" : "green"}
              />
            </Pressable>
          </View>
          <PackingList items={items} onToggleCheck={handleToggleCheck} />
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["1%", "40%"]}
          onClose={() => {
            setOpenSheet(false);
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <MyTextInput
              label="Name"
              type="text"
              onChange={(value) => {
                setToAdd({
                  ...toAdd,
                  name: value,
                });
              }}
              value={toAdd?.name}
            />
            <MyTextInput
              label="Quantity"
              type="number"
              onChange={(value) => {
                setToAdd({
                  ...toAdd,
                  quantity: value,
                });
              }}
              value={toAdd?.quantity}
            />
            <TouchableOpacity
              onPress={() => {
                handleAddItem(toAdd);
              }}
            >
              <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignContent: "center",
  },
  title: {
    fontSize: 34,
  },
  contentContainer: {
    flex: 1,
    gap: 15,
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  sheetContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },
});
