import { ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { adviceAndTips } from "@/data/advice_and_tips";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

type TabType = "principles" | "glossary" | "tips" | "faq";

export default function TipsScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<TabType>("principles");

  const tabs: { id: TabType; label: string }[] = [
    { id: "principles", label: "Principer" },
    { id: "glossary", label: "Ordlista" },
    { id: "tips", label: "Vägledning" },
    { id: "faq", label: "Frågor" },
  ];

  return (
    <ScreenContainer className="p-0">
      {/* Tab Navigation */}
      <View className="flex-row border-b" style={{ borderBottomColor: colors.border }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 px-2 items-center justify-center",
              activeTab === tab.id && "border-b-2",
            )}
            style={
              activeTab === tab.id
                ? { borderBottomColor: colors.primary }
                : { borderBottomColor: "transparent" }
            }
          >
            <Text
              className={cn(
                "text-sm font-semibold",
                activeTab === tab.id ? "text-primary" : "text-muted",
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Principles Tab */}
        {activeTab === "principles" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground mb-2">Grundläggande principer</Text>
            {Object.entries(adviceAndTips.principles).map(([key, principle]) => (
              <View
                key={key}
                className="bg-surface rounded-lg p-4 border"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-base font-bold text-foreground mb-2">
                  {principle.title}
                </Text>
                <Text className="text-sm text-muted leading-relaxed">
                  {principle.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Glossary Tab */}
        {activeTab === "glossary" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground mb-2">Ordlista</Text>
            {Object.entries(adviceAndTips.glossary).map(([key, term]) => (
              <View
                key={key}
                className="bg-surface rounded-lg p-4 border"
                style={{ borderColor: colors.border }}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-base font-bold text-foreground flex-1">{term.term}</Text>
                  <View
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor:
                        term.importance === "Mycket viktigt"
                          ? colors.error
                          : term.importance === "Kritiskt"
                            ? colors.warning
                            : colors.primary,
                    }}
                  >
                    <Text className="text-xs font-semibold text-background">
                      {term.importance}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-muted leading-relaxed">{term.explanation}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground mb-2">Praktisk vägledning</Text>
            {adviceAndTips.tips.map((tip, index) => (
              <View
                key={index}
                className="bg-surface rounded-lg p-4 border"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-base font-bold text-foreground mb-2">{tip.title}</Text>
                <Text className="text-sm text-muted leading-relaxed">{tip.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <View className="gap-4">
            <Text className="text-xl font-bold text-foreground mb-2">Vanliga frågor</Text>
            {adviceAndTips.faq.map((item, index) => (
              <View
                key={index}
                className="bg-surface rounded-lg p-4 border"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-base font-bold text-foreground mb-2">
                  F: {item.question}
                </Text>
                <Text className="text-sm text-muted leading-relaxed">S: {item.answer}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
