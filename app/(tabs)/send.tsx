import { Text } from "@/components/ui/text";
import { StyleSheet } from "react-native";

export default function SendScreen() {
  return <Text style={styles.title}>Send</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
