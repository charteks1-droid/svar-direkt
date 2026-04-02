import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function ComingSoonScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 24 }}>
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
              fontSize: 24,
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
              fontSize: 16,
              color: colors.muted,
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            Färdiga svar och mallar för denna myndighet läggs till i en kommande uppdatering av appen.
          </Text>

          {/* Additional Info */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: colors.foreground,
              }}
            >
              Vad kan du göra nu?
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colors.muted,
                lineHeight: 20,
              }}
            >
              • Utforska andra kategorier med färdiga svar{"\n"}
              • Använd Anteckningsblock för att skriva egna meddelanden{"\n"}
              • Läs vägledning och ordlista för juridiska begrepp
            </Text>
          </View>

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: colors.primary,
                marginTop: 16,
              },
              pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Text
              style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Tillbaka
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
