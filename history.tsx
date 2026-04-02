import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useMessageHistory } from "@/hooks/use-message-history";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function HistoryScreen() {
  const colors = useColors();
  const { history, isLoading, deleteMessage, clearHistory } = useMessageHistory();

  const handleCopyMessage = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      Alert.alert("Kopierat", "Meddelandet har kopierats till urklipp");
    } catch (error) {
      Alert.alert("Fel", "Kunde inte kopiera meddelandet");
    }
  };

  const handleDeleteMessage = (id: string) => {
    Alert.alert("Radera meddelande", "Är du säker?", [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Radera",
        style: "destructive",
        onPress: () => deleteMessage(id),
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert("Rensa all historia", "Är du säker? Detta kan inte ångras.", [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Rensa",
        style: "destructive",
        onPress: () => clearHistory(),
      },
    ]);
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.foreground }}>Laddar historia...</Text>
      </ScreenContainer>
    );
  }

  if (history.length === 0) {
    return (
      <ScreenContainer className="items-center justify-center p-6">
        <MaterialIcons name="history" size={48} color={colors.muted} />
        <Text
          style={{
            color: colors.foreground,
            fontSize: 18,
            fontWeight: "600",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Ingen historia ännu
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: 14,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Meddelanden du kopierar sparas här
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "600" }}>
          Meddelandehistoria ({history.length})
        </Text>
        {history.length > 0 && (
          <Pressable
            onPress={handleClearAll}
            style={({ pressed }) => [
              {
                padding: 8,
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <MaterialIcons name="delete-sweep" size={20} color={colors.error} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 12,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.foreground, fontWeight: "600", fontSize: 14 }}>
                  {item.templateTitle}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>
                  {item.date}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable
                  onPress={() => handleCopyMessage(item.text)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                >
                  <MaterialIcons name="content-copy" size={18} color={colors.primary} />
                </Pressable>
                <Pressable
                  onPress={() => handleDeleteMessage(item.id)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                >
                  <MaterialIcons name="delete" size={18} color={colors.error} />
                </Pressable>
              </View>
            </View>
            <Text
              style={{
                color: colors.foreground,
                fontSize: 12,
                lineHeight: 18,
                maxHeight: 60,
              }}
              numberOfLines={3}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}
