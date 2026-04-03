import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useSimpleAI } from "@/hooks/use-simple-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  background: "#ffffff",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  surface: "#f5f5f5",
  error: "#dc2626",
};

export default function AIGeneratorScreen() {
  const router = useRouter();
  const { generateText, loading, error: aiError } = useSimpleAI();

  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const loadRemainingRequests = useCallback(async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const limitKey = `ai_limit_${today}`;
      const limitStr = await AsyncStorage.getItem(limitKey);
      const limit = limitStr ? parseInt(limitStr, 10) : 0;
      setRemainingRequests(Math.max(0, 5 - limit));
    } catch (err) {
      console.error("Error loading remaining requests:", err);
    }
  }, []);

  useEffect(() => {
    loadRemainingRequests();
  }, [loadRemainingRequests]);

  const canGenerate = remainingRequests > 0 && !loading;

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || !canGenerate || loading) {
      return;
    }

    setError(null);

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      const result = await generateText(prompt);
      if (result) {
        setGeneratedText(result);
        setPrompt("");
        await loadRemainingRequests();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Okänt fel vid generering";
      setError(errorMsg);
      console.error("Error generating text:", err);
    }
  }, [prompt, canGenerate, loading, generateText, loadRemainingRequests]);

  const handleCopy = useCallback(async () => {
    if (!generatedText.trim()) return;

    try {
      await Clipboard.setStringAsync(generatedText);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }, [generatedText]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScreenContainer style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              marginBottom: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "700", color: colors.foreground }}>
              AI Generator
            </Text>

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <MaterialIcons name="close" size={28} color={colors.foreground} />
            </Pressable>
          </View>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.muted, marginBottom: 8 }}>
              Daglig gräns för gratis användning
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
                {remainingRequests} / 5 begäranden kvar
              </Text>

              {remainingRequests === 0 && (
                <Text style={{ fontSize: 14, color: colors.error }}>Gränsen nådd</Text>
              )}
            </View>
          </View>

          {(error || aiError) && (
            <View
              style={{
                backgroundColor: "#fee2e2",
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.error,
              }}
            >
              <Text style={{ color: colors.error, fontSize: 14 }}>{error || aiError}</Text>
            </View>
          )}

          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: 8,
              }}
            >
              Vad vill du att AI ska generera?
            </Text>

            <TextInput
              placeholder="Skriv din förfrågan här..."
              placeholderTextColor={colors.muted}
              value={prompt}
              onChangeText={setPrompt}
              multiline
              numberOfLines={4}
              editable={!loading && canGenerate}
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                borderColor: colors.border,
                color: colors.foreground,
                minHeight: 110,
                textAlignVertical: "top",
              }}
            />
          </View>

          <Pressable
            onPress={handleGenerate}
            disabled={!canGenerate || loading || !prompt.trim()}
            style={({ pressed }) => [
              {
                backgroundColor: canGenerate && prompt.trim() ? colors.primary : colors.muted,
                opacity: pressed && canGenerate ? 0.8 : 1,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              },
            ]}
          >
            {loading ? (
              <>
                <ActivityIndicator color={colors.background} size="small" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: "600",
                    color: colors.background,
                  }}
                >
                  Genererar...
                </Text>
              </>
            ) : (
              <>
                <MaterialIcons
                  name="auto-awesome"
                  size={20}
                  color={colors.background}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: "600",
                    color: colors.background,
                  }}
                >
                  Generera text
                </Text>
              </>
            )}
          </Pressable>

          {generatedText ? (
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: colors.foreground,
                  marginBottom: 8,
                }}
              >
                Genererad text:
              </Text>

              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.foreground,
                    lineHeight: 24,
                  }}
                >
                  {generatedText}
                </Text>
              </View>

              <Pressable
                onPress={handleCopy}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                    borderRadius: 12,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 16,
                  },
                ]}
              >
                <MaterialIcons
                  name={copied ? "check" : "content-copy"}
                  size={20}
                  color={colors.background}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: "600",
                    color: colors.background,
                  }}
                >
                  {copied ? "Kopierad!" : "Kopiera"}
                </Text>
              </Pressable>
            </View>
          ) : null}

          <View
            style={{
              marginTop: "auto",
              paddingTop: 16,
              borderTopWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: colors.muted,
                textAlign: "center",
                lineHeight: 18,
              }}
            >
              AI Generator använder verklig AI för att generera sensowna meddelanden. Gränsen
              återställs varje dag klockan 00:00.
            </Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
