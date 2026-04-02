export type Scenario = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export const categories = [
  {
    id: "skatteverket",
    title: "Skatteverket",
    subtitle: "Skatter och deklaration",
    icon: "account-balance",
    scenarios: [
      {
        id: "tax-question",
        title: "Fråga om skatt",
        description: "Begäran om information om skatteärende",
        content:
          "Hej,\n\nJag skulle vilja få mer information om mitt skatteärende. Kan ni vänligen förklara vad som gäller i mitt fall?\n\nTack på förhand.\n\nMed vänliga hälsningar",
      },
      {
        id: "income-change",
        title: "Anmälan om ändrad inkomst",
        description: "Meddela förändring av inkomst",
        content:
          "Hej,\n\nJag vill meddela att min inkomst har förändrats. Jag ber er att uppdatera mina uppgifter.\n\nVänligen bekräfta när ändringen har registrerats.\n\nMed vänliga hälsningar",
      },
      {
        id: "decision-question",
        title: "Fråga om beslut",
        description: "Begäran om förklaring av beslut",
        content:
          "Hej,\n\nJag har tagit emot ett beslut från er och skulle vilja få en tydligare förklaring.\n\nKan ni vänligen förklara grunden till beslutet?\n\nMed vänliga hälsningar",
      },
    ],
  },
];
