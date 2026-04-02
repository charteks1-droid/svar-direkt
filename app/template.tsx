import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAnalytics } from "@/hooks/use-analytics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories } from "@/data/scenarios";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import * as Sharing from "expo-sharing";
import { useMessageHistory } from "@/hooks/use-message-history";

export default function TemplateScreen() {
  const { categoryId, scenarioId } = useLocalSearchParams<{
    categoryId: string;
    scenarioId: string;
  }>();
  const router = useRouter();
  const colors = useColors();
  const { addMessage } = useMessageHistory();
  const { trackEvent } = useAnalytics();

  const category = categories.find((c) => c.id === categoryId);
  const scenario = category?.scenarios.find((s) => s.id === scenarioId);

  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);


  const updateValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const filledTemplate = useMemo(() => {
    if (!scenario) return "";
    let text = scenario.template;
    for (const ph of scenario.placeholders) {
      const val = values[ph.key]?.trim();
      const replacement = val || `[${ph.key}]`;
      text = text.replace(new RegExp(`\\[${ph.key}\\]`, "g"), replacement);
    }
    return text;
  }, [scenario, values]);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(filledTemplate);
      trackEvent("template_copied", categoryId, scenarioId);
      if (scenario && category) {
        await addMessage(filledTemplate, scenario.title, category.id);
      }
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const handleSendEmail = async () => {
    try {
      const subject = scenario?.title || "Meddelande från Svar Direkt";
      
      if (Platform.OS === "web") {
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(filledTemplate)}`;
        window.location.href = mailtoLink;
      } else {
        // Use Sharing API for native platforms
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(filledTemplate, {
            mimeType: "text/plain",
            dialogTitle: "Dela meddelande",
          });
        } else {
          console.warn("Sharing not available on this platform");
        }
      }
      
      // Save to message history
      if (scenario && category) {
        await addMessage(filledTemplate, scenario.title, category.id);
      }
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      console.error("Failed to send email:", e);
    }
  };

  if (!scenario || !category) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center p-6">
        <Text className="text-foreground text-lg">Meddelandet hittades inte.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.6 },
          ]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]} numberOfLines={2}>
            {scenario.title}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            {category.title}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Placeholder Fields */}
          {scenario.placeholders.length > 0 && (
            <View style={styles.fieldsSection}>
              <Text style={[styles.sectionLabel, { color: colors.muted }]}>
                Fyll i dina uppgifter
              </Text>
              {scenario.placeholders.map((ph) => (
                <View key={ph.key} style={styles.fieldRow}>
                  <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                    {ph.label}
                  </Text>
                  <TextInput
                    style={[
                      styles.fieldInput,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder={ph.label}
                    placeholderTextColor={colors.muted}
                    value={values[ph.key] || ""}
                    onChangeText={(text) => updateValue(ph.key, text)}
                    returnKeyType="done"
                    autoCorrect={false}
                  />
                </View>
              ))}
            </View>
          )}

          {/* Message Preview */}
          <View style={styles.messageSection}>
            <Text style={[styles.sectionLabel, { color: colors.muted }]}>
              Förhandsgranskning
            </Text>
            <View
              style={[
                styles.messageBox,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.messageText, { color: colors.foreground }]}
                selectable
              >
                {filledTemplate}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={[styles.bottomBar, { borderTopColor: colors.border }]}>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleCopy}
              style={({ pressed }) => [
                styles.actionButton,
                styles.copyButton,
                {
                  backgroundColor: copied ? colors.success : colors.primary,
                },
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
              ]}
            >
              <MaterialIcons
                name={copied ? "check" : "content-copy"}
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>
                {copied ? "Kopierat!" : "Kopiera"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fieldsSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  fieldRow: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  fieldInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  messageSection: {
    marginBottom: 16,
  },
  messageBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
  },
  copyButton: {},
  emailButton: {},
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
