export interface QuickReply {
  id: string;
  title: string;
  message: string;
}

export interface QuickReplyCategory {
  id: string;
  name: string;
  icon: string;
  replies: QuickReply[];
}

export const QUICK_REPLIES: QuickReplyCategory[] = [
  {
    id: "arbete",
    name: "Arbete",
    icon: "work-outline",
    replies: [
      {
        id: "arbete_chef",
        title: "Meddelande till chef",
        message: "Hej, jag skulle vilja ta upp en viktig sak. Har du en stund att prata?",
      },
      {
        id: "arbete_spoznienie",
        title: "Försenad",
        message: "Jag är ledsen, jag blir ca 15 minuter sen. Är strax där.",
      },
      {
        id: "arbete_wolne",
        title: "Begäran om ledigt",
        message: "Jag skulle vilja ta ledigt på [DATUM]. Är det möjligt?",
      },
      {
        id: "arbete_grafik",
        title: "Ändring av schema",
        message: "Skulle det vara möjligt att ändra mitt schema på [DATUM]? Jag har något viktigt.",
      },
      {
        id: "arbete_chorobowe",
        title: "Sjuk",
        message: "Tyvärr är jag sjuk och kan inte komma till jobbet idag. Jag håller kontakt.",
      },
      {
        id: "arbete_podwyzka",
        title: "Begäran om löneökning",
        message: "Jag skulle vilja diskutera min lön. Kan vi prata om det?",
      },
      {
        id: "arbete_wypowiedzenie",
        title: "Uppsägning",
        message: "Jag meddelar att jag säger upp mig från min tjänst [TJÄNST]. Sista arbetsdagen är [DATUM].",
      },
      {
        id: "arbete_konflikt",
        title: "Konflikt på jobbet",
        message: "Jag skulle vilja klara upp situationen från igår. Kan vi prata?",
      },
      {
        id: "arbete_ny_1",
        title: "Begäran om homeoffice",
        message: "Skulle det vara möjligt att arbeta hemifrån på [DATUM]? Jag kan vara lika produktiv.",
      },
      {
        id: "arbete_ny_2",
        title: "Feedback från chef",
        message: "Jag skulle vilja få feedback på mitt arbete. Kan vi ha ett utvecklingssamtal?",
      },
      {
        id: "arbete_ny_3",
        title: "Utbildning och utveckling",
        message: "Jag är intresserad av att gå en utbildning inom [OMRÅDE]. Kan vi diskutera detta?",
      },
      {
        id: "arbete_ny_4",
        title: "Arbetsmiljö problem",
        message: "Jag har problem med arbetsmiljön. Kan vi träffas och diskutera lösningar?",
      },
      {
        id: "arbete_ny_5",
        title: "Projektstatus",
        message: "Projektet [PROJEKT] är på väg enligt plan. Status: [STATUS].",
      },
      {
        id: "arbete_ny_6",
        title: "Möte bekräftelse",
        message: "Jag bekräftar att jag kommer till mötet på [DATUM] kl [TID].",
      },
      {
        id: "arbete_ny_7",
        title: "Arbetsuppgift fråga",
        message: "Jag har en fråga om uppgiften [UPPGIFT]. Kan du klargöra?",
      },
      {
        id: "arbete_ny_8",
        title: "Deadline förlängning",
        message: "Kan jag få förlängning på deadline för [PROJEKT]? Jag behöver till [DATUM].",
      },
      {
        id: "arbete_ny_9",
        title: "Kollegasamarbete",
        message: "Tack för ditt samarbete på projektet. Det gick bra!",
      },
      {
        id: "arbete_ny_10",
        title: "Ersättning för övertid",
        message: "Jag har arbetat övertid på [DATUM]. Hur hanteras ersättningen?",
      },
      {
        id: "arbete_ny_11",
        title: "Arbetscertifikat",
        message: "Jag behöver ett arbetscertifikat. Kan du utfärda ett?",
      },
      {
        id: "arbete_ny_12",
        title: "Referens från arbetsgivare",
        message: "Jag behöver en referens från dig för en jobbansökan. Kan du skriva en?",
      },
      {
        id: "arbete_ny_13",
        title: "Försäljning/Affär",
        message: "Affären med [KLIENT] är avslutad. Resultatet var [RESULTAT].",
      },
      {
        id: "arbete_ny_14",
        title: "Kundkontakt",
        message: "Jag har kontaktat kunden [KUND] angående [ÄMNE]. Väntar på svar.",
      },
      {
        id: "arbete_ny_15",
        title: "Arbetsmöte avbokad",
        message: "Mötet på [DATUM] måste avbokas. Kan vi boka om det?",
      },
    ],
  },
  {
    id: "relationer",
    name: "Relationer",
    icon: "favorite",
    replies: [
      {
        id: "relationer_odmowa",
        title: "Avslå möte",
        message: "Tack för inbjudan, men tyvärr kan jag inte komma. Beklagar.",
      },
      {
        id: "relationer_przlozenie",
        title: "Flytta möte",
        message: "Skulle vi kunna flytta vårt möte? Jag föreslår ett annat tillfälle.",
      },
      {
        id: "relationer_przeprosiny",
        title: "Ursäkt",
        message: "Jag ber om ursäkt för vad som hände. Jag borde inte ha reagerat så.",
      },
      {
        id: "relationer_po_klotni",
        title: "Svar efter gräl",
        message: "Jag skulle vilja prata om vad som hände. Du är viktig för mig.",
      },
      {
        id: "relationer_zakonczenie",
        title: "Avsluta vänskap",
        message: "Jag tror att vi bör gå skilda vägar. Jag önskar dig allt gott.",
      },
      {
        id: "relationer_neutralna",
        title: "Neutral och artig meddelande",
        message: "Tack för ditt meddelande. Jag hörs av.",
      },
      {
        id: "relationer_stanowcza",
        title: "Bestämt meddelande",
        message: "Jag kan inte gå med på det. Min beslut är slutgiltigt.",
      },
      {
        id: "relationer_ny_1",
        title: "Svar efter gräl",
        message: "Jag skulle vilja prata om vad som hände. Du är viktig för mig.",
      },
      {
        id: "relationer_ny_2",
        title: "Avslå förslag",
        message: "Jag uppskattar förslaget, men jag kan inte gå med på det denna gång.",
      },
      {
        id: "relationer_ny_3",
        title: "Stöd och uppmuntran",
        message: "Jag tror på dig. Du klarar detta!",
      },
      {
        id: "relationer_ny_4",
        title: "Gratulationer",
        message: "Grattis på [HÄNDELSE]! Jag är glad för din skull.",
      },
      {
        id: "relationer_ny_5",
        title: "Kondoleans",
        message: "Jag är ledsen att höra om [HÄNDELSE]. Mina tankar är med dig.",
      },
      {
        id: "relationer_ny_6",
        title: "Saknar dig",
        message: "Jag saknar dig. Kan vi ses snart?",
      },
      {
        id: "relationer_ny_7",
        title: "Tack för hjälpen",
        message: "Tack för att du hjälpte mig. Det betydde mycket.",
      },
      {
        id: "relationer_ny_8",
        title: "Förlåt",
        message: "Jag ber om förlåtelse för vad jag gjorde. Jag hoppas du kan förlåta mig.",
      },
      {
        id: "relationer_ny_9",
        title: "Jag älskar dig",
        message: "Jag älskar dig. Tack för allt.",
      },
      {
        id: "relationer_ny_10",
        title: "Vad tycker du?",
        message: "Vad tycker du om [ÄMNE]? Jag skulle vilja höra din åsikt.",
      },
      {
        id: "relationer_ny_11",
        title: "Gemensam plan",
        message: "Ska vi göra något tillsammans på [DATUM]? Jag har en idé.",
      },
      {
        id: "relationer_ny_12",
        title: "Missförstånd",
        message: "Jag tror att vi missförstod varandra. Kan vi prata om det?",
      },
      {
        id: "relationer_ny_13",
        title: "Viktigt att säga",
        message: "Det finns något viktigt jag behöver säga till dig.",
      },
      {
        id: "relationer_ny_14",
        title: "Framtidsplaner",
        message: "Jag tänker på vår framtid tillsammans. Vad tycker du?",
      },
      {
        id: "relationer_ny_15",
        title: "Slut på missförstånd",
        message: "Låt oss lämna det förflutna bakom oss och börja om.",
      },
    ],
  },
  {
    id: "vanner_familj",
    name: "Vänner & familj",
    icon: "people",
    replies: [
      {
        id: "vanner_nie_moge",
        title: "Kan inte komma",
        message: "Tack för inbjudan, men tyvärr kan jag inte komma den här gången.",
      },
      {
        id: "vanner_pieniadze",
        title: "Betalar senare",
        message: "Tack för lånet. Jag betalar tillbaka på [DATUM].",
      },
      {
        id: "vanner_przypomnienie",
        title: "Påminnelse om skuld",
        message: "Jag påminner om att du lånade [BELOPP] av mig. När kan du betala tillbaka?",
      },
      {
        id: "vanner_brak_czasu",
        title: "Ingen tid nu",
        message: "Jag har ingen tid nu, men vi pratar senare. OK?",
      },
      {
        id: "vanner_bez_konfliktu",
        title: "Svar utan konflikt",
        message: "Jag förstår din åsikt, men jag tycker annorlunda. Ingen ilska.",
      },
      {
        id: "vanner_ny_1",
        title: "Tack för gåvan",
        message: "Tack för den fina gåvan! Du är mycket generös.",
      },
      {
        id: "vanner_ny_2",
        title: "Gratulationer på födelsedag",
        message: "Grattis på din födelsedag! Jag hoppas du har en underbar dag.",
      },
      {
        id: "vanner_ny_3",
        title: "Saknar dig",
        message: "Jag saknar dig mycket. Vi borde ses snart!",
      },
      {
        id: "vanner_ny_4",
        title: "Stöd i svåra tider",
        message: "Jag är här för dig. Om du behöver prata, ring mig.",
      },
      {
        id: "vanner_ny_5",
        title: "Gemensam aktivitet",
        message: "Ska vi göra något roligt tillsammans på [DATUM]?",
      },
      {
        id: "vanner_ny_6",
        title: "Tack för vänskap",
        message: "Tack för att du är min vän. Du betyder mycket för mig.",
      },
      {
        id: "vanner_ny_7",
        title: "Ursäkt för att jag inte hört av mig",
        message: "Jag ber om ursäkt för att jag inte hört av mig på länge. Hur mår du?",
      },
      {
        id: "vanner_ny_8",
        title: "Roligt att höra från dig",
        message: "Det var så roligt att höra från dig! Vi måste hålla kontakten.",
      },
      {
        id: "vanner_ny_9",
        title: "Hjälp behövs",
        message: "Jag behöver din hjälp med något. Kan vi träffas och prata?",
      },
      {
        id: "vanner_ny_10",
        title: "Gemensamt minne",
        message: "Jag tänkte på när vi [HÄNDELSE]. Det var så roligt!",
      },
      {
        id: "vanner_ny_11",
        title: "Nya nyheter",
        message: "Jag har spännande nyheter att berätta! Kan vi ses?",
      },
      {
        id: "vanner_ny_12",
        title: "Råd behövs",
        message: "Jag behöver ditt råd om något. Du är alltid så klokt.",
      },
      {
        id: "vanner_ny_13",
        title: "Skämt och skratt",
        message: "Jag såg något som fick mig att tänka på dig och skratta!",
      },
      {
        id: "vanner_ny_14",
        title: "Gemensam plan",
        message: "Låt oss planera en resa tillsammans! Vad tycker du om [PLATS]?",
      },
      {
        id: "vanner_ny_15",
        title: "Vänskap för alltid",
        message: "Du är en bästa vän. Jag är tacksam för vår vänskap.",
      },
    ],
  },
  {
    id: "hem_vardag",
    name: "Hem & vardag",
    icon: "home",
    replies: [
      {
        id: "hem_sasiad",
        title: "Meddelande till granne",
        message: "Hej, jag skulle vilja ta upp något om [ÄMNE]. Kan vi prata?",
      },
      {
        id: "hem_wlasciciel",
        title: "Till hyresvärden",
        message: "Jag skulle vilja rapportera ett problem i lägenheten: [PROBLEM]. När kan du fixa det?",
      },
      {
        id: "hem_szkola",
        title: "Till skola/förskola",
        message: "Jag skulle vilja ta upp något om mitt barn. När kan vi prata?",
      },
      {
        id: "hem_firma",
        title: "Till företag/service",
        message: "Jag skulle vilja rapportera ett problem med [TJÄNST]. Hur löser vi det?",
      },
      {
        id: "hem_reklamacja",
        title: "Reklamation",
        message: "Jag skulle vilja göra en reklamation på produkten/tjänsten. Ordernummer: [NUMMER].",
      },
      {
        id: "hem_anulowanie",
        title: "Avbryt tjänst",
        message: "Jag skulle vilja avbryta min prenumeration/tjänst. Kontonummer: [NUMMER].",
      },
      {
        id: "hem_ny_1",
        title: "Hyresökning invändning",
        message: "Jag motsätter mig hyresökningen på [PROCENT]%. Kan vi diskutera detta?",
      },
      {
        id: "hem_ny_2",
        title: "Reparation brådskande",
        message: "Det är en brådskande reparation behövs i min lägenhet. Kan du komma idag?",
      },
      {
        id: "hem_ny_3",
        title: "Gemensamma kostnader",
        message: "Jag ifrågasätter gemensamma kostnader för [MÅNAD]. Kan jag få en specifikation?",
      },
      {
        id: "hem_ny_4",
        title: "Bullerstörning från granne",
        message: "Jag drabbas av bullerstörning från din lägenhet. Kan vi lösa detta?",
      },
      {
        id: "hem_ny_5",
        title: "Andrahandsuthyrning",
        message: "Jag önskar att hyra ut min lägenhet på andrahand. Vilka är villkoren?",
      },
      {
        id: "hem_ny_6",
        title: "Husdjur tillstånd",
        message: "Jag önskar att hålla ett husdjur. Kan jag få tillstånd?",
      },
      {
        id: "hem_ny_7",
        title: "Mögelskador",
        message: "Jag har upptäckt mögelskador. Detta är en hälsorisk. Kan detta åtgärdas?",
      },
      {
        id: "hem_ny_8",
        title: "Vatten/värme problem",
        message: "Jag har problem med [VATTEN/VÄRME]. Kan detta åtgärdas omedelbar?",
      },
      {
        id: "hem_ny_9",
        title: "Trapphusvård",
        message: "Kan vi förbättra trapphusvården? Jag föreslår [FÖRBÄTTRING].",
      },
      {
        id: "hem_ny_10",
        title: "Parkeringsplats",
        message: "Jag behöver en parkeringsplats. Vilka är villkoren och kostnaden?",
      },
      {
        id: "hem_ny_11",
        title: "Gemensamt utrymme bokning",
        message: "Jag önskar att boka [UTRYMME] för [DATUM]. Hur går jag tillväga?",
      },
      {
        id: "hem_ny_12",
        title: "Avfallshantering",
        message: "Jag har frågor om avfallshanteringen. Vilka är sorteringsreglerna?",
      },
      {
        id: "hem_ny_13",
        title: "Fönster/dörrar reparation",
        message: "Fönstren/dörrarna behöver repareras. Kan detta åtgärdas?",
      },
      {
        id: "hem_ny_14",
        title: "Flyttning anmälan",
        message: "Jag planerar att flytta på [DATUM]. Vilka är procedurerna?",
      },
      {
        id: "hem_ny_15",
        title: "Lägenhet besiktning",
        message: "Kan vi boka en lägenhet besiktning? Jag är ledig på [DATUM].",
      },
    ],
  },
];
