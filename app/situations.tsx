import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories, type Scenario } from "@/data/scenarios";
import * as Haptics from "expo-haptics";
import { Platform, Text, View, Pressable, FlatList, StyleSheet } from "react-native";

const ScreenContainer = View;

const colors = {
  primary: "#0f8db3",
  primarySoft: "#e7f6fb",
  background: "#f4f8fb",
  foreground: "#0f172a",
  muted: "#6b7c8f",
  border: "#d9e4ec",
  surface: "#ffffff",
};

export default function SituationsScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();

  const category = categories.find((c) => c.id === categoryId);

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleScenarioPress = (scenarioId: string) => {
    if (!category) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push({
      pathname: "/template",
      params: { categoryId: category.id, scenarioId },
    });
  };

  if (!category) {
    return (
      <ScreenContainer style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>
          Kategori hittades inte
        </Text>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.retryButtonText}>Tillbaka</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  if (!category.scenarios || category.scenarios.length === 0) {
    return (
      <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="arrow-back" size={28} color={colors.foreground} />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: colors.foreground }]} numberOfLines={1}>
              {category.title}
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
              Välj din situation
            </Text>
          </View>
        </View>

        <View style={styles.emptyWrap}>
          <View style={[styles.emptyIconBox, { backgroundColor: colors.primarySoft }]}>
            <MaterialIcons name="schedule" size={34} color={colors.primary} />
          </View>

          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
            Innehåll kommer snart
          </Text>

          <Text style={[styles.emptyText, { color: colors.muted }]}>
            Den här kategorin är inte färdig ännu, men mallar läggs till i en kommande uppdatering.
          </Text>

          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.92 },
            ]}
          >
            <Text style={styles.primaryButtonText}>Tillbaka</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  const renderItem = ({ item }: { item: Scenario }) => (
    <Pressable
      onPress={() => handleScenarioPress(item.id)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardTextWrap}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>{item.title}</Text>
        <Text style={[styles.cardDescription, { color: colors.muted }]} numberOfLines={3}>
          {item.description}
        </Text>
      </View>

      <View style={[styles.chevronWrap, { backgroundColor: colors.primarySoft }]}>
        <MaterialIcons name="chevron-right" size={22} color={colors.primary} />
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons name="arrow-back" size={28} color={colors.foreground} />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]} numberOfLines={1}>
            {category.title}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Välj din situation
          </Text>
        </View>
      </View>

      <FlatList
        data={category.scenarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 10,
    padding: 2,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 24,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    paddingBottom: 28,
  },
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.985 }],
  },
  cardTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 21,
  },
  chevronWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyIconBox: {
    width: 82,
    height: 82,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    minWidth: 160,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
