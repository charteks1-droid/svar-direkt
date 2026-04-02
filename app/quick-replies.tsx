import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import { QUICK_REPLIES } from "@/data/quick-replies";

export default function QuickRepliesScreen() {
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const category = selectedCategory
    ? QUICK_REPLIES.find((c) => c.id === selectedCategory)
    : null;

  const handleCopyMessage = async (message: string) => {
    const finalMessage = userName ? `${message}\n\n${userName}` : message;
    await Clipboard.setStringAsync(finalMessage);
    Alert.alert("Kopierat", "Meddelandet har kopierats till urklipp");
  };

  const handleEditMessage = (message: string) => {
    setEditingMessage(message);
  };

  const handleSaveEdit = async () => {
    if (editingMessage) {
      await handleCopyMessage(editingMessage);
      setEditingMessage(null);
    }
  };

  if (showSettings) {
    return (
      <ScreenContainer edges={["top", "left", "right", "bottom"]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Pressable
            onPress={() => setShowSettings(false)}
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </Pressable>          <Text style={[styles.settingLabel, { color: colors.foreground }]}>
            Inställningar
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.settingsContent}>
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              Dina uppgifter (valfritt)
            </Text>
            <Text style={[styles.settingDescription, { color: colors.muted }]}>
              Dessa uppgifter läggs till i slutet av varje meddelande
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                },
              ]}
              placeholder="Namn"
              placeholderTextColor={colors.muted}
              value={userName}
              onChangeText={setUserName}
            />

            <Text style={[styles.preview, { color: colors.muted }]}>
              Förhandsgranskning: {userName || "(ingen)"}
            </Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (editingMessage) {
    return (
      <ScreenContainer edges={["top", "left", "right", "bottom"]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Pressable
            onPress={() => setEditingMessage(null)}
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="close" size={24} color={colors.primary} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Redigera meddelande
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.editContent}>
            <TextInput
              style={[
                styles.editInput,
                {
                  borderColor: colors.border,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                },
              ]}
              multiline
              numberOfLines={6}
              value={editingMessage}
              onChangeText={setEditingMessage}
              textAlignVertical="top"
            />

            <View style={styles.editActions}>
              <Pressable
                onPress={handleSaveEdit}
                style={({ pressed }) => [
                  styles.saveButton,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <MaterialIcons name="check" size={20} color="white" />
                <Text style={styles.saveButtonText}>Kopiera och stäng</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (!selectedCategory) {
    return (
      <ScreenContainer edges={["top", "left", "right"]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Snabba svar
          </Text>
          <Pressable
            onPress={() => setShowSettings(true)}
            style={({ pressed }) => [styles.settingsButton, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="settings" size={24} color={colors.primary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesGrid}>
            {QUICK_REPLIES.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={({ pressed }) => [
                  styles.categoryCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <MaterialIcons
                  name={cat.icon as any}
                  size={32}
                  color={colors.primary}
                  style={styles.categoryIcon}
                />
                <Text style={[styles.categoryName, { color: colors.foreground }]}>
                  {cat.name}
                </Text>
                <Text style={[styles.categoryCount, { color: colors.muted }]}>
                  {cat.replies.length} svar
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => setSelectedCategory(null)}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          {category?.name}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.repliesList}>
          {category?.replies.map((reply) => (
            <View key={reply.id} style={[styles.replyCard, { borderColor: colors.border }]}>
              <Text style={[styles.replyTitle, { color: colors.foreground }]}>
                {reply.title}
              </Text>
              <Text style={[styles.replyMessage, { color: colors.muted }]}>
                {reply.message}
              </Text>

              <View style={styles.replyActions}>
                <Pressable
                  onPress={() => handleEditMessage(reply.message)}
                  style={({ pressed }) => [
                    styles.actionButton,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <MaterialIcons name="edit" size={18} color={colors.primary} />
                  <Text style={[styles.actionButtonText, { color: colors.foreground }]}>
                    Redigera
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleCopyMessage(reply.message)}
                  style={({ pressed }) => [
                    styles.actionButton,
                    {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <MaterialIcons name="content-copy" size={18} color="white" />
                  <Text style={[styles.actionButtonText, { color: "white" }]}>
                    Kopiera
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    marginLeft: 12,
  },
  backButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
  },
  repliesList: {
    gap: 12,
  },
  replyCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  replyTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  replyMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  replyActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  settingsContent: {
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginTop: 8,
  },
  preview: {
    fontSize: 12,
    marginTop: 4,
  },
  editContent: {
    gap: 16,
  },
  editInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginTop: 8,
  },
  editActions: {
    flexDirection: "row",
    gap: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
