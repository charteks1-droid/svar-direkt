import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  background: "#ffffff",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  surface: "#f5f5f5",
};

export default function AboutScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <View style={{ marginBottom: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Pressable
          onPress={handleBackPress}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
        </Pressable>

        <Text style={{ fontSize: 24, fontWeight: "700", color: colors.foreground }}>
          Om appen
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ gap: 24 }}>
          <View
            style={{
              gap: 8,
              borderRadius: 12,
              backgroundColor: colors.surface,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Svar Direkt
            </Text>
            <Text style={{ fontSize: 14, color: colors.muted }}>Version 1.0.0</Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                lineHeight: 20,
                color: colors.muted,
              }}
            >
              En praktisk app för att skriva och skicka meddelanden till svenska myndigheter.
              Med över 100 färdiga mallar för olika situationer.
            </Text>
          </View>

          <View
            style={{
              gap: 12,
              borderRadius: 12,
              backgroundColor: colors.surface,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Open Source
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: colors.muted }}>
              Svar Direkt använder följande open source-bibliotek:
            </Text>

            <View style={{ marginTop: 8, gap: 8 }}>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  React Native
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - Facebook</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  Expo
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - Expo</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  Expo Router
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - Expo</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  NativeWind
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - NativeWind</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  Tailwind CSS
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - Tailwind Labs</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  React Navigation
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>
                  MIT License - React Navigation
                </Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  tRPC
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - tRPC</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  TanStack Query
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - TanStack</Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  AsyncStorage
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>
                  MIT License - React Native Community
                </Text>
              </View>

              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  Expo Vector Icons
                </Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>MIT License - Expo</Text>
              </View>
            </View>

            <Text
              style={{
                marginTop: 12,
                fontSize: 12,
                lineHeight: 18,
                color: colors.muted,
              }}
            >
              Alla dessa bibliotek är licensierade under MIT License eller liknande permissiva
              licenser, vilket innebär att de är fria att använda, modifiera och distribuera.
            </Text>
          </View>

          <View
            style={{
              gap: 8,
              borderRadius: 12,
              backgroundColor: colors.surface,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Juridisk ansvarsfriskrivning
            </Text>
            <Text style={{ fontSize: 12, lineHeight: 18, color: colors.muted }}>
              Svar Direkt tillhandahåller inte juridisk rådgivning. Appens mallar är endast för
              observationsändamål och baserade på allmän kunskap om svenska myndigheters
              kommunikation.
            </Text>
            <Text style={{ marginTop: 8, fontSize: 12, lineHeight: 18, color: colors.muted }}>
              Varje situation är unik. Kontakta alltid en jurist eller relevant myndighet för
              specifik vägledning.
            </Text>
          </View>

          <View
            style={{
              gap: 8,
              borderRadius: 12,
              backgroundColor: colors.surface,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Kontakt
            </Text>
            <Text style={{ fontSize: 14, color: colors.muted }}>
              Har du frågor eller feedback?
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.primary }}>
              charteks1@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
