import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { categories } from "@/data/scenarios";
import { useSearch, useFavorites, useCopyHistory } from "@/hooks/use-pro-features-v2";
import { Platform, Text, View, Pressable, FlatList, StyleSheet, TextInput, ScrollView } from "react-native";

export default function SituationsScreen() {
  const isPro = true;
  const { categoryId } = useLocalSearchParams() as { categoryId?: string };

if (!categoryId) return null;

const category = categories?.find((c) => c.id === categoryId);

if (!category) return null;

const router = useRouter();

const { searchQuery, setSearchQuery, filteredTemplates } = useSearch(category.scenarios ?? []);
const { isFavorite, addFavorite, removeFavorite } = useFavorites();
const { addToHistory } = useCopyHistory();
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 24 }}>
            {/* Back button */}
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                { position: "absolute", top: 16, left: 16, padding: 8 },
                pressed && { opacity: 0.6 },
              ]}
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
                marginTop: 40,
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

            {/* Category name */}
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

  const handleScenarioPress = (scenarioId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({
      pathname: "/template" as any,
      params: { categoryId: category.id, scenarioId },
    });
  };

  const handleCopy = async (item: Scenario) => {
    // Copy to clipboard using native API
    try {
      // For web and native, use a simple approach
      if (Platform.OS === 'web') {
        navigator.clipboard.writeText(item.content);
      } else {
        // For native, we'll just track in history
        // Real clipboard copy would need native module
      }
    } catch (error) {
      console.error('Copy error:', error);
    }
    await addToHistory({
      templateId: item.id,
      categoryId: category?.id || '',
      content: item.content,
      title: item.title,
      copiedAt: Date.now(),
    });
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleToggleFavorite = async (item: Scenario) => {
    if (isFavorite(item.id)) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(category?.id || '', item.id);
    }
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
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
        <Text style={[styles.listItemTitle, { color: colors.foreground }]}>
          {item.title}
        </Text>
        <Text style={[styles.listItemDescription, { color: colors.muted }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        {isPro && (
          <Pressable
            onPress={() => handleToggleFavorite(item)}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons
              name={isFavorite(item.id) ? "favorite" : "favorite-border"}
              size={20}
              color={isFavorite(item.id) ? colors.primary : colors.muted}
            />
          </Pressable>
        )}
        {isPro && (
          <Pressable
            onPress={() => handleCopy(item)}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="content-copy" size={20} color={colors.primary} />
          </Pressable>
        )}
        <MaterialIcons name="chevron-right" size={22} color={colors.muted} />
      </View>
    </Pressable>
  );

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
            {category.title}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Välj din situation
          </Text>
        </View>
      </View>

      {/* Search Bar (Pro) */}
      {isPro && (
        <View style={[styles.searchContainer, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Sök mallar..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color={colors.muted} />
            </Pressable>
          )}
        </View>
      )}

      {/* Scenario List */}
      <FlatList
        data={isPro ? filteredTemplates : category.scenarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          isPro && searchQuery.length > 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
              <Text style={{ color: colors.muted }}>Inga mallar hittades</Text>
            </View>
          ) : null
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
  },
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
