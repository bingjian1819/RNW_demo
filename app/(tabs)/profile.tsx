import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
  DownloadIcon,
  Icon,
  MenuIcon,
  MessageCircleIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import type { MotionComponentProps } from "@legendapp/motion";
import { Motion } from "@legendapp/motion";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Platform, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const logo = require("../../assets/images/icon.png");

const TemplateImage = () => {
  return (
    <Image
      source={require("../../assets/images/react-logo.png")}
      style={{ width: 42, height: 42, borderRadius: 16 }}
      resizeMode="cover"
    />
  );
};

const featuredProducts = [
  {
    icon: <TemplateImage />,
    title: "Super Savings",
    desc: "build savings overtime, withdraw anytime, low min. deposits",
    rate: "5.60% p.a.",
  },
  {
    icon: <TemplateImage />,
    title: "Super Growth",
    desc: "grow savings with premium and passive income, withdraw anytime",
    rate: "13.2% p.a.",
  },
  {
    icon: <TemplateImage />,
    title: "Term Deposit",
    desc: "locked in interest rate, 1 year fixed term",
    rate: "23% p.a.",
  },
];

const comingSoon = [
  {
    icon: <TemplateImage />,
    label: "Remittance",
  },
  {
    icon: <TemplateImage />,
    label: "Insurance",
  },
  {
    icon: <TemplateImage />,
    label: "Micro-lending",
  },
];

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, any, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <MotionView
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", damping: 20, stiffness: 120 }}
      style={{
        flex: 1,
        backgroundColor: "#f7f6f1",
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#266ff2", "#102ca6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 16,
            paddingTop: Platform.OS === "web" ? 16 : insets.top,
          }}
        >
          <HStack className="justify-between items-center mb-2">
            <Pressable>
              <Icon as={MenuIcon} size="xl" className="text-white" />
            </Pressable>
            <HStack className="items-center">
              <Image
                source={logo}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              />
              <Text size="md" className="text-white">
                Gluon
              </Text>
            </HStack>
            <Pressable>
              <Icon as={MessageCircleIcon} size="xl" className="text-white" />
            </Pressable>
          </HStack>
          <HStack className="justify-between my-2 items-center">
            <Box className="bg-blue-300/60 rounded-full ">
              <Text size="xs" className="text-white px-3 py-1">
                12,510 Savers
              </Text>
            </Box>
            <Box
              style={{
                backgroundColor: "#fff",
                borderRadius: 50,
                padding: 6,
              }}
            >
              <Icon as={DownloadIcon} size="lg" className="text-yellow-400" />
            </Box>
          </HStack>
          <HStack className="items-end mb-1">
            <Text className="text-white font-bold text-[54px] leading-[60px]">
              5.6%
              <Text className="text-white text-[24px] leading-[30px]">
                &nbsp;p.a.
              </Text>
            </Text>
          </HStack>
          <Text size="lg" className="text-white mb-3">
            Super Savings - withdraw anytime
          </Text>
          <Pressable className="bg-[#205bdc] flex flex-row justify-between rounded-2xl items-center mb-3 px-4 py-1.5 shadow">
            <Text size="lg" className="text-white">
              Super Savings
            </Text>
            <Box className="bg-white rounded-[30px] items-center px-4 py-1 shadow">
              <Text size="md" className="text-black">
                JOIN
              </Text>
            </Box>
          </Pressable>
        </LinearGradient>
        <Box className="px-4 mt-4">
          <HStack className="justify-between items-center">
            <Text size="xl" className="text-black font-semibold">
              Featured Products
            </Text>
            <Text size="md" className="text-blue-700">
              See All
            </Text>
          </HStack>
          {featuredProducts.map((item, idx) => (
            <HStack
              key={idx}
              className="bg-white rounded-2xl items-center mt-3 p-2"
            >
              {item.icon}
              <Box className="flex-1 ml-1.5">
                <Text className="text-black mb-1.5">{item.title}</Text>
                <Text size="xs" className="text-gray-500">
                  {item.desc}
                </Text>
              </Box>
              <Box className="bg-gray-100 rounded-full px-2 py-1 ml-2">
                <Text size="xs">{item.rate}</Text>
              </Box>
            </HStack>
          ))}
          <HStack className="justify-between items-center mb-2 mt-4">
            <Text size="xl" className="text-black font-semibold">
              Coming Soon
            </Text>
            <Text size="md" className="text-blue-700">
              See All
            </Text>
          </HStack>
          <HStack space="md">
            {comingSoon.map((item, idx) => (
              <Box
                key={idx}
                className="items-center flex-1 bg-white rounded-xl justify-center p-2"
              >
                {item.icon}
                <Text size="sm" className="mt-1 text-black text-center">
                  {item.label}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </ScrollView>
    </MotionView>
  );
}
