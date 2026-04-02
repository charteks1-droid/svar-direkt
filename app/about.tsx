import { useRouter } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

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
    <View style={{ flex: 1 }}>
      <View className="flex-row items-center justify-between mb-6">
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
          {/* App Info */}
          <View className="bg-surface rounded-lg p-4 gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Svar Direkt
            </Text>
            <Text className="text-sm text-muted">
              Version 1.0.0
            </Text>
            <Text className="text-sm text-muted leading-relaxed mt-2">
              En praktisk app för att skriva och skicka meddelanden till svenska myndigheter. Med över 100 färdiga mallar för olika situationer.
            </Text>
          </View>

          {/* Open Source */}
          <View className="bg-surface rounded-lg p-4 gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Open Source
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              Svar Direkt använder följande open source-bibliotek:
            </Text>

            <View className="gap-2 mt-2">
              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  React Native
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - Facebook
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  Expo
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - Expo
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  Expo Router
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - Expo
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  NativeWind
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - NativeWind
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  Tailwind CSS
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - Tailwind Labs
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  React Navigation
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - React Navigation
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  tRPC
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - tRPC
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  TanStack Query
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - TanStack
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  AsyncStorage
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - React Native Community
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-semibold text-foreground">
                  Expo Vector Icons
                </Text>
                <Text className="text-xs text-muted">
                  MIT License - Expo
                </Text>
              </View>
            </View>

            <Text className="text-xs text-muted leading-relaxed mt-3">
              Alla dessa bibliotek är licensierade under MIT License eller liknande permissiva licenser, vilket innebär att de är fria att använda, modifiera och distribuera.
            </Text>
          </View>

          {/* Disclaimer */}
          <View className="bg-surface rounded-lg p-4 gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Juridisk ansvarsfriskrivning
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              Svar Direkt tillhandahåller inte juridisk rådgivning. Appens mallar är endast för observationsändamål och baserade på allmän kunskap om svenska myndigheters kommunikation. 
            </Text>
            <Text className="text-xs text-muted leading-relaxed mt-2">
              Varje situation är unik. Kontakta alltid en jurist eller relevant myndighet för specifik vägledning.
            </Text>
          </View>

          {/* Contact */}
          <View className="bg-surface rounded-lg p-4 gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Kontakt
            </Text>
            <Text className="text-sm text-muted">
              Har du frågor eller feedback?
            </Text>
            <Text className="text-sm text-primary font-semibold">
              charteks1@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
