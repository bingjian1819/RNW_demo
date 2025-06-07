import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box className="flex-1 items-center justify-center">
        <Text>This screen does not exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </Box>
    </>
  );
}
