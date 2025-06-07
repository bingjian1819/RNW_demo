import { Text } from "@/components/ui/text";
import { StyleSheet } from "react-native";

export default function SpendScreen() {
  return <Text style={styles.title}>Spend</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
