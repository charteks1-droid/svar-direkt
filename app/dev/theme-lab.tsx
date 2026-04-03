import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ScreenContainer = View;

const lightColors = {
  background: "#ffffff",
  surface: "#f5f5f5",
  foreground: "#111111",
  muted: "#666666",
  border: "#e5e5e5",
  primary: "#2563eb",
  success: "#16a34a",
  warning: "#d97706",
  error: "#dc2626",
};

const darkColors = {
  background: "#111111",
  surface: "#1f1f1f",
  foreground: "#f5f5f5",
  muted: "#a3a3a3",
  border: "#3a3a3a",
  primary: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
};

type ColorScheme = "light" | "dark";
type PaletteName = keyof typeof lightColors;

const paletteNames: PaletteName[] = Object.keys(lightColors) as PaletteName[];

function ColorSwatch({ name, value, border }: { name: PaletteName; value: string; border: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: border,
            backgroundColor: value,
          }}
        />
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{name}</Text>
      </View>
      <Text style={{ fontSize: 12, color: "#666666" }}>{value}</Text>
    </View>
  );
}

export default function ThemeLabScreen() {
  const [pressCount, setPressCount] = useState(0);
  const [lastAction, setLastAction] = useState("None yet");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const colors = colorScheme === "light" ? lightColors : darkColors;

  const swatches = useMemo(
    () =>
      paletteNames.map((name) => ({
        name,
        value: colors[name],
      })),
    [colors],
  );

  return (
    <ScreenContainer style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {(["light", "dark"] as ColorScheme[]).map((scheme) => {
              const schemeColors = scheme === "light" ? lightColors : darkColors;
              const isActive = colorScheme === scheme;

              return (
                <Pressable
                  key={scheme}
                  style={[
                    styles.schemeToggle,
                    {
                      backgroundColor: isActive ? schemeColors.primary : schemeColors.background,
                      borderColor: isActive ? schemeColors.primary : schemeColors.border,
                    },
                  ]}
                  onPress={() => {
                    setColorScheme(scheme);
                    setLastAction(`Applied ${scheme} preview`);
                  }}
                >
                  <Text
                    style={[
                      styles.schemeToggleTitle,
                      {
                        color: isActive ? schemeColors.background : schemeColors.foreground,
                      },
                    ]}
                  >
                    {scheme === "light" ? "Light preview" : "Dark preview"}
                  </Text>
                  <Text
                    style={[
                      styles.schemeToggleSubtitle,
                      {
                        color: isActive ? schemeColors.background : schemeColors.muted,
                      },
                    ]}
                  >
                    Lokal tematest
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 16,
              backgroundColor: colors.surface,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground }}>
              Temafärger
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: colors.muted }}>
              Enkel testyta utan externa beroenden
            </Text>

            <View style={{ marginTop: 16, flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: colors.primary,
                }}
                onPress={() => {
                  setPressCount((count) => count + 1);
                  setLastAction("Pressed Primary");
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.background }}>
                  Primary
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={() => {
                  setPressCount((count) => count + 1);
                  setLastAction("Pressed Surface");
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
                  Surface
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: colors.success,
                }}
                onPress={() => {
                  setPressCount((count) => count + 1);
                  setLastAction("Pressed Success");
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.background }}>
                  Success
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: colors.warning,
                }}
                onPress={() => {
                  setPressCount((count) => count + 1);
                  setLastAction("Pressed Warning");
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.background }}>
                  Warning
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: colors.error,
                }}
                onPress={() => {
                  setPressCount((count) => count + 1);
                  setLastAction("Pressed Error");
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: colors.background }}>
                  Error
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 16,
                borderRadius: 12,
                backgroundColor: colors.background,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
                Aktivt schema
              </Text>
              <Text style={{ marginTop: 4, fontSize: 14, color: colors.muted }}>
                Background: {colors.background} • Text: {colors.foreground} • Primary: {colors.primary}
              </Text>

              <View style={{ marginTop: 12, gap: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <MaterialIcons name="home" size={20} color={colors.primary} />
                  <Text style={{ fontSize: 14, color: colors.foreground }}>
                    Press count: {pressCount}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: colors.muted }}>Last action: {lastAction}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 16,
              backgroundColor: colors.surface,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.foreground }}>
              Palette values
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: colors.muted }}>
              Live values for the selected scheme
            </Text>

            <View style={{ marginTop: 12, gap: 8 }}>
              {swatches.map((item) => (
                <ColorSwatch
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  border={colors.border}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  schemeToggle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  schemeToggleTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  schemeToggleSubtitle: {
    fontSize: 12,
  },
});
