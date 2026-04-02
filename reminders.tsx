import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePushNotifications } from "@/hooks/use-push-notifications";

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  createdAt: number;
}

export default function RemindersScreen() {
  const router = useRouter();
  const colors = useColors();
  const { scheduleReminder, cancelReminder } = usePushNotifications();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("09:00");

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem("reminders");
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading reminders:", error);
    }
  };

  const saveReminders = async (newReminders: Reminder[]) => {
    try {
      await AsyncStorage.setItem("reminders", JSON.stringify(newReminders));
      setReminders(newReminders);
    } catch (error) {
      console.error("Error saving reminders:", error);
    }
  };

  const addReminder = async () => {
    if (!title.trim() || !dueDate.trim()) {
      Alert.alert("Fel", "Fyll i titel och datum");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      dueTime: dueTime,
      createdAt: Date.now(),
    };

    // Schedule push notification (1 day before at 09:00)
    if (Platform.OS !== "web") {
      await scheduleReminder({
        id: newReminder.id,
        title: newReminder.title,
        body: newReminder.description,
        topic: newReminder.title,
        dueDate: new Date(newReminder.dueDate),
        dueTime: newReminder.dueTime,
      });
    }

    const updated = [...reminders, newReminder];
    saveReminders(updated);

    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("09:00");
    setShowForm(false);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const deleteReminder = async (id: string) => {
    // Cancel push notification
    if (Platform.OS !== "web") {
      await cancelReminder(id);
    }
    
    const updated = reminders.filter((r) => r.id !== id);
    saveReminders(updated);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
            Påminnelser
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Hantera dina deadlines
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {reminders.length === 0 && !showForm ? (
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
              <MaterialIcons name="notifications-none" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              Inga påminnelser än
            </Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Skapa en påminnelse för att hålla koll på viktiga deadlines
            </Text>
          </View>
        ) : (
          <>
            {reminders.map((reminder) => (
              <View
                key={reminder.id}
                style={[
                  styles.reminderCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.reminderTitle, { color: colors.foreground }]}>
                    {reminder.title}
                  </Text>
                  {reminder.description && (
                    <Text style={[styles.reminderDescription, { color: colors.muted }]}>
                      {reminder.description}
                    </Text>
                  )}
                  <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
                    <Text style={[styles.reminderDate, { color: colors.primary }]}>
                      📅 {reminder.dueDate}
                    </Text>
                    <Text style={[styles.reminderDate, { color: colors.primary }]}>
                      🔔 {reminder.dueTime}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => deleteReminder(reminder.id)}
                  style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                >
                  <MaterialIcons name="delete" size={20} color={colors.muted} />
                </Pressable>
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
              Titel
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
              placeholder="T.ex. Svar på Skatteverket"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={[styles.formLabel, { color: colors.foreground, marginTop: 12 }]}>
              Beskrivning (valfritt)
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
              placeholder="Lägg till detaljer..."
              placeholderTextColor={colors.muted}
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={[styles.formLabel, { color: colors.foreground, marginTop: 12 }]}>
              Datum
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
              placeholder="T.ex. 2026-03-15"
              placeholderTextColor={colors.muted}
              value={dueDate}
              onChangeText={setDueDate}
            />

            <Text style={[styles.formLabel, { color: colors.foreground, marginTop: 12 }]}>
              Tid för påminnelse (1 dag innan)
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
              placeholder="T.ex. 09:00"
              placeholderTextColor={colors.muted}
              value={dueTime}
              onChangeText={setDueTime}
            />

            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <Pressable
                onPress={() => {
                  setShowForm(false);
                  setTitle("");
                  setDescription("");
                  setDueDate("");
                  setDueTime("09:00");
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
                onPress={addReminder}
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
                  Lägg till
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
            <Text style={styles.addButtonText}>Ny påminnelse</Text>
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
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 12,
    fontWeight: "500",
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
