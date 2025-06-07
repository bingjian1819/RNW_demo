import { Text } from "@/components/ui/text";
import { StyleSheet } from "react-native";

export default function AccountScreen() {
  return <Text style={styles.title}>Account</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
