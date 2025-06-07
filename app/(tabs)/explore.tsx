import { Text } from "@/components/ui/text";
import { StyleSheet } from "react-native";

export default function ExploreScreen() {
  return <Text style={styles.title}>Explore</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
