import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories, type Scenario } from "@/data/scenarios";
import * as Haptics from "expo-haptics";
import { Platform, Text, View, Pressable, FlatList, StyleSheet, ScrollView } from "react-native";

const ScreenContainer = View;

const colors = {
  primary: "#2563eb",
  background: "#ffffff",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  surface: "#f5f5f5",
};

export default function SituationsScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <ScreenContainer
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.foreground, fontSize: 18 }}>Kategori hittades inte.</Text>
      </ScreenContainer>
    );
  }

  if (!category.scenarios || category.scenarios.length === 0) {
    return (
      <ScreenContainer style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 24 }}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                { position: "absolute", top: 16, left: 16, padding: 8 },
                pressed && { opacity: 0.6 },
              ]}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </Pressable>

            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: `${colors.primary}15`,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <MaterialIcons name="schedule" size={40} color={colors.primary} />
            </View>

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

            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: colors.primary,
                textAlign: "center",
              }}
            >
              {category.title}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: colors.muted,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              Färdiga svar och mallar för denna myndighet läggs till i en kommande uppdatering av
              appen.
            </Text>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
                gap: 8,
                width: "100%",
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
                • Utforska andra kategorier med färdiga svar{"\n"}• Gå tillbaka till startsidan{"\n"}•
                Fler mallar kommer snart
              </Text>
            </View>

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

  const handleScenarioPress = (scenarioId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push({
      pathname: "/template" as any,
      params: { categoryId: category.id, scenarioId },
    });
  };

  const renderItem = ({ item }: { item: Scenario }) => (
    <Pressable
      onPress={() => handleScenarioPress(item.id)}
      style={({ pressed }) => [
        styles.listItem,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, { color: colors.foreground }]}>{item.title}</Text>
        <Text
          style={[styles.listItemDescription, { color: colors.muted }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={22} color={colors.muted} />
    </Pressable>
  );

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>{category.title}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>Välj din situation</Text>
        </View>
      </View>

      <FlatList
        data={category.scenarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
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
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  listItemDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
