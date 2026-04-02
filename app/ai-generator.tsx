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
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useSimpleAI } from "@/hooks/use-simple-ai";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AIGeneratorScreen() {
  const router = useRouter();
  const colors = useColors();
  const { generateText, loading, error: aiError } = useSimpleAI();

  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(5);
  const [error, setError] = useState<string | null>(null);

  // Load remaining requests on mount and after generation
  const loadRemainingRequests = useCallback(async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const limitKey = `ai_limit_${today}`;
      const limitStr = await AsyncStorage.getItem(limitKey);
      const limit = limitStr ? parseInt(limitStr) : 0;
      setRemainingRequests(Math.max(0, 5 - limit));
    } catch (err) {
      console.error("Error loading remaining requests:", err);
    }
  }, []);

  // Load on component mount
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
        // Update remaining requests after successful generation
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
      className="flex-1"
    >
      <ScreenContainer className="flex-1 p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-foreground">
              AI Generator
            </Text>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <MaterialIcons
                name="close"
                size={28}
                color={colors.foreground}
              />
            </Pressable>
          </View>

          {/* Quota Info */}
          <View
            className="bg-surface rounded-lg p-4 mb-6 border"
            style={{ borderColor: colors.border }}
          >
            <Text className="text-sm text-muted mb-2">
              Daglig gräns för gratis användning
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">
                {remainingRequests} / {5} begäranden kvar
              </Text>
              {remainingRequests === 0 && (
                <Text className="text-sm text-error">Gränsen nådd</Text>
              )}
            </View>
          </View>

          {/* Error Message */}
          {(error || aiError) && (
            <View className="bg-error/10 rounded-lg p-3 mb-4 border" style={{ borderColor: colors.error }}>
              <Text className="text-error text-sm">{error || aiError}</Text>
            </View>
          )}

          {/* Prompt Input */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">
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
              className="bg-surface border rounded-lg p-3 text-foreground"
              style={{
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Generate Button */}
          <Pressable
            onPress={handleGenerate}
            disabled={!canGenerate || loading || !prompt.trim()}
            style={({ pressed }) => [
              {
                backgroundColor: canGenerate
                  ? colors.primary
                  : colors.muted,
                opacity: pressed && canGenerate ? 0.8 : 1,
              },
            ]}
            className="rounded-lg p-4 flex-row items-center justify-center mb-6"
          >
            {loading ? (
              <>
                <ActivityIndicator color={colors.background} size="small" />
                <Text className="ml-2 font-semibold text-background">
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
                <Text className="ml-2 font-semibold text-background">
                  Generera text
                </Text>
              </>
            )}
          </Pressable>

          {/* Generated Text */}
          {generatedText && (
            <View className="mb-4">
              <Text className="text-sm font-semibold text-foreground mb-2">
                Genererad text:
              </Text>
              <View
                className="bg-surface rounded-lg p-4 border"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-base text-foreground leading-relaxed">
                  {generatedText}
                </Text>
              </View>

              {/* Copy Button */}
              <Pressable
                onPress={handleCopy}
                style={({ pressed }) => [
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                className="rounded-lg p-3 flex-row items-center justify-center mt-4"
              >
                <MaterialIcons
                  name={copied ? "check" : "content-copy"}
                  size={20}
                  color={colors.background}
                />
                <Text className="ml-2 font-semibold text-background">
                  {copied ? "Kopierad!" : "Kopiera"}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Info */}
          <View className="mt-auto pt-4 border-t" style={{ borderColor: colors.border }}>
            <Text className="text-xs text-muted text-center">
              AI Generator använder verklig AI för att generera sensowna meddelanden.
              Gränsen återställs varje dag klockan 00:00.
            </Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
