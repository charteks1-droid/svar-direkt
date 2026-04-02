import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";

interface CustomTemplate {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export default function CustomTemplatesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const stored = await AsyncStorage.getItem("customTemplates");
      if (stored) {
        setTemplates(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  const saveTemplates = async (newTemplates: CustomTemplate[]) => {
    try {
      await AsyncStorage.setItem("customTemplates", JSON.stringify(newTemplates));
      setTemplates(newTemplates);
    } catch (error) {
      console.error("Error saving templates:", error);
    }
  };

  const addTemplate = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Fel", "Fyll i titel och innehål");
      return;
    }

    const newTemplate: CustomTemplate = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    };

    const updated = [...templates, newTemplate];
    saveTemplates(updated);

    setTitle("");
    setContent("");
    setShowForm(false);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter((t) => t.id !== id);
    saveTemplates(updated);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const copyTemplate = async (template: CustomTemplate) => {
    try {
      await Clipboard.setStringAsync(template.content);
      setCopied(template.id);
      setTimeout(() => setCopied(null), 2000);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

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
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Mina mallar
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Skapa och hantera egna mallar
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {templates.length === 0 && !showForm ? (
          <View style={{ alignItems: "center", marginTop: 60, gap: 16 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.primary + "15",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="description" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              Inga egna mallar än
            </Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Skapa dina egna mallar för meddelanden du använder ofta
            </Text>
          </View>
        ) : (
          <>
            {templates.map((template) => (
              <View
                key={template.id}
                style={[
                  styles.templateCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.templateTitle, { color: colors.foreground }]}>
                    {template.title}
                  </Text>
                  <Text
                    style={[styles.templateContent, { color: colors.muted }]}
                    numberOfLines={2}
                  >
                    {template.content}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Pressable
                    onPress={() => copyTemplate(template)}
                    style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                  >
                    <MaterialIcons
                      name={copied === template.id ? "check" : "content-copy"}
                      size={20}
                      color={copied === template.id ? colors.success : colors.primary}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => deleteTemplate(template.id)}
                    style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                  >
                    <MaterialIcons name="delete" size={20} color={colors.muted} />
                  </Pressable>
                </View>
              </View>
            ))}
          </>
        )}

        {showForm && (
          <View
            style={[
              styles.formCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.formLabel, { color: colors.foreground }]}>
              Mallens titel
            </Text>
            <TextInput
              style={[
                styles.formInput,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="T.ex. Standardsvar till Skatteverket"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={[styles.formLabel, { color: colors.foreground, marginTop: 12 }]}>
              Mallens innehål
            </Text>
            <TextInput
              style={[
                styles.formInput,
                styles.contentInput,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="Skriv mallens innehål här..."
              placeholderTextColor={colors.muted}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />

            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <Pressable
                onPress={() => {
                  setShowForm(false);
                  setTitle("");
                  setContent("");
                }}
                style={({ pressed }) => [
                  styles.formButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={[styles.formButtonText, { color: colors.muted }]}>
                  Avbryt
                </Text>
              </Pressable>
              <Pressable
                onPress={addTemplate}
                style={({ pressed }) => [
                  styles.formButton,
                  {
                    backgroundColor: colors.primary,
                    flex: 1,
                  },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={[styles.formButtonText, { color: colors.background }]}>
                  Spara mall
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>

      {!showForm && (
        <View style={[styles.bottomBar, { borderTopColor: colors.border }]}>
          <Pressable
            onPress={() => setShowForm(true)}
            style={({ pressed }) => [
              styles.addButton,
              {
                backgroundColor: colors.primary,
              },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <MaterialIcons name="add" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Ny mall</Text>
          </Pressable>
        </View>
      )}
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
    fontSize: 22,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  templateCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  templateContent: {
    fontSize: 13,
  },
  formCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  contentInput: {
    minHeight: 120,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
