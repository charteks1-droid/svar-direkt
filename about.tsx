import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

export default function AboutScreen() {
 const router = useRouter();
  const colors = useColors();

  const handleBackPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="mb-6 flex-row items-center justify-between">
        <Pressable
          onPress={handleBackPress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
        </Pressable>

        <Text className="text-2xl font-bold text-foreground">Om appen</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <View className="gap-2 rounded-lg bg-surface p-4">
            <Text className="text-lg font-semibold text-foreground">Svar Direkt</Text>
            <Text className="text-sm text-muted">Version 1.0.0</Text>
            <Text className="mt-2 text-sm leading-relaxed text-muted">
              En praktisk app för att skriva och skicka meddelanden till svenska myndigheter.
              Med över 100 färdiga mallar för olika situationer.
            </Text>
          </View>

          <View className="gap-3 rounded-lg bg-surface p-4">
            <Text className="text-lg font-semibold text-foreground">Open Source</Text>
            <Text className="text-sm leading-relaxed text-muted">
              Svar Direkt använder följande open source-bibliotek:
            </Text>

            <View className="mt-2 gap-2">
              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">React Native</Text>
                <Text className="text-xs text-muted">MIT License - Facebook</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">Expo</Text>
                <Text className="text-xs text-muted">MIT License - Expo</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">Expo Router</Text>
                <Text className="text-xs text-muted">MIT License - Expo</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">NativeWind</Text>
                <Text className="text-xs text-muted">MIT License - NativeWind</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">Tailwind CSS</Text>
                <Text className="text-xs text-muted">MIT License - Tailwind Labs</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">React Navigation</Text>
                <Text className="text-xs text-muted">MIT License - React Navigation</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">tRPC</Text>
                <Text className="text-xs text-muted">MIT License - tRPC</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">TanStack Query</Text>
                <Text className="text-xs text-muted">MIT License - TanStack</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">AsyncStorage</Text>
                <Text className="text-xs text-muted">MIT License - React Native Community</Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">Expo Vector Icons</Text>
                <Text className="text-xs text-muted">MIT License - Expo</Text>
              </View>
            </View>

            <Text className="mt-3 text-xs leading-relaxed text-muted">
              Alla dessa bibliotek är licensierade under MIT License eller liknande permissiva
              licenser, vilket innebär att de är fria att använda, modifiera och distribuera.
            </Text>
          </View>

          <View className="gap-2 rounded-lg bg-surface p-4">
            <Text className="text-lg font-semibold text-foreground">
              Juridisk ansvarsfriskrivning
            </Text>
            <Text className="text-xs leading-relaxed text-muted">
              Svar Direkt tillhandahåller inte juridisk rådgivning. Appens mallar är endast för
              observationsändamål och baserade på allmän kunskap om svenska myndigheters
              kommunikation.
            </Text>
            <Text className="mt-2 text-xs leading-relaxed text-muted">
              Varje situation är unik. Kontakta alltid en jurist eller relevant myndighet för
              specifik vägledning.
            </Text>
          </View>

          <View className="gap-2 rounded-lg bg-surface p-4">
            <Text className="text-lg font-semibold text-foreground">Kontakt</Text>
            <Text className="text-sm text-muted">Har du frågor eller feedback?</Text>
            <Text className="text-sm font-semibold text-primary">charteks1@gmail.com</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
