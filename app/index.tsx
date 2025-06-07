import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import SignVerifyDemo from "../components/SignVerifyDemo";

export default function MainScreen() {
  const router = useRouter();
  return (
    <ScrollView>
      <Box className="p-2">
        <SignVerifyDemo />
        <Box className="mb-4 mx-4">
          <Button
            className="text-white"
            onPress={() => router.push("/(tabs)/profile")}
          >
            <ButtonText>Profile</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}
