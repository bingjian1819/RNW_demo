import {
  AddIcon,
  CalendarDaysIcon,
  GlobeIcon,
  Icon,
  MailIcon,
} from "@/components/ui/icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabRoutes = [
  {
    name: "profile",
    title: "Earn",
    icon: CalendarDaysIcon,
  },
  {
    name: "send",
    title: "Send",
    icon: MailIcon,
  },
  {
    name: "spend",
    title: "Spend",
    icon: AddIcon,
  },
  {
    name: "account",
    title: "Account",
    icon: GlobeIcon,
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              height: 70,
              backgroundColor: "#fff",
            },
            android: {
              height: 70,
              paddingBottom: 0,
              backgroundColor: "#fff",
            },
            default: {
              height: 70,
              backgroundColor: "#fff",
            },
          }),
        }}
      >
        {tabRoutes.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
              tabBarLabel: ({ focused }) => (
                <Text
                  className={focused ? "text-blue-600" : "text-gray-400"}
                  style={{ fontSize: 12 }}
                >
                  {route.title}
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <Icon
                  as={route.icon}
                  size="xl"
                  className={focused ? "text-blue-600" : "text-gray-400"}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
}
