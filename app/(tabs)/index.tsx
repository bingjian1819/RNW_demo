import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import SignVerifyDemo from "../../components/SignVerifyDemo";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Box>
        <SignVerifyDemo />
      </Box>
    </ScrollView>
  );
}
