import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useShowToast } from "@/components/ui/toast/useShowToast";
import * as ed25519 from "@noble/ed25519";
import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box className="mb-6 p-6 bg-white rounded-2xl shadow-md w-full max-w-xl mx-auto">
    <Text className="text-2xl font-bold mb-4 text-gray-800">{title}</Text>
    {children}
  </Box>
);

const ResultBox = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) => {
  if (!value) return null;

  return (
    <Box className="mt-3">
      <Text className="font-semibold mb-1 text-gray-700">{label}</Text>
      <Pressable onPress={() => onCopy(value)}>
        <Text className="break-words p-2 rounded bg-gray-100 text-sm">
          {value}
        </Text>
      </Pressable>
    </Box>
  );
};

const ResultsSection = ({
  hash,
  signature,
  publicKey,
  onCopy,
}: {
  hash: string;
  signature: string;
  publicKey: string;
  onCopy: (value: string) => void;
}) => (
  <>
    <ResultBox label="SHA-256 Hash" value={hash} onCopy={onCopy} />
    <ResultBox label="Ed25519 Signature" value={signature} onCopy={onCopy} />
    <ResultBox label="Public Key" value={publicKey} onCopy={onCopy} />
  </>
);

const SignVerifyDemo = () => {
  const showToast = useShowToast();
  // Sign state
  const [message, setMessage] = useState("");
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");

  // Verify state
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyPublicKey, setVerifyPublicKey] = useState("");
  const [verifySignature, setVerifySignature] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCopy = (value: string) => {
    Clipboard.setString(value);
    showToast("Copied to clipboard", "success");
  };

  // Hash and sign message
  const handleSign = async () => {
    try {
      const { privateKeyBytes, publicKeyBytes } = await generateKeyPair();
      if (!message || !privateKeyBytes) return;
      setPublicKey(btoa(String.fromCharCode(...publicKeyBytes)));

      // Calculate SHA-256 hash
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHash(hashHex);

      // Sign the message
      const signatureBytes = await ed25519.signAsync(
        msgBuffer,
        privateKeyBytes
      );
      setSignature(btoa(String.fromCharCode(...signatureBytes)));
    } catch (error: any) {
      if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast("Failed to sign message");
      }
    }
  };

  // Generate key pair
  const generateKeyPair = async () => {
    const privateKeyBytes = ed25519.utils.randomPrivateKey();
    const publicKeyBytes = await ed25519.getPublicKeyAsync(privateKeyBytes);
    return { privateKeyBytes, publicKeyBytes };
  };

  // Verify signature
  const handleVerify = async () => {
    if (!verifyMessage || !verifyPublicKey || !verifySignature) {
      showToast("Please fill in all fields");
      return;
    }
    try {
      const msgBuffer = new TextEncoder().encode(verifyMessage);
      const publicKeyBytes = Uint8Array.from(atob(verifyPublicKey), (c) =>
        c.charCodeAt(0)
      );
      const signatureBytes = Uint8Array.from(atob(verifySignature), (c) =>
        c.charCodeAt(0)
      );
      const valid = await ed25519.verifyAsync(
        signatureBytes,
        msgBuffer,
        publicKeyBytes
      );
      setIsValid(valid);
    } catch (error: any) {
      showToast(error.message || "Failed to verify signature");
      setIsValid(null);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 py-8 px-2">
      <Section title="Sign Message">
        <Input className="mb-3">
          <InputField
            multiline
            placeholder="Enter message to sign"
            value={message}
            onChangeText={setMessage}
          />
        </Input>
        <Button
          onPress={handleSign}
          className="mb-3 h-12 rounded-lg text-white text-base font-semibold"
        >
          <ButtonText>Hash & Sign</ButtonText>
        </Button>
        <ResultsSection
          hash={hash}
          signature={signature}
          publicKey={publicKey}
          onCopy={handleCopy}
        />
      </Section>

      <Section title="Verify Signature">
        <Input className="mb-3 ">
          <InputField
            multiline
            placeholder="Enter message to verify"
            value={verifyMessage}
            onChangeText={setVerifyMessage}
          />
        </Input>
        <Input className="mb-3">
          <InputField
            placeholder="Enter public key (base64)"
            value={verifyPublicKey}
            onChangeText={setVerifyPublicKey}
          />
        </Input>
        <Input className="mb-3">
          <InputField
            placeholder="Enter signature (base64)"
            value={verifySignature}
            onChangeText={setVerifySignature}
          />
        </Input>
        <Button
          onPress={handleVerify}
          className="mb-3 h-12 rounded-lg text-white text-base font-semibold"
        >
          <ButtonText>Verify</ButtonText>
        </Button>
        {isValid !== null && (
          <Box className="mt-3 rounded-lg bg-white">
            <Text
              className={`text-lg font-semibold text-center ${
                isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {isValid ? "✓ Signature is Valid" : "✗ Signature is Invalid"}
            </Text>
          </Box>
        )}
      </Section>
    </ScrollView>
  );
};

export default SignVerifyDemo;
