import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ScreenContainer = View;

export default function ComingSoonScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();

  const colors = {
    primary: "#2563eb",
    background: "#ffffff",
    surface: "#f5f5f5",
    border: "#e5e5e5",
    foreground: "#111111",
    muted: "#666666",
  };

  return (
    <ScreenContainer style={{ flex: 1, padding: 16 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 24 }}>
          
          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            style={{ position: "absolute", top: 16, left: 16 }}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </Pressable>

          {/* Icon */}
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
            <MaterialIcons name="schedule" size={40} color={colors.primary} />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: colors.foreground,
              textAlign: "center",
            }}
          >
            Innehåll kommer snart
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 14,
              color: colors.muted,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Den här kategorin är under utveckling och kommer att uppdateras snart.
          </Text>

          {/* Button */}
          <Pressable
            onPress={() => router.back()}
            style={{
              marginTop: 16,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Tillbaka
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
