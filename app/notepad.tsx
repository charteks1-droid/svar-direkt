import { useState, useEffect } from "react";
import { View, TextInput, ScrollView, StyleSheet, Text, Pressable, Platform, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";

interface NotepadData {
  noteText: string;
  fullName: string;
  personnummer: string;
}

const NOTEPAD_STORAGE_KEY = "svar_direkt_notepad";

export default function NotepadScreen() {
  const colors = useColors();
  const [noteText, setNoteText] = useState("");
  const [fullName, setFullName] = useState("");
  const [personnummer, setPersonnummer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mailAvailable, setMailAvailable] = useState(false);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadNotepadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(NOTEPAD_STORAGE_KEY);
        if (savedData) {
          const data: NotepadData = JSON.parse(savedData);
          setNoteText(data.noteText || "");
          setFullName(data.fullName || "");
          setPersonnummer(data.personnummer || "");
        }
      } catch (error) {
        console.error("Error loading notepad data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotepadData();
  }, []);

  // Save data to AsyncStorage whenever any field changes
  useEffect(() => {
    if (!isLoading) {
      const saveNotepadData = async () => {
        try {
          const data: NotepadData = {
            noteText,
            fullName,
            personnummer,
          };
          await AsyncStorage.setItem(NOTEPAD_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.error("Error saving notepad data:", error);
        }
      };

      saveNotepadData();
    }
  }, [noteText, fullName, personnummer, isLoading]);



  const handleClearAll = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setNoteText("");
    setFullName("");
    setPersonnummer("");
  };

  const handleCopy = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    try {
      const textToCopy = `${noteText}\n\n---\nNamn: ${fullName}\nPersonnummer: ${personnummer}`;
      await Clipboard.setStringAsync(textToCopy);
      
      // Show success feedback
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      if (Platform.OS === "web") {
        alert("Anteckningsblocket har kopierats till urklipp!");
      } else {
        Alert.alert("Kopierat", "Anteckningsblocket har kopierats till urklipp!");
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Kunde inte kopiera till urklipp");
    }
  };

  const handleSendEmail = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      const emailBody = `${noteText}\n\n---\nNamn: ${fullName}\nPersonnummer: ${personnummer}`;
      const subject = "Meddelande från Svar Direkt";
      
      if (Platform.OS === "web") {
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
      } else {
        await Sharing.shareAsync(emailBody, {
          mimeType: "text/plain",
          dialogTitle: "Dela meddelande",
        });
      }
      
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Alert.alert("Fel", "Kunde inte dela meddelandet.");
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.muted }}>Laddar...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground }}>
            Anteckningsblock
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
            Skriv fritt. Allt sparas automatiskt.
          </Text>
        </View>

        {/* Main text editor */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 12 }}>
          <TextInput
            style={[
              styles.noteInput,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            placeholder="Skriv här..."
            placeholderTextColor={colors.muted}
            multiline
            value={noteText}
            onChangeText={setNoteText}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* Footer with user info fields */}
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground, marginBottom: 10 }}>
            Personuppgifter
          </Text>

          <TextInput
            style={[
              styles.inputField,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            placeholder="Fullständigt namn"
            placeholderTextColor={colors.muted}
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={[
              styles.inputField,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            placeholder="Personnummer"
            placeholderTextColor={colors.muted}
            value={personnummer}
            onChangeText={setPersonnummer}
          />

          {/* Button container */}
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {/* Copy button */}
            <Pressable
              onPress={handleCopy}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: colors.primary, flex: 1, minWidth: "48%" },
                pressed && { opacity: 0.8 },
              ]}
            >
              <MaterialIcons name="content-copy" size={16} color={colors.background} />
              <Text style={{ color: colors.background, fontSize: 12, fontWeight: "600", marginLeft: 6 }}>
                Kopiera
              </Text>
            </Pressable>

            {/* Email button */}
            {mailAvailable && (
              <Pressable
                onPress={handleSendEmail}
                style={({ pressed }) => [
                  styles.actionButton,
                  { backgroundColor: colors.primary, flex: 1, minWidth: "48%" },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <MaterialIcons name="mail" size={16} color={colors.background} />
                <Text style={{ color: colors.background, fontSize: 12, fontWeight: "600", marginLeft: 6 }}>
                  Email
                </Text>
              </Pressable>
            )}

            {/* Clear button */}
            <Pressable
              onPress={handleClearAll}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: colors.error, flex: 1, minWidth: "48%" },
                pressed && { opacity: 0.8 },
              ]}
            >
              <MaterialIcons name="delete" size={16} color={colors.background} />
              <Text style={{ color: colors.background, fontSize: 12, fontWeight: "600", marginLeft: 6 }}>
                Rensa allt
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  noteInput: {
    flex: 1,
    minHeight: 200,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  inputField: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 13,
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
