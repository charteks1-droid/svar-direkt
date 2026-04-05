import { useState, useCallback, useMemo } from "react";
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories } from "@/data/scenarios";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  background: "#ffffff",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  surface: "#f5f5f5",
  success: "#16a34a",
};

export default function TemplateScreen() {
  const { categoryId, scenarioId } = useLocalSearchParams<{
    categoryId: string;
    scenarioId: string;
  }>();

  const router = useRouter();

  const category = categories.find((c) => c.id === categoryId);
  const scenario = category?.scenarios.find((s) => s.id === scenarioId);

  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const updateValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const filledTemplate = useMemo(() => {
    if (!scenario) return "";

    if ("template" in scenario && Array.isArray((scenario as any).placeholders)) {
      let text = (scenario as any).template ?? "";
      for (const ph of (scenario as any).placeholders) {
        const val = values[ph.key]?.trim();
        const replacement = val || `[${ph.key}]`;
        text = text.replace(new RegExp(`\\[${ph.key}\\]`, "g"), replacement);
      }
      return text;
    }

    return (scenario as any).content ?? "";
  }, [scenario, values]);

  const placeholders =
    scenario && "placeholders" in scenario && Array.isArray((scenario as any).placeholders)
      ? (scenario as any).placeholders
      : [];

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(filledTemplate);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  if (!scenario || !category) {
    return (
      <ScreenContainer
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.foreground, fontSize: 18 }}>
          Meddelandet hittades inte.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
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
          {placeholders.length > 0 && (
            <View style={styles.fieldsSection}>
              <Text style={[styles.sectionLabel, { color: colors.muted }]}>
                Fyll i dina uppgifter
              </Text>

              {placeholders.map((ph: any) => (
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
              <Text style={[styles.messageText, { color: colors.foreground }]} selectable>
                {filledTemplate}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [
              styles.actionButton,
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
            <Text style={styles.buttonText}>{copied ? "Kopierat!" : "Kopiera"}</Text>
          </Pressable>

          <View style={{ height: 24 }} />
        </ScrollView>
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
    paddingBottom: 40,
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
  actionButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
