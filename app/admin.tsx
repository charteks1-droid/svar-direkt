import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { trpc } from "@/lib/trpc";

interface AnalyticsEvent {
  id: number;
  deviceId: string;
  eventType: string;
  categoryId?: string | null;
  scenarioId?: string | null;
  metadata?: string | null;
  timestamp: Date;
}

interface Summary {
  totalEvents: number;
  uniqueDevices: number;
  eventsByType: Record<string, number>;
  eventsByCategory: Record<string, number>;
  last24hEvents: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const colors = useColors();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"summary" | "events" | "devices">("summary");

  const adminLogin = trpc.admin.login.useMutation();
  const getSummary = trpc.admin.getSummary.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const getEvents = trpc.admin.getEvents.useQuery(
    { limit: 50, offset: 0 },
    { enabled: isAuthenticated }
  );

  useEffect(() => {
    if (getSummary.data) {
      setSummary(getSummary.data);
    }
  }, [getSummary.data]);

  useEffect(() => {
    if (getEvents.data) {
      setEvents(getEvents.data.events || []);
    }
  }, [getEvents.data]);

  const handleLogin = async () => {
    if (!password) {
      Alert.alert("Fel", "Ange lösenord");
      return;
    }

    setIsLoading(true);
    try {
      const result = await adminLogin.mutateAsync({ password });
      if (result.success) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        Alert.alert("Fel", "Felaktigt lösenord");
      }
    } catch (error) {
      Alert.alert("Fel", "Inloggning misslyckades");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="px-6 pt-8 pb-8" edges={["top", "left", "right", "bottom"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: "center", gap: 24 }}>
            <View style={{ alignItems: "center", gap: 8 }}>
              <MaterialIcons name="admin-panel-settings" size={48} color={colors.primary} />
              <Text style={[styles.title, { color: colors.foreground }]}>Admin Dashboard</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>Analytik och statistik</Text>
            </View>

            <View style={{ gap: 16 }}>
              <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <MaterialIcons name="lock" size={20} color={colors.muted} />
                <TextInput
                  style={[styles.input, { color: colors.foreground }]}
                  placeholder="Lösenord"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={colors.muted}
                  />
                </Pressable>
              </View>

              <Pressable
                onPress={handleLogin}
                disabled={isLoading}
                style={({ pressed }) => [
                  styles.loginButton,
                  { backgroundColor: colors.primary },
                  pressed && { opacity: 0.8 },
                  isLoading && { opacity: 0.6 },
                ]}
              >
                <Text style={[styles.loginButtonText, { color: colors.background }]}>
                  {isLoading ? "Loggar in..." : "Logga in"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="px-4 pt-4 pb-8" edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Admin Dashboard</Text>
            <Text style={[styles.headerSubtitle, { color: colors.muted }]}>Svar Direkt Analytics</Text>
          </View>
          <Pressable onPress={() => setIsAuthenticated(false)}>
            <MaterialIcons name="logout" size={24} color={colors.primary} />
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
          {["summary", "events", "devices"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab as any)}
              style={[
                styles.tab,
                selectedTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === tab ? colors.primary : colors.muted },
                ]}
              >
                {tab === "summary" ? "Sammanfattning" : tab === "events" ? "Event" : "Enheter"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Summary Tab */}
        {selectedTab === "summary" && summary && (
          <View style={{ gap: 16, marginTop: 16 }}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.statContent}>
                <Text style={[styles.statLabel, { color: colors.muted }]}>Totala event</Text>
                <Text style={[styles.statValue, { color: colors.primary }]}>{summary.totalEvents}</Text>
              </View>
              <MaterialIcons name="trending-up" size={32} color={colors.primary} />
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.statContent}>
                <Text style={[styles.statLabel, { color: colors.muted }]}>Unika enheter</Text>
                <Text style={[styles.statValue, { color: colors.primary }]}>{summary.uniqueDevices}</Text>
              </View>
              <MaterialIcons name="devices" size={32} color={colors.primary} />
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.statContent}>
                <Text style={[styles.statLabel, { color: colors.muted }]}>Senaste 24h</Text>
                <Text style={[styles.statValue, { color: colors.primary }]}>{summary.last24hEvents}</Text>
              </View>
              <MaterialIcons name="schedule" size={32} color={colors.primary} />
            </View>

            <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Event-typer</Text>
              {Object.entries(summary.eventsByType).map(([type, count]) => (
                <View key={type} style={styles.eventTypeRow}>
                  <Text style={[styles.eventTypeName, { color: colors.foreground }]}>{type}</Text>
                  <Text style={[styles.eventTypeCount, { color: colors.primary }]}>{count}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Kategorier</Text>
              {Object.entries(summary.eventsByCategory).map(([category, count]) => (
                <View key={category} style={styles.eventTypeRow}>
                  <Text style={[styles.eventTypeName, { color: colors.foreground }]}>{category}</Text>
                  <Text style={[styles.eventTypeCount, { color: colors.primary }]}>{count}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Events Tab */}
        {selectedTab === "events" && (
          <View style={{ marginTop: 16 }}>
            {events.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.muted }]}>Inga event än</Text>
            ) : (
              <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={[styles.eventItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.eventType, { color: colors.foreground }]}>{item.eventType}</Text>
                      <Text style={[styles.eventDevice, { color: colors.muted }]}>
                        Device: {item.deviceId.substring(0, 8)}...
                      </Text>
                      <Text style={[styles.eventTime, { color: colors.muted }]}>
                        {new Date(item.timestamp).toLocaleString("sv-SE")}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        )}

        {/* Devices Tab */}
        {selectedTab === "devices" && (
          <View style={{ marginTop: 16 }}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Totalt {summary?.uniqueDevices || 0} unika enheter
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    gap: 16,
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statContent: {
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  eventTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  eventTypeName: {
    fontSize: 14,
  },
  eventTypeCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  eventItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  eventType: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  eventDevice: {
    fontSize: 12,
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 11,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 24,
  },
});
