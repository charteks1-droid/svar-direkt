export interface Placeholder {
  key: string;
  label: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  template: string;
  placeholders: Placeholder[];
  context?: string; // Why send this message
  advice?: string; // Practical advice for this scenario
  importance?: "låg" | "medel" | "högt"; // How urgent this action is
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  scenarios: Scenario[];
  // isDisabled and proMessage removed - can be re-added later if needed for Pro version
}

export const categories: Category[] = [
  {
    id: "inkasso",
    title: "Inkasso",
    subtitle: "Svar till inkassobolag",
    icon: "description",
    scenarios: [
      {
        id: "ink_01",
        title: "Begäran om specifikation av skuld",
        description: "Be inkassobolaget visa exakt vad skulden består av.",
        context: "Du har rätt att veta exakt vad du betalar för. En specifikation kräver att inkassobolaget visa sitt underlag och kan ge dig tid att förbereda.",
        advice: "Det här är ofta det viktigaste första steget. Många inkassobolag förväntar sig att du inte fråga. Genom att begära specifikation visar du att du är närvarande och engagerad.",
        importance: "högt",
        template: `Ämne: Begäran om specifikation – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber om en tydlig specifikation av skulden, inklusive huvudbelopp, ränta och avgifter.

Vänligen skicka detta skriftligen.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_02",
        title: "Bekräftelse på mottaget krav",
        description: "Bekräfta att du fått brevet och köp tid.",
        context: "Brist på svar kan tolkas som passivitet. Genom att skicka ett enkelt bekräftelsebrev visar du att du är aktiv och engagerad.",
        advice: "Det räcker ofta med ett kort svar. Du behöver inte betala samma dag och du behöver inte ringa i panik. Det viktiga är att visa att du har sett kravet och inte ignorerar det.",
        importance: "högt",
        template: `Ämne: Bekräftelse mottagen – ärendenummer [ÄRENDENUMMER]

Hej,

Jag har mottagit ert meddelande och ser över ärendet.

Jag återkommer skriftligen.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_03",
        title: "Tillfällig oförmåga att betala",
        description: "Meddela att du inte kan betala hela beloppet just nu.",
        context: "Om du inte kan betala hela beloppet just nu är det viktigt att visa att du inte ignorerar kravet.",
        advice: "Genom att informera om din situation visar du att du är närvarande. Det kan ge dig tid och möjlighet att förhandla.",
        importance: "högt",
        template: `Ämne: Betalningsförmåga – ärendenummer [ÄRENDENUMMER]

Hej,

Jag har i nuläget inte möjlighet att reglera hela beloppet omgående.

Jag återkommer när min situation tillåter vidare åtgärder.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_04",
        title: "Förslag om delbetalning",
        description: "Föreslå att betala en del av skulden.",
        context: "Delbetalning är en strategi, inte kapitulation. Det visar ansvar och vilja att lösa situationen.",
        advice: "Genom att erbjuda delbetalning kan du minska trycket, sänka skulden och vinna tid utan att ge upp kontrollen.",
        importance: "högt",
        template: `Ämne: Förslag om delbetalning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag kan genomföra en delbetalning om [SUMMA] kr inom kort.

Vänligen bekräfta om detta kan accepteras.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
          { key: "SUMMA", label: "Belopp (kr)" },
        ],
      },
      {
        id: "ink_05",
        title: "Hälsoskäl – begäran om extra tid",
        description: "Be om mer tid på grund av hälsoproblem.",
        context: "Hälsoskäl är en legitim anledning att be om extra tid.",
        advice: "Genom att informera om hälsoproblem visar du att det finns en anledning till din situation. Det kan påverka inkassobolagets inställning.",
        importance: "medel",
        template: `Ämne: Tillfälliga hälsoskäl – ärendenummer [ÄRENDENUMMER]

Hej,

På grund av tillfälliga hälsoskäl behöver jag extra tid i detta ärende.

Jag återkommer så snart situationen stabiliseras.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_20",
        title: "Begäran om skriftlig motivering av avgifter",
        description: "Kräv skriftlig förklaring av varför avgifter tillkommit.",
        context: "Inkassobolag måste kunna motivera varje avgift de tar ut. Genom att kräva detta kräver du dem att vara transparenta.",
        advice: "Denna begäran kan avslöja felaktiga eller överdrivna avgifter som kan reduceras.",
        importance: "högt",
        template: `Ämne: Begäran om skriftlig motivering av avgifter

Hej,

Kräv skriftlig förklaring av varför avgifter tillkommit.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "ink_21",
        title: "Invändning mot felaktig kreditupplysning",
        description: "Invända mot felaktiga uppgifter i kreditupplysning.",
        context: "Felaktig kreditupplysning kan skada din ekonomiska ställning långsiktigt. Det är viktigt att korrigera detta omedelbar.",
        advice: "Kontakta både inkassobolaget och kreditupplysningsföretaget för att få felaktiga uppgifter raderade.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig kreditupplysning

Hej,

Invända mot felaktiga uppgifter i kreditupplysning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "ink_22",
        title: "Begäran om verklig fordringshavares identitet",
        description: "Kräv att inkassobolaget identifierar den verkliga fordringsägaren.",
        context: "Du har rätt att veta vem som faktiskt äger fordringen. Ibland kan denna information avslöja problem med ärendet.",
        advice: "Om inkassobolaget inte kan presentera ett giltigt avtal eller fullmakt kan ärendet vara ogiltigt.",
        importance: "högt",
        template: `Ämne: Begäran om verklig fordringshavares identitet

Hej,

Kräv att inkassobolaget identifierar den verkliga fordringsägaren.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "ink_23",
        title: "Begäran om räntebepräkning och juridisk grund",
        description: "Kräv redovisning av räntebepräkning och dess juridiska grund.",
        context: "Ränta måste vara juridiskt försvarbar. Genom att kräva denna redovisning kan du ofta få räntan reducerad.",
        advice: "Många inkassobolag tar ut ränta utan tillräcklig juridisk grund. Denna begäran kan avslöja detta.",
        importance: "högt",
        template: `Ämne: Begäran om räntebepräkning och juridisk grund

Hej,

Kräv redovisning av räntebepräkning och dess juridiska grund.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "ink_24",
        title: "Formell invändning mot inkassoprocessen",
        description: "Invända mot att inkassoprocessen inte följer lagstiftningen.",
        context: "Inkassoprocessen måste följa strikt lagstiftning. Brister i processen kan göra ärendet ogiltigt.",
        advice: "Denna invändning kan stoppa hela inkassoprocessen om den är välgrundad.",
        importance: "högt",
        template: `Ämne: Formell invändning mot inkassoprocessen

Hej,

Invända mot att inkassoprocessen inte följer lagstiftningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "ink_06",
        title: "Förändrad ekonomisk situation",
        description: "Informera om att din ekonomi har förändrats.",
        context: "Förändrad ekonomi kan påverka din betalningsförmåga. Det är viktigt att informera om detta.",
        advice: "Genom att vara transparent om din ekonomiska situation visar du att du tar ansvar och försöker lösa problemet.",
        importance: "medel",
        template: `Ämne: Förändrad ekonomi – ärendenummer [ÄRENDENUMMER]

Hej,

Min ekonomiska situation har nyligen förändrats, vilket påverkar min betalningsförmåga.

Jag återkommer med uppdatering.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_07",
        title: "Invändning mot fortsatt handläggning",
        description: "Invända mot att ärendet drivs vidare.",
        context: "Invändning är stoppknappen i systemet. Det betyder att du säger att kravet behöver prövas innan något beslut tas. Det är ett av dina viktigaste verktyg.",
        advice: "En invändning stoppar processen och kräver att inkassobolaget ta ett steg tillbaka. Det ger dig tid och lugn att fatta bättre beslut.",
        importance: "högt",
        template: `Ämne: Invändning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag invänder mot att ärendet drivs vidare utan ytterligare dialog.

Vänligen bekräfta mottagandet av detta meddelande.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_08",
        title: "Information om genomförd betalning",
        description: "Meddela att du har genomfört en betalning.",
        context: "När du betalar är det viktigt att informera inkassobolaget så att de kan uppdatera ärendet.",
        advice: "Genom att bekräfta betalningen skapar du dokumentation och visar att du är aktiv.",
        importance: "medel",
        template: `Ämne: Betalning genomförd – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill informera om att en betalning om [SUMMA] kr har genomförts idag.

Vänligen bekräfta mottagandet.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
          { key: "SUMMA", label: "Belopp (kr)" },
        ],
      },
      {
        id: "ink_09",
        title: "Begäran om paus i vidare åtgärder",
        description: "Be om att inga ytterligare åtgärder vidtas.",
        context: "En paus kan ge dig tid att se över situationen utan att ärendet drivs vidare.",
        advice: "Genom att be om avvaktan visar du att du är aktiv och engagerad. Det kan stoppa automatiska processer.",
        importance: "högt",
        template: `Ämne: Begäran om avvaktan – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber om att inga ytterligare åtgärder vidtas medan jag ser över ärendet.

Jag återkommer skriftligen.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_10",
        title: "Begäran om tillfälligt anstånd",
        description: "Be om anstånd med betalningen.",
        context: "Anstånd är en laglig möjlighet. Det betyder att du ber om tid för att lösa situationen.",
        advice: "Genom att be om anstånd visar du att du tar ansvar och försöker hitta en lösning.",
        importance: "högt",
        template: `Ämne: Begäran om anstånd – ärendenummer [ÄRENDENUMMER]

Hej,

Jag skriver med anledning av ovanstående ärende. Min nuvarande ekonomiska situation gör det svårt för mig att reglera skulden inom utsatt tid.

Situationen är dock tillfällig.

Jag ber därför om ett kortare anstånd för att kunna återkomma med betalning eller förslag till lösning.

Vänligen bekräfta mottagandet av detta meddelande.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_11",
        title: "Begäran om att frysa ärendet",
        description: "Be om att ärendet tillfälligt inte drivs vidare.",
        context: "En tillfällig paus kan ge dig tid att analysera din situation utan att ärendet eskalerar.",
        advice: "Det här är ett verktyg för att köpa tid. Använd tiden för att planera dina nästa steg.",
        importance: "medel",
        template: `Ämne: Begäran om tillfällig paus – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ser över mitt ekonomiska läge och samtliga pågående ärenden. Under denna tid ber jag om att ärendet tillfälligt inte drivs vidare.

Jag återkommer skriftligen så snart jag har möjlighet att ta nästa steg.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_12",
        title: "Pågående dialog i annat ärende",
        description: "Informera om att du hanterar flera ärenden parallellt.",
        context: "Om du hanterar flera ärenden parallellt är det viktigt att informera om detta.",
        advice: "Genom att vara transparent visar du att du arbetar aktivt för att lösa alla dina skulder.",
        importance: "låg",
        template: `Ämne: Pågående dialog – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill informera om att jag för närvarande har flera ärenden som jag hanterar parallellt. Detta ärende ingår i den processen.

Jag ber om förståelse och återkommer när jag har en samlad lösning.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_13",
        title: "Begäran om skriftlig bekräftelse",
        description: "Be om bekräftelse på hur ärendet hanteras.",
        context: "Skriftlig bekräftelse skapar dokumentation och klarhet.",
        advice: "Genom att be om skriftlig bekräftelse kräver du inkassobolaget att vara tydliga och dokumentera processen.",
        importance: "medel",
        template: `Ämne: Begäran om skriftlig bekräftelse – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber er bekräfta hur ärendet kommer att hanteras framöver samt vilka alternativ som finns tillgängliga i nuläget.

Vänligen svara skriftligen via e-post.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_14",
        title: "Planerad betalning vid senare datum",
        description: "Informera om att du planerar att betala vid ett visst datum.",
        context: "Om du vet när du kan betala är det bra att informera om detta.",
        advice: "Genom att ge ett specifikt datum visar du att du har en plan och inte bara skjuter upp problemet.",
        importance: "medel",
        template: `Ämne: Planerad betalning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill informera om att jag planerar att genomföra betalning av detta ärende den [DATUM].

Jag ber om att inga ytterligare åtgärder vidtas fram till dess.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
          { key: "DATUM", label: "Datum (ÅÅÅÅ-MM-DD)" },
        ],
      },
      {
        id: "ink_15",
        title: "Begäran om omprövning av avgifter",
        description: "Be om att avgifter och ränta ses över.",
        context: "Avgifter och ränta kan växa snabbt. Det är viktigt att ifrågasätta dem.",
        advice: "Genom att be om omprövning kan du potentiellt minska beloppet du behöver betala.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber er se över ärendet gällande tillkommande avgifter och ränta.

Jag önskar en uppdaterad sammanställning samt information om eventuella möjligheter till justering.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_16",
        title: "Klargörande av ansvar och betalningsvilja",
        description: "Visa att du inte undviker ansvar.",
        context: "Det är viktigt att klargöra att du inte undviker ansvar.",
        advice: "Genom att vara tydlig om din vilja att lösa situationen kan du påverka inkassobolagets inställning.",
        importance: "medel",
        template: `Ämne: Klargörande – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill tydliggöra att jag inte undviker ansvar i detta ärende.

Jag arbetar aktivt för att hitta en lösning som är möjlig utifrån min nuvarande situation och återkommer skriftligen.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_17",
        title: "Begäran om skriftlig kommunikation",
        description: "Be om att all kontakt sker via e-post.",
        context: "Endast skriftlig kontakt skyddar dig bättre än telefonsamtal.",
        advice: "Genom att be om skriftlig kontakt har du kontroll över vad som sägs och dokumentation av allt.",
        importance: "högt",
        template: `Ämne: Skriftlig kommunikation önskas – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber om att all vidare kommunikation i detta ärende sker skriftligen via e-post.

Detta för att undvika missförstånd och säkerställa tydlighet.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_18",
        title: "Pågående privata omständigheter",
        description: "Informera om personliga omständigheter.",
        context: "Personliga omständigheter kan påverka din förmåga att hantera ärendet.",
        advice: "Genom att vara transparent visar du att du inte undviker ansvar utan att du har verkliga omständigheter att hantera.",
        importance: "medel",
        template: `Ämne: Tillfälliga privata omständigheter – ärendenummer [ÄRENDENUMMER]

Hej,

På grund av pågående privata omständigheter har jag för närvarande begränsad möjlighet att hantera detta ärende fullt ut.

Jag ber om förståelse och återkommer så snart läget tillåter.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "ink_19",
        title: "Avslutande besked före återkoppling",
        description: "Bekräfta att du noterat meddelandet och återkommer.",
        context: "Genom att bekräfta att du noterat meddelandet visar du att du är aktiv och engagerad.",
        advice: "Det här är ett enkelt sätt att köpa tid utan att ignorera inkassobolaget.",
        importance: "medel",
        template: `Ämne: Återkoppling kommer – ärendenummer [ÄRENDENUMMER]

Hej,

Jag har noterat ert senaste meddelande.

Jag återkommer skriftligen med besked så snart jag har möjlighet att ta ställning till nästa steg.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
    ],
  },
  {
    id: "kronofogden",
    title: "Kronofogden",
    subtitle: "Svar till Kronofogden",
    icon: "account-balance",
    scenarios: [
      {
        id: "kfm_01",
        title: "Bekräftelse och begäran om status",
        description: "Bekräfta mottagandet och fråga om ärendets status.",
        template: `Ämne: Ärendenummer [ÄRENDENUMMER] – begäran om status

Hej,

Jag har mottagit handlingarna i ovanstående ärende och vill bekräfta detta.

Jag ber samtidigt om information om nuvarande handläggningsstatus och om ytterligare åtgärder krävs från min sida i nuläget.

Vänliga hälsningar
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_02",
        title: "Invändning mot kravet",
        description: "Invända mot kravet och stoppa processen.",
        template: `Ämne: Invändning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag invänder mot kravet i ovanstående ärende.

Jag begär att ärendet inte drivs vidare förrän invändningen har behandlats.

Vänligen bekräfta mottagandet av detta meddelande.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_03",
        title: "Pågående dialog med borgenären",
        description: "Informera om att du redan pratar med fordringsägaren.",
        template: `Ämne: Pågående dialog – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill informera om att jag för närvarande har en pågående dialog med fordringsägaren gällande detta ärende.

Jag ber därför om att inga ytterligare åtgärder vidtas tills vidare.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_04",
        title: "Information om genomförd betalning",
        description: "Meddela att betalning har genomförts.",
        template: `Ämne: Betalning genomförd – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill informera om att betalning har genomförts i detta ärende.

Jag ber er uppdatera ärendet i enlighet med detta och bekräfta mottagandet.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_05",
        title: "Begäran om tillfällig avvaktan",
        description: "Be om att ärendet pausas tillfälligt.",
        template: `Ämne: Begäran om avvaktan – ärendenummer [ÄRENDENUMMER]

Hej,

Jag begär att ärendet tillfälligt avvaktas medan jag ser över min ekonomiska situation och samtliga pågående ärenden.

Jag återkommer skriftligen så snart som möjligt.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_11",
        title: "Begäran om omprövning av Kronofogdens beslut",
        description: "Begär omprövning av ett beslut från Kronofogden.",
        context: "Du har rätt att begära omprövning av Kronofogdens beslut om du anser att det är felaktigt.",
        advice: "Var specifik om varför du anser att beslutet är felaktigt.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av Kronofogdens beslut

Hej,

Begär omprövning av ett beslut från Kronofogden.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "kfm_12",
        title: "Invändning mot felaktig skuldbedömning",
        description: "Invända mot att skulden bedömts felaktigt.",
        context: "Kronofogden måste kunna motivera skuldbedömningen. Felaktig bedömning kan göra ärendet ogiltigt.",
        advice: "Denna invändning kan stoppa hela processen om den är välgrundad.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig skuldbedömning

Hej,

Invända mot att skulden bedömts felaktigt.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "kfm_13",
        title: "Begäran om uppskov med betalning",
        description: "Be om uppskov med betalningen.",
        context: "Uppskov är en laglig möjlighet om du har svårt att betala.",
        advice: "Motivera varför du behöver uppskov och presentera en betalningsplan.",
        importance: "högt",
        template: `Ämne: Begäran om uppskov med betalning

Hej,

Be om uppskov med betalningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "kfm_14",
        title: "Invändning mot felaktig räntebepräkning",
        description: "Invända mot räntebepräkningen.",
        context: "Ränta måste beräknas enligt lag. Felaktig räntebepräkning kan reducera skulden.",
        advice: "Kräv en detaljerad redovisning av räntebepräkningen.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig räntebepräkning

Hej,

Invända mot räntebepräkningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "kfm_15",
        title: "Begäran om skriftlig bekräftelse av betalningsplan",
        description: "Be om bekräftelse på godkänd betalningsplan.",
        context: "Skriftlig bekräftelse skyddar dig och skapar juridisk säkerhet.",
        advice: "Presentera en realistisk betalningsplan och be om skriftlig godkännande.",
        importance: "medel",
        template: `Ämne: Begäran om skriftlig bekräftelse av betalningsplan

Hej,

Be om bekräftelse på godkänd betalningsplan.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "kfm_06",
        title: "Förändrad livssituation",
        description: "Informera om att din livssituation har förändrats.",
        template: `Ämne: Förändrad situation – ärendenummer [ÄRENDENUMMER]

Hej,

Min livssituation har nyligen förändrats, vilket påverkar min möjlighet att hantera ärendet inom ordinarie tidsram.

Jag ber om förståelse och återkommer med uppdatering.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_07",
        title: "Begäran om skriftlig kommunikation",
        description: "Be om att all kontakt sker skriftligen.",
        template: `Ämne: Skriftlig kommunikation önskas – ärendenummer [ÄRENDENUMMER]

Hej,

Jag önskar att all fortsatt kommunikation i detta ärende sker skriftligen via e-post eller brev.

Detta för att säkerställa tydlighet och korrekt hantering.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_08",
        title: "Begäran om information om nästa steg",
        description: "Fråga vilka nästa steg som gäller.",
        template: `Ämne: Nästa steg i ärendet – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber om information kring vilka nästa steg som gäller i detta ärende samt vilka alternativ som finns tillgängliga i nuläget.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_09",
        title: "Bekräftelse på invändning",
        description: "Be om bekräftelse att din invändning registrerats.",
        template: `Ämne: Bekräftelse av invändning – ärendenummer [ÄRENDENUMMER]

Hej,

Jag ber om bekräftelse på att min invändning har registrerats och att ärendet därmed inte handläggs vidare i avvaktan på fordringsägarens beslut.

Vänliga hälsningar
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
      {
        id: "kfm_10",
        title: "Slutligt meddelande inför vidare hantering",
        description: "Meddela att du återkommer med besked.",
        template: `Ämne: Vidare hantering – ärendenummer [ÄRENDENUMMER]

Hej,

Jag har tagit del av handlingarna i detta ärende och kommer att återkomma skriftligen med besked när jag har möjlighet att ta nästa steg.

Med vänlig hälsning
[DITT NAMN]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "ÄRENDENUMMER", label: "Ärendenummer" },
        ],
      },
    ],
  },
  {
    id: "skatteverket",
    title: "Skatteverket",
    subtitle: "Svar till Skatteverket",
    icon: "receipt",
    scenarios: [
      {
        id: "skat_01",
        title: "Begäran om anstånd med skattebetalning",
        description: "Be om anstånd när du inte kan betala skatt i tid.",
        context: "Om du har ekonomiska svårigheter kan du begära anstånd med skattebetalningen. Det är viktigt att kontakta Skatteverket innan betalningsfristen går ut.",
        advice: "Ju tidigare du kontaktar Skatteverket, desto bättre. De kan ofta erbjuda betalningsplaner eller anstånd om du visar att du är proaktiv.",
        importance: "högt",
        template: `Ämne: Begäran om anstånd med skattebetalning

Hej,

Jag skriver angående min aktuella skattebetalning och vill informera om att min ekonomiska situation tillfälligt har förändrats.

Jag ber därför om anstånd med betalningen för att kunna ordna min ekonomi och betala på ett korrekt sätt.

Tack för er förståelse.

Vänliga hälsningar
[NAMN]
[PERSONNUMMER]`,
        placeholders: [
          { key: "NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_02",
        title: "Rättelse av uppgifter i deklarationen",
        description: "Rätta fel eller komplettera uppgifter i deklarationen.",
        context: "Om du har gjort fel i deklarationen eller glömt att ange något kan du rätta det. Det är bättre att själv rätta felen än att Skatteverket hittar dem senare.",
        advice: "Var tydlig och konkret om vad som behöver rättas. Bifoga gärna dokumentation som stödjer din rättelse.",
        importance: "medel",
        template: `Ämne: Rättelse av uppgifter i deklarationen

Hej,

Jag har upptäckt att det kan finnas felaktiga eller ofullständiga uppgifter i min deklaration.

Jag vill därför rätta uppgifterna och ber er informera mig om hur jag gör korrigeringen på rätt sätt, samt om ni behöver någon kompletterande dokumentation.

Vänliga hälsningar
[NAMN]
[PERSONNUMMER]`,
        placeholders: [
          { key: "NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_03",
        title: "Begäran om omprövning av beslut",
        description: "Begär omprövning när du inte håller med beslutet.",
        context: "Du har rätt att begära omprövning av Skatteverkets beslut om du anser att det är felaktigt. Det måste göras inom en viss tid från beslutet.",
        advice: "Var specifik om varför du anser att beslutet är felaktigt. Bifoga gärna nya uppgifter eller dokumentation som stödjer din begäran.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av beslut

Hej,

Jag vill begära omprövning av ert beslut i mitt ärende. Jag anser att beslutet kan vara felaktigt eller behöver ses över utifrån uppgifter som inte har beaktats fullt ut.

Vänligen informera mig om vilka underlag ni behöver från mig för att kunna handlägga omprövningen.

Vänliga hälsningar
[NAMN]
[PERSONNUMMER]`,
        placeholders: [
          { key: "NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_04",
        title: "Begäran om förlängd svarstid",
        description: "Be om mer tid för att hinna svara korrekt.",
        context: "Om Skatteverket har ställt frågor eller behöver information från dig kan du ofta få förlängd tid för att samla in dokumentation.",
        advice: "Kontakta dem så snart du märker att du behöver mer tid. Det är lättare att få förlängning om du ber innan tiden går ut.",
        importance: "medel",
        template: `Ämne: Begäran om förlängd svarstid

Hej,

Jag har tagit emot ert brev och arbetar med att samla in nödvändiga uppgifter.

Jag ber därför om förlängd svarstid för att kunna återkomma med ett fullständigt och korrekt svar.

Tack för er förståelse.

Vänliga hälsningar
[NAMN]
[PERSONNUMMER]`,
        placeholders: [
          { key: "NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_05",
        title: "Begäran om förtydligande av beslut och beräkning",
        description: "Be om tydligare förklaring av beslut och belopp.",
        context: "Om du inte förstår hur Skatteverket har räknat eller vad beslutet grundar sig på kan du begära en förklaring. Det är ditt rätt att förstå beslutet.",
        advice: "Var konkret om vad du inte förstår. Ju tydligare du är, desto bättre kan de förklara.",
        importance: "medel",
        template: `Ämne: Begäran om förtydligande av beslut och beräkning

Hej,

Jag har tagit del av ert beslut men behöver ett tydligare förtydligande kring hur beloppet/bedömningen har beräknats.

Vänligen skicka en kort förklaring av grunden för beslutet och vilka uppgifter som ligger till grund för beräkningen.

Vänliga hälsningar
[NAMN]
[PERSONNUMMER]`,
        placeholders: [
          { key: "NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_06",
        title: "Begäran om klarläggning av skatteberäkning",
        description: "Be om tydligare förklaring av skatteberäkningen.",
        context: "Du har rätt att förstå hur skatten beräknats.",
        advice: "Var konkret om vad du inte förstår.",
        importance: "medel",
        template: `Ämne: Begäran om klarläggning av skatteberäkning

Hej,

Be om tydligare förklaring av skatteberäkningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_07",
        title: "Invändning mot skatteåtalet",
        description: "Invända mot att skatten ålagts felaktigt.",
        context: "Du kan invända mot skatteåtalet om du anser att det är felaktigt.",
        advice: "Presentera dokumentation som stödjer din invändning.",
        importance: "högt",
        template: `Ämne: Invändning mot skatteåtalet

Hej,

Invända mot att skatten ålagts felaktigt.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_08",
        title: "Begäran om uppskov med skattebetalning",
        description: "Be om uppskov med skattebetalningen.",
        context: "Uppskov är möjligt om du har ekonomiska svårigheter.",
        advice: "Motivera din situation och presentera en betalningsplan.",
        importance: "högt",
        template: `Ämne: Begäran om uppskov med skattebetalning

Hej,

Be om uppskov med skattebetalningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_09",
        title: "Begäran om avskrivning av skatt",
        description: "Be om att skatt skrivs av på grund av särskilda omständigheter.",
        context: "Avskrivning är möjlig i vissa fall.",
        advice: "Presentera dokumentation på de särskilda omständigheterna.",
        importance: "medel",
        template: `Ämne: Begäran om avskrivning av skatt

Hej,

Be om att skatt skrivs av på grund av särskilda omständigheter.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "skat_10",
        title: "Begäran om återbetalning av felaktigt betald skatt",
        description: "Be om återbetalning om du betalat för mycket skatt.",
        context: "Du har rätt till återbetalning om du betalat mer än du är skyldig.",
        advice: "Presentera dokumentation på den felaktiga betalningen.",
        importance: "högt",
        template: `Ämne: Begäran om återbetalning av felaktigt betald skatt

Hej,

Be om återbetalning om du betalat för mycket skatt.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
    ],
  },
  {
    id: "forsakringskassan",
    title: "Försäkringskassan",
    subtitle: "Svar till Försäkringskassan",
    icon: "health-and-safety",
    scenarios: [
      {
        id: "fk_01",
        title: "Begäran om omprövning",
        description: "Begär omprövning av ett beslut från Försäkringskassan.",
        context: "Om du inte håller med om ett beslut från Försäkringskassan kan du begära omprövning. Det är viktigt att göra detta inom rätt tid.",
        advice: "Var tydlig om varför du anser att beslutet bör ändras. Bifoga gärna ny dokumentation som stödjer din begäran.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning

Hej,

Jag har tagit del av ert beslut i mitt ärende men vill begära en omprövning.

Jag anser att beslutet kan behöva ses över utifrån ytterligare information eller omständigheter.

Vänligen informera mig om vilka kompletterande uppgifter eller handlingar som krävs för att ni ska kunna göra en ny bedömning.

Tack på förhand.

Vänliga hälsningar
[Namn]
[Personnummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer", label: "Personnummer" },
        ],
      },
      {
        id: "fk_02",
        title: "Begäran om förtydligande av beslut",
        description: "Be om tydligare förklaring av ett beslut.",
        context: "Om du inte förstår hur Försäkringskassan har gjort sitt beslut kan du begära en förtydligande. Det är ditt rätt att förstå beslutet.",
        advice: "Var konkret om vilka delar av beslutet du inte förstår. Det hjälper Försäkringskassan att ge dig ett bättre svar.",
        importance: "medel",
        template: `Ämne: Begäran om förtydligande

Hej,

Jag har tagit emot ert beslut och önskar ett tydligare förtydligande kring hur bedömningen har gjorts.

Jag vill säkerställa att jag har förstått beslutet korrekt och ber er därför att kort förklara grunden för beslutet samt om ytterligare information krävs från min sida.

Vänliga hälsningar
[Namn]
[Personnummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer", label: "Personnummer" },
        ],
      },
      {
        id: "fk_03",
        title: "Komplettering av uppgifter i ärende",
        description: "Informera om att du kan komplettera ditt ärende med nya uppgifter.",
        context: "Om du nu har möjlighet att lämna uppgifter som du inte kunde lämna tidigare är det viktigt att göra det snabbt. Det kan påverka Försäkringskassans bedömning.",
        advice: "Var tydlig om vilka nya uppgifter du kan lämna. Fråga vad de behöver för att kunna handlägga ärendet vidare.",
        importance: "högt",
        template: `Ämne: Komplettering av uppgifter

Hej,

Jag vill informera om att jag nu har möjlighet att komplettera mitt ärende med ytterligare uppgifter.

Vänligen bekräfta vilka dokument eller vilken information ni behöver för att handläggningen ska kunna fortsätta.

Jag återkommer med nödvändiga handlingar så snart som möjligt.

Vänliga hälsningar
[Namn]
[Personnummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer", label: "Personnummer" },
        ],
      },
      {
        id: "fk_04",
        title: "Begäran om förlängd svarstid",
        description: "Begär förlängd tid för att samla in handlingar.",
        context: "Om du behöver mer tid för att samla in de dokument som Försäkringskassan efterfrågar kan du begära förlängning. Det är bättre att fråga än att missa fristen.",
        advice: "Kontakta dem så snart du märker att du behöver mer tid. Det är lättare att få förlängning om du ber innan tiden går ut.",
        importance: "medel",
        template: `Ämne: Begäran om förlängd svarstid

Hej,

Jag har mottagit ert meddelande och arbetar med att samla in de uppgifter som efterfrågas.

Jag ber därför om förlängd tid för att kunna inkomma med fullständig dokumentation.

Tack för er förståelse.

Vänliga hälsningar
[Namn]
[Personnummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer", label: "Personnummer" },
        ],
      },
      {
        id: "fk_05",
        title: "Information om förändrad situation",
        description: "Meddela att dina personliga omständigheter har ändrats.",
        context: "Om din livssituation har förändrats kan det påverka ditt ärende hos Försäkringskassan. Det är viktigt att informera dem så att de kan göra en korrekt bedömning.",
        advice: "Var tydlig om vilka förändringar som har skett. Bifoga gärna dokumentation som stödjer din information.",
        importance: "högt",
        template: `Ämne: Förändrad situation

Hej,

Jag vill informera om att min nuvarande situation har förändrats och kan påverka mitt pågående ärende hos Försäkringskassan.

Vänligen meddela om ni behöver uppdaterade uppgifter eller ytterligare dokumentation från min sida.

Jag vill säkerställa att alla uppgifter är korrekta och aktuella.

Vänliga hälsningar
[Namn]
[Personnummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer", label: "Personnummer" },
        ],
      },
      {
        id: "fk_06",
        title: "Begäran om omprövning med ny dokumentation",
        description: "Begär omprövning och presentera ny dokumentation.",
        context: "Ny dokumentation kan ändra Försäkringskassans beslut.",
        advice: "Bifoga all relevant dokumentation som stödjer din begäran.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning med ny dokumentation

Hej,

Begär omprövning och presentera ny dokumentation.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "fk_07",
        title: "Invändning mot felaktig bedömning av arbetsförtjänst",
        description: "Invända mot bedömningen av din arbetsförtjänst.",
        context: "Arbetsförtjänsten måste bedömas korrekt för att få rätt ersättning.",
        advice: "Presentera dokumentation på din faktiska arbetsförtjänst.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig bedömning av arbetsförtjänst

Hej,

Invända mot bedömningen av din arbetsförtjänst.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "fk_08",
        title: "Begäran om återbetalning av felaktigt utbetald ersättning",
        description: "Be om återbetalning om du fått för mycket ersättning.",
        context: "Du kan få återbetalning om ersättningen beräknats felaktigt.",
        advice: "Samarbeta med Försäkringskassan för att lösa situationen.",
        importance: "medel",
        template: `Ämne: Begäran om återbetalning av felaktigt utbetald ersättning

Hej,

Be om återbetalning om du fått för mycket ersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "fk_09",
        title: "Begäran om förlängd sjukskrivning",
        description: "Be om förlängning av sjukskrivningen.",
        context: "Du kan få förlängd sjukskrivning om du behöver det.",
        advice: "Presentera läkarintyg som stödjer behovet av förlängning.",
        importance: "medel",
        template: `Ämne: Begäran om förlängd sjukskrivning

Hej,

Be om förlängning av sjukskrivningen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "fk_10",
        title: "Invändning mot avslag på ersättning",
        description: "Invända mot avslag på ersättning.",
        context: "Du har rätt att invända mot avslag om du anser det är felaktigt.",
        advice: "Presentera all relevant dokumentation som stödjer din invändning.",
        importance: "högt",
        template: `Ämne: Invändning mot avslag på ersättning

Hej,

Invända mot avslag på ersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
    ],
  },
  {
    id: "migrationsverket",
    title: "Migrationsverket",
    subtitle: "Svar till Migrationsverket",
    icon: "public",
    scenarios: [
      {
        id: "mv_01",
        title: "Förfrågan om status i ärende",
        description: "Be om uppdatering om status på ditt ärende.",
        context: "Om du inte vet hur det går med ditt ärende kan du fråga Migrationsverket om status. Det är viktigt att veta var du står i processen.",
        advice: "Var tydlig om vilket ärende du frågar om. Om du har ett ärendenummer, bifoga det alltid.",
        importance: "medel",
        template: `Ämne: Förfrågan om status i mitt ärende

Hej,

Jag skriver för att vänligen be om en uppdatering gällande mitt pågående ärende hos Migrationsverket.

Jag vill säkerställa att alla nödvändiga handlingar har inkommit och att inget ytterligare krävs från min sida i nuläget.

Tack på förhand för er återkoppling.

Vänliga hälsningar
[Namn]
[Personnummer / Ärendenummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer / Ärendenummer", label: "Personnummer eller ärendenummer" },
        ],
      },
      {
        id: "mv_02",
        title: "Komplettering av handlingar",
        description: "Informera om att du kan komplettera ditt ärende med nya handlingar.",
        context: "Om du nu har möjlighet att lämna handlingar som du inte kunde lämna tidigare är det viktigt att göra det snabbt. Det kan påverka Migrationsverkets bedömning.",
        advice: "Var tydlig om vilka nya handlingar du kan lämna. Fråga vad de behöver för att kunna handlägga ärendet vidare.",
        importance: "högt",
        template: `Ämne: Komplettering i mitt ärende

Hej,

Jag vill meddela att jag har möjlighet att komplettera mitt ärende med ytterligare handlingar.

Vänligen informera mig om vilka dokument som behövs för att handläggningen ska kunna fortsätta utan dröjsmål.

Jag skickar in begrädda uppgifter så snart som möjligt.

Vänliga hälsningar
[Namn]
[Personnummer / Ärendenummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer / Ärendenummer", label: "Personnummer eller ärendenummer" },
        ],
      },
      {
        id: "mv_03",
        title: "Begäran om förlängd svarstid",
        description: "Begär förlängd tid för att samla in handlingar.",
        context: "Om du behöver mer tid för att samla in de dokument som Migrationsverket efterfrågar kan du begära förlängning. Det är bättre att fråga än att missa fristen.",
        advice: "Kontakta dem så snart du märker att du behöver mer tid. Det är lättare att få förlängning om du ber innan tiden går ut.",
        importance: "högt",
        template: `Ämne: Begäran om förlängd svarstid

Hej,

Jag har tagit emot ert meddelande och arbetar med att samla in de uppgifter som efterfrågas.

Jag ber därför om förlängd svarstid för att kunna inkomma med fullständig och korrekt dokumentation.

Tack för er förståelse.

Vänliga hälsningar
[Namn]
[Personnummer / Ärendenummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer / Ärendenummer", label: "Personnummer eller ärendenummer" },
        ],
      },
      {
        id: "mv_04",
        title: "Information om förändrad situation",
        description: "Meddela att dina personliga omständigheter har ändrats.",
        context: "Om din livssituation har förändrats kan det påverka ditt ärende hos Migrationsverket. Det är viktigt att informera dem så att de kan göra en korrekt bedömning.",
        advice: "Var tydlig om vilka förändringar som har skett. Bifoga gärna dokumentation som stödjer din information.",
        importance: "högt",
        template: `Ämne: Uppdatering av min situation

Hej,

Jag vill informera om att min nuvarande situation har förändrats och kan vara relevant för mitt pågående ärende.

Vänligen meddela om ni behöver ytterligare information eller dokumentation från min sida.

Jag vill säkerställa att alla uppgifter hos er är aktuella.

Vänliga hälsningar
[Namn]
[Personnummer / Ärendenummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer / Ärendenummer", label: "Personnummer eller ärendenummer" },
        ],
      },
      {
        id: "mv_05",
        title: "Begäran om kontakt via e-post",
        description: "Be om fortsatt kontakt via e-post för tydlig kommunikation.",
        context: "Om du vill säkerställa att all kommunikation sker via e-post kan du begära det. Det ger dig en tydlig dokumentation av allt som händer i ärendet.",
        advice: "Var höflig men tydlig i din begäran. E-postkommunikation är ofta bättre för att ha en skriftlig dokumentation.",
        importance: "medel",
        template: `Ämne: Begäran om kontakt

Hej,

Jag skriver angående mitt ärende och vill vänligen be om fortsätt kontakt via e-post.

Detta för att säkerställa tydlig kommunikation och korrekt dokumentation i ärendet.

Tack på förhand för er hjälp.

Vänliga hälsningar
[Namn]
[Personnummer / Ärendenummer]`,
        placeholders: [
          { key: "Namn", label: "Ditt namn" },
          { key: "Personnummer / Ärendenummer", label: "Personnummer eller ärendenummer" },
        ],
      },
      {
        id: "mv_06",
        title: "Begäran om omprövning av migrationsärende",
        description: "Begär omprövning av ett migrationsbeslut.",
        context: "Du kan begära omprövning om du anser att beslutet är felaktigt.",
        advice: "Presentera ny dokumentation eller nya omständigheter.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av migrationsärende

Hej,

Begär omprövning av ett migrationsbeslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "mv_07",
        title: "Invändning mot avslag på uppehållstillstånd",
        description: "Invända mot avslag på uppehållstillstånd.",
        context: "Du kan invända mot avslagen om det finns nya omständigheter.",
        advice: "Presentera all relevant dokumentation.",
        importance: "högt",
        template: `Ämne: Invändning mot avslag på uppehållstillstånd

Hej,

Invända mot avslag på uppehållstillstånd.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "mv_08",
        title: "Begäran om expediterad handläggning",
        description: "Be om att ärendet handläggs snabbare.",
        context: "Expediterad handläggning är möjlig i vissa fall.",
        advice: "Motivera varför snabb handläggning är nödvändig.",
        importance: "medel",
        template: `Ämne: Begäran om expediterad handläggning

Hej,

Be om att ärendet handläggs snabbare.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "mv_09",
        title: "Begäran om uppehållstillstånd på humanitär grund",
        description: "Be om uppehållstillstånd på humanitär grund.",
        context: "Humanitär grund kan vara grund för uppehållstillstånd.",
        advice: "Presentera dokumentation på de humanitära skälen.",
        importance: "högt",
        template: `Ämne: Begäran om uppehållstillstånd på humanitär grund

Hej,

Be om uppehållstillstånd på humanitär grund.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "mv_10",
        title: "Invändning mot utvisningsbeslut",
        description: "Invända mot ett utvisningsbeslut.",
        context: "Du kan invända mot utvisning om det finns juridiska grunder.",
        advice: "Konsultera juridisk expert för denna typ av ärende.",
        importance: "högt",
        template: `Ämne: Invändning mot utvisningsbeslut

Hej,

Invända mot ett utvisningsbeslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
    ],
  },
  // Additional authority categories (coming soon - empty for now)
  {
    id: "arbetsformedlingen",
    title: "Arbetsförmedlingen",
    subtitle: "Svar till Arbetsförmedlingen",
    icon: "person",
    scenarios: [
  {
    id: "arb_01",
    title: "Invändning mot beslut om arbetslöshetsersättning",
    description: "Invändning mot beslut om arbetslöshetsersättning.",
    context: "Arbetsförmedlingen måste motivera sitt beslut. En invändning pausar genomförandet av beslutet och ger dig tid att samla bevis.",
    advice: "Bądź konkretny – powołaj się na konkretne przepisy lub fakty, które Twoim zdaniem zostały pominięte.",
    importance: "högt",
    template: `Ämne: Invändning mot beslut – ärendenummer [ÄRENDENUMMER]

Hej,

Jag invänder mot ert beslut från [DATUM] angående min arbetslöshetsersättning.

Jag anser att beslutet är felaktigt eftersom [ANLEDNING].

Jag öppet begär omprövning av detta beslut.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Telefon: [TELEFON]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "TELEFON", label: "Telefon" },
      { key: "ÄRENDENUMMER", label: "Ärendenummer" },
      { key: "DATUM", label: "Datum för beslutet" },
      { key: "ANLEDNING", label: "Anledning till invändningen" },
    ],
  },
  {
    id: "arb_02",
    title: "Begäran om omprövning av arbetslöshetsersättning",
    description: "Begäran om omprövning av höjden på arbetslöshetsersättningen.",
    context: "Arbetsförmedlingen kan felaktigt beräkna ersättningen. Omprövning kräver att de att analysera nya informationer.",
    advice: "Bifoga dokument som stödjer din situation (t.ex. bankutdrag, intyg från arbetsgivare).",
    importance: "medel",
    template: `Ämne: Begäran om omprövning – arbetslöshetsersättning

Hej,

Jag begär omprövning av min arbetslöshetsersättning för perioden [PERIOD].

Min ekonomiska situation har förändrats sedan senaste beräkningen. Jag bifogar följande dokument:
- [DOKUMENT 1]
- [DOKUMENT 2]

Vänligen uppdatera beräkningen baserat på denna nya information.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "PERIOD", label: "Period (t.ex. januari-mars 2026)" },
      { key: "DOKUMENT 1", label: "Första dokumentet" },
      { key: "DOKUMENT 2", label: "Andra dokumentet" },
    ],
  },
  {
    id: "arb_03",
    title: "Begäran om aktivering av arbetslöshetsersättning",
    description: "Begäran om aktivering av arbetslöshetsersättning som har stoppats.",
    context: "Arbetsförmedlingen kan stoppa ersättningen om du inte uppfyller villkoren. En begäran om aktivering visar att du är redo att uppfylla villkoren.",
    advice: "Förklara varför du inte kunde uppfylla villkoren och vad som har förändrats.",
    importance: "högt",
    template: `Ämne: Begäran om aktivering av arbetslöshetsersättning

Hej,

Jag begär aktivering av min arbetslöshetsersättning, som upphörde den [DATUM].

Anledningen till att jag inte kunde delta var [ANLEDNING]. Denna situation är nu löst och jag är redo att återuppta mitt arbetssökande.

Jag är beredd att delta i alla erforderliga aktiviteter och åtgärder.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum då ersättningen upphörde" },
      { key: "ANLEDNING", label: "Anledning (t.ex. sjukdom, personliga skäl)" },
    ],
  },
  {
    id: "arb_04",
    title: "Begäran om stöd för kurser och utbildning",
    description: "Arbetsförmedlingen kan finansiera kurser som ökar dina chanser på arbetsmarknaden.",
    context: "Om du vill höja dina kvalifikationer kan du be Arbetsförmedlingen om ekonomiskt stöd.",
    advice: "Förklara hur den specifika kursen hjälper dig att hitta arbete i din bransch.",
    importance: "medel",
    template: `Ämne: Begäran om stöd för utbildning

Hej,

Jag är intresserad av att genomgå [KURS/UTBILDNING] för att förbättra mina möjligheter på arbetsmarknaden.

Denna utbildning är relevant för min bransch och kommer att öka min anställningsbarhet.

Kursen kostar [KOSTNAD] och varar i [LÄNGD].

Kan ni stödja mig ekonomiskt för denna utbildning?

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "KURS/UTBILDNING", label: "Kurs eller utbildning" },
      { key: "KOSTNAD", label: "Kostnad" },
      { key: "LÄNGD", label: "Längd (t.ex. 3 månader)" },
    ],
  },
  {
    id: "arb_05",
    title: "Klagomål på bristande service från Arbetsförmedlingen",
    description: "Klagomål på service och handläggning.",
    context: "Arbetsförmedlingen har skyldighet att stödja dig i att söka arbete. Klagomål kräver att de att analysera sina åtgärder.",
    advice: "Var specifik – beskriv exakt vad som gick fel och när.",
    importance: "låg",
    template: `Ämne: Klagomål på service och handläggning

Hej,

Jag vill lämna ett klagomål på handläggningen av mitt ärende.

[BESKRIVNING AV PROBLEMET]

Denna situation har påverkat mitt arbetssökande negativt. Jag förväntar mig en förklaring och åtgärd.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "BESKRIVNING AV PROBLEMET", label: "Beskrivning av problemet" },
    ],
  },
      {
        id: "arb_06",
        title: "Begäran om omprövning av arbetslöshetsersättning",
        description: "Begär omprövning av arbetslöshetsersättning.",
        context: "Du kan begära omprövning om du anser att ersättningen är felaktig.",
        advice: "Presentera dokumentation på din arbetsmarknadsinsats.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av arbetslöshetsersättning

Hej,

Begär omprövning av arbetslöshetsersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "arb_07",
        title: "Invändning mot avslag på arbetslöshetsersättning",
        description: "Invända mot avslag på ersättning.",
        context: "Du kan invända mot avslag om du uppfyller villkoren.",
        advice: "Presentera dokumentation på att du uppfyller alla villkor.",
        importance: "högt",
        template: `Ämne: Invändning mot avslag på arbetslöshetsersättning

Hej,

Invända mot avslag på ersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "arb_08",
        title: "Begäran om aktivitetsstöd",
        description: "Be om aktivitetsstöd från Arbetsförmedlingen.",
        context: "Aktivitetsstöd kan ge ekonomisk hjälp under arbetslösheten.",
        advice: "Presentera din arbetssökarprofil och dina behov.",
        importance: "medel",
        template: `Ämne: Begäran om aktivitetsstöd

Hej,

Be om aktivitetsstöd från Arbetsförmedlingen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "arb_09",
        title: "Begäran om utbildning eller omställning",
        description: "Be om möjlighet till utbildning eller omställning.",
        context: "Arbetsförmedlingen kan erbjuda utbildning för att öka dina möjligheter.",
        advice: "Presentera din arbetssökarprofil och dina mål.",
        importance: "medel",
        template: `Ämne: Begäran om utbildning eller omställning

Hej,

Be om möjlighet till utbildning eller omställning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "arb_10",
        title: "Invändning mot minskad ersättning",
        description: "Invända mot minskad arbetslöshetsersättning.",
        context: "Ersättningen kan minskas om du inte uppfyller villkoren.",
        advice: "Presentera dokumentation på att du uppfyller villkoren.",
        importance: "högt",
        template: `Ämne: Invändning mot minskad ersättning

Hej,

Invända mot minskad arbetslöshetsersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
],
  },
  {
    id: "socialstyrelsen",
    title: "Socialstyrelsen",
    subtitle: "Svar till Socialstyrelsen",
    icon: "people",
    scenarios: [
  {
    id: "soc_01",
    title: "Invändning mot beslut om försörjningsstöd",
    description: "Invändning mot beslut om försörjningsstöd.",
    context: "Socialstyrelsen måste motivera sitt beslut. En invändning ger dig rätt till omprövning.",
    advice: "Om din finansiella situation har ändrats, bifoga bevis (t.ex. bankutdrag, fakturor).",
    importance: "högt",
    template: `Ämne: Invändning mot beslut – försörjningsstöd

Hej,

Jag invänder mot ert beslut från [DATUM] angående min ansökan om försörjningsstöd.

Jag anser att beslutet är felaktigt eftersom [ANLEDNING].

Jag bifogar följande dokument som stöd för min invändning:
- [DOKUMENT 1]
- [DOKUMENT 2]

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum för beslutet" },
      { key: "ANLEDNING", label: "Anledning till invändningen" },
      { key: "DOKUMENT 1", label: "Första dokumentet" },
      { key: "DOKUMENT 2", label: "Andra dokumentet" },
    ],
  },
  {
    id: "soc_02",
    title: "Begäran om omprövning av försörjningsstöd",
    description: "Begäran om omprövning när din finansiella situation har ändrats.",
    context: "Socialstyrelsen beräknar stödet baserat på din inkomst. Om du förlorar jobbet eller din situation ändras bör stödet vara högre.",
    advice: "Förklara konkret vad som har ändrats (t.ex. arbetslöshet, nya utgifter).",
    importance: "högt",
    template: `Ämne: Begäran om omprövning – försörjningsstöd

Hej,

Jag begär omprövning av mitt försörjningsstöd.

Min ekonomiska situation har förändrats väsentligt sedan senaste beslut:
- [FÖRÄNDRING 1]
- [FÖRÄNDRING 2]

Jag bifogar dokumentation av dessa förändringar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "FÖRÄNDRING 1", label: "Första förändringen" },
      { key: "FÖRÄNDRING 2", label: "Andra förändringen" },
    ],
  },
  {
    id: "soc_03",
    title: "Begäran om akut försörjningsstöd",
    description: "Begäran om omedelbar ekonomisk hjälp i en akut situation.",
    context: "Socialstyrelsen har skyldighet att ge akut stöd i krissituationer.",
    advice: "Var ärlig om din situation – ju mer konkret, desto bättre.",
    importance: "högt",
    template: `Ämne: Begäran om akut försörjningsstöd

Hej,

Jag är i en akut situation och behöver omedelbar ekonomisk hjälp.

Min situation:
[BESKRIVNING AV SITUATIONEN]

Jag behöver stöd för följande utgifter:
- [UTGIFT 1]
- [UTGIFT 2]

Kan ni behandla denna ansökan med brådskande prioritet?

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Telefon: [TELEFON]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "TELEFON", label: "Telefon" },
      { key: "BESKRIVNING AV SITUATIONEN", label: "Beskrivning av situationen" },
      { key: "UTGIFT 1", label: "Första utgiften" },
      { key: "UTGIFT 2", label: "Andra utgiften" },
    ],
  },
  {
    id: "soc_04",
    title: "Begäran om stöd för barnvård",
    description: "Begäran om stöd för barnvård för att kunna arbeta.",
    context: "Socialstyrelsen kan finansiera barnomsorg för att hjälpa dig att arbeta.",
    advice: "Förklara hur stödet hjälper dig att hitta eller behålla arbete.",
    importance: "medel",
    template: `Ämne: Begäran om stöd för barnvård

Hej,

Jag söker stöd för barnvård för att kunna arbeta.

Min situation:
- Barn: [ANTAL] barn, ålder [ÅLDER]
- Barnvårdskostnad: [KOSTNAD] per månad
- Denna kostnad hindrar mig från att arbeta

Med ekonomiskt stöd för barnvård kan jag:
[BESKRIVNING AV HUR STÖDET HJÄLPER]

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ANTAL", label: "Antal barn" },
      { key: "ÅLDER", label: "Ålder på barnen" },
      { key: "KOSTNAD", label: "Barnvårdskostnad per månad" },
      { key: "BESKRIVNING AV HUR STÖDET HJÄLPER", label: "Hur stödet hjälper" },
    ],
  },
  {
    id: "soc_05",
    title: "Klagomål på socialtjänsten",
    description: "Klagomål på socialtjänstens handläggning.",
    context: "Socialstyrelsen måste agera etiskt och professionellt. Klagomål kräver att de att analysera sina åtgärder.",
    advice: "Beskriv konkret vad som gick fel och hur det påverkade dig.",
    importance: "låg",
    template: `Ämne: Klagomål på socialtjänstens handläggning

Hej,

Jag vill lämna ett klagomål på hur min sak har hanterats av socialtjänsten.

[BESKRIVNING AV PROBLEMET]

Denna handläggning har påverkat mig negativt. Jag förväntar mig en förklaring och åtgärd.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "BESKRIVNING AV PROBLEMET", label: "Beskrivning av problemet" },
    ],
  },
      {
        id: "soc_06",
        title: "Begäran om omprövning av socialbidrag",
        description: "Begär omprövning av socialbidragsbeslut.",
        context: "Du kan begära omprövning om din ekonomiska situation förändrats.",
        advice: "Presentera dokumentation på din nuvarande ekonomiska situation.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av socialbidrag

Hej,

Begär omprövning av socialbidragsbeslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "soc_07",
        title: "Invändning mot avslag på socialbidrag",
        description: "Invända mot avslag på socialbidrag.",
        context: "Du kan invända mot avslag om du har behov.",
        advice: "Presentera dokumentation på ditt ekonomiska behov.",
        importance: "högt",
        template: `Ämne: Invändning mot avslag på socialbidrag

Hej,

Invända mot avslag på socialbidrag.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "soc_08",
        title: "Begäran om bostadsbidrag",
        description: "Be om bostadsbidrag från Socialstyrelsen.",
        context: "Bostadsbidrag kan ge ekonomisk hjälp med bostadskostnader.",
        advice: "Presentera dokumentation på dina bostadskostnader och inkomst.",
        importance: "medel",
        template: `Ämne: Begäran om bostadsbidrag

Hej,

Be om bostadsbidrag från Socialstyrelsen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "soc_09",
        title: "Begäran om vård och omsorg",
        description: "Be om vård och omsorg från Socialstyrelsen.",
        context: "Socialstyrelsen kan erbjuda vård och omsorg enligt behov.",
        advice: "Presentera dokumentation på ditt behov av vård och omsorg.",
        importance: "medel",
        template: `Ämne: Begäran om vård och omsorg

Hej,

Be om vård och omsorg från Socialstyrelsen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "soc_10",
        title: "Invändning mot minskad ersättning",
        description: "Invända mot minskad socialersättning.",
        context: "Ersättningen kan minskas om din situation förändrats.",
        advice: "Presentera dokumentation på din nuvarande situation.",
        importance: "högt",
        template: `Ämne: Invändning mot minskad ersättning

Hej,

Invända mot minskad socialersättning.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
],
  },
  {
    id: "polisen",
    title: "Polisen",
    subtitle: "Svar till Polisen",
    icon: "shield",
    scenarios: [
  {
    id: "pol_01",
    title: "Anmälan om brott",
    description: "Anmälan om ett brott som begicks mot dig.",
    context: "Anmälan startar en utredning. Det är viktigt att vara konkret och ge så många detaljer som möjligt.",
    advice: "Beskriv exakt vad som hände, när och var. Om du har vittnen, nämn dem.",
    importance: "högt",
    template: `Ämne: Anmälan om brott

Hej,

Jag vill anmäla ett brott som begicks mot mig.

Typ av brott: [TYP AV BROTT]
Datum: [DATUM]
Plats: [PLATS]

Beskrivning av vad som hände:
[DETALJERAD BESKRIVNING]

Eventuella vittnen:
[VITTNEN]

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Telefon: [TELEFON]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "TELEFON", label: "Telefon" },
      { key: "TYP AV BROTT", label: "Typ av brott" },
      { key: "DATUM", label: "Datum för brottet" },
      { key: "PLATS", label: "Plats för brottet" },
      { key: "DETALJERAD BESKRIVNING", label: "Detaljerad beskrivning" },
      { key: "VITTNEN", label: "Vittnen (om några)" },
    ],
  },
  {
    id: "pol_02",
    title: "Invändning mot beslut om nedläggning av utredning",
    description: "Invändning mot polisens beslut att lägga ned utredningen.",
    context: "Polisen måste motivera varför de lägger ned en utredning. En invändning kräver att de att analysera bevisen på nytt.",
    advice: "Om du har nya bevis, bifoga dem. Om du anser att polisen inte gjorde tillräckligt, var konkret om det.",
    importance: "högt",
    template: `Ämne: Invändning mot nedläggning av utredning

Hej,

Jag invänder mot polisens beslut att lägga ned utredningen av mitt ärende från [DATUM].

Jag anser att utredningen var ofullständig eftersom [ANLEDNING].

Jag bifogar följande nya bevis:
- [BEVIS 1]
- [BEVIS 2]

Jag begär att utredningen återupptas.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum för nedläggningen" },
      { key: "ANLEDNING", label: "Anledning till invändningen" },
      { key: "BEVIS 1", label: "Första beviset" },
      { key: "BEVIS 2", label: "Andra beviset" },
    ],
  },
  {
    id: "pol_03",
    title: "Begäran om information om utredningsstatus",
    description: "Begäran om uppdatering om utredningsstatus.",
    context: "Du har rätt att veta statusen på din sak. Polisen måste informera dig regelbundet.",
    advice: "Referera till ditt ärendenummer för att göra det enkelt för polisen att hitta din sak.",
    importance: "medel",
    template: `Ämne: Begäran om utredningsstatus – ärendenummer [ÄRENDENUMMER]

Hej,

Jag vill ha en uppdatering om status på min anmälan från [DATUM].

Kan ni informera mig om:
- Var står utredningen?
- Finns det några nya utvecklingar?
- När kan jag förvänta mig ett resultat?

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ÄRENDENUMMER", label: "Ärendenummer" },
      { key: "DATUM", label: "Datum för anmälan" },
    ],
  },
  {
    id: "pol_04",
    title: "Invändning mot trafikbot",
    description: "Invändning mot trafikbot.",
    context: "Mandat är inte slutgiltigt. Du kan invända och begära en domstolsförhandling.",
    advice: "Förklara konkret varför du anser att boten är felaktig (t.ex. skylten var osynlig, hastigheten var korrekt).",
    importance: "medel",
    template: `Ämne: Invändning mot trafikbot – ärendenummer [ÄRENDENUMMER]

Hej,

Jag invänder mot trafikboten från [DATUM].

Jag anser att boten är felaktig eftersom [ANLEDNING].

Jag begär att ärendet behandlas genom domstol.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ÄRENDENUMMER", label: "Ärendenummer" },
      { key: "DATUM", label: "Datum för boten" },
      { key: "ANLEDNING", label: "Anledning till invändningen" },
    ],
  },
  {
    id: "pol_05",
    title: "Begäran om näringsförbud/skyddsåtgärd",
    description: "Begäran om näringsförbud eller skyddsåtgärd.",
    context: "Näringsförbud är ett viktigt verktyg för skydd. Polisen måste bedöma om det finns ett verkligt hot.",
    advice: "Var ärlig om hotet – beskriv konkreta incidenter som skrämmer dig.",
    importance: "högt",
    template: `Ämne: Begäran om näringsförbud

Hej,

Jag begär ett näringsförbud mot [NAMN PÅ PERSON] på grund av säkerhetsskäl.

Denna person har:
- [INCIDENT 1]
- [INCIDENT 2]
- [INCIDENT 3]

Jag är rädd för min säkerhet och behöver juridiskt skydd.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Telefon: [TELEFON]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "TELEFON", label: "Telefon" },
      { key: "NAMN PÅ PERSON", label: "Namn på personen" },
      { key: "INCIDENT 1", label: "Första incidenten" },
      { key: "INCIDENT 2", label: "Andra incidenten" },
      { key: "INCIDENT 3", label: "Tredje incidenten" },
    ],
  },
      {
        id: "pol_06",
        title: "Begäran om omprövning av polisbeslut",
        description: "Begär omprövning av ett polisbeslut.",
        context: "Du kan begära omprövning om du anser att beslutet är felaktigt.",
        advice: "Presentera ny dokumentation eller nya omständigheter.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av polisbeslut

Hej,

Begär omprövning av ett polisbeslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "pol_07",
        title: "Invändning mot felaktig anmälan",
        description: "Invända mot att en anmälan gjorts felaktigt.",
        context: "Du kan invända mot anmälan om den är felaktig eller orättvis.",
        advice: "Presentera dokumentation som motsäger anmälan.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig anmälan

Hej,

Invända mot att en anmälan gjorts felaktigt.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "pol_08",
        title: "Begäran om skadereglering",
        description: "Be om ersättning för skada orsakad av polisen.",
        context: "Du kan få ersättning om polisen orsakat skada.",
        advice: "Presentera dokumentation på skadan och dess omfattning.",
        importance: "medel",
        template: `Ämne: Begäran om skadereglering

Hej,

Be om ersättning för skada orsakad av polisen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "pol_09",
        title: "Begäran om utredning av polisbeslut",
        description: "Be om utredning av ett polisbeslut.",
        context: "Du kan begära utredning om du ifrågasätter ett beslut.",
        advice: "Presentera konkreta skäl till varför beslutet bör utredas.",
        importance: "medel",
        template: `Ämne: Begäran om utredning av polisbeslut

Hej,

Be om utredning av ett polisbeslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "pol_10",
        title: "Invändning mot felaktig registrering",
        description: "Invända mot felaktig registrering hos polisen.",
        context: "Du kan få felaktig registrering raderad.",
        advice: "Presentera dokumentation på att registreringen är felaktig.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig registrering

Hej,

Invända mot felaktig registrering hos polisen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
],
  },
  {
    id: "domstol",
    title: "Domstol",
    subtitle: "Svar till Domstol",
    icon: "gavel",
    scenarios: [
  {
    id: "dom_01",
    title: "Ansökan om domstolsförhandling",
    description: "Ansökan om domstolsförhandling för att lösa en tvistighet.",
    context: "Domstolsförhandlingar är det slutgiltiga sättet att lösa tvister. Det är viktigt att vara väl förberedd.",
    advice: "Bifoga alla dokument som stödjer dina anspråk (kontrakt, fakturor, e-post).",
    importance: "högt",
    template: `Ämne: Ansökan om domstolsförhandling

Hej,

Jag ansöker om en domstolsförhandling angående en tvistighet med [MOTPARTENS NAMN].

Tvisten gäller: [BESKRIVNING AV TVISTEN]

Jag begär följande:
- [KRAV 1]
- [KRAV 2]

Jag bifogar följande dokument som stöd:
- [DOKUMENT 1]
- [DOKUMENT 2]

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Adress: [ADRESS]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ADRESS", label: "Din adress" },
      { key: "MOTPARTENS NAMN", label: "Motpartens namn" },
      { key: "BESKRIVNING AV TVISTEN", label: "Beskrivning av tvisten" },
      { key: "KRAV 1", label: "Första kravet" },
      { key: "KRAV 2", label: "Andra kravet" },
      { key: "DOKUMENT 1", label: "Första dokumentet" },
      { key: "DOKUMENT 2", label: "Andra dokumentet" },
    ],
  },
  {
    id: "dom_02",
    title: "Invändning mot domstolsbeslut",
    description: "Invändning mot ett domstolsbeslut.",
    context: "Invändning är första steget för att få ärendet omprövat. Du måste visa att domstolen gjort ett juridiskt fel.",
    advice: "Referera till konkreta punkter i domen som du anser är felaktiga.",
    importance: "högt",
    template: `Ämne: Invändning mot domstolsbeslut – ärendenummer [ÄRENDENUMMER]

Hej,

Jag invänder mot domstolens beslut från [DATUM].

Jag anser att domstolen gjort ett juridiskt fel när den [BESKRIVNING AV FELET].

Jag begär att ärendet omprövs.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ÄRENDENUMMER", label: "Ärendenummer" },
      { key: "DATUM", label: "Datum för beslutet" },
      { key: "BESKRIVNING AV FELET", label: "Beskrivning av det juridiska felet" },
    ],
  },
  {
    id: "dom_03",
    title: "Begäran om uppskov med domstolsbeslut",
    description: "Begäran om odroczenie (uppskov) med genomförandet av domstolsbeslut.",
    context: "Domstolen kan ge uppskov om du har motiverade skäl (t.ex. ekonomiska svårigheter).",
    advice: "Förklara konkret varför du behöver mer tid och när du kan genomföra beslutet.",
    importance: "medel",
    template: `Ämne: Begäran om uppskov – domstolsbeslut

Hej,

Jag begär uppskov med genomförandet av domstolens beslut från [DATUM].

Anledningen är: [ANLEDNING]

Jag kan genomföra beslutet från och med [NYTT DATUM].

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum för beslutet" },
      { key: "ANLEDNING", label: "Anledning till uppskov" },
      { key: "NYTT DATUM", label: "Nytt datum för genomförandet" },
    ],
  },
  {
    id: "dom_04",
    title: "Begäran om rättshjälp",
    description: "Ansökan om rättshjälp (juridisk hjälp).",
    context: "Rättshjälp är tillgänglig för personer med låga inkomster. Domstolen bedömer din finansiella situation.",
    advice: "Var ärlig om din inkomst och utgifter.",
    importance: "medel",
    template: `Ämne: Ansökan om rättshjälp

Hej,

Jag ansöker om rättshjälp för att kunna försvara mig i domstol.

Min ekonomiska situation:
- Månadsinkomst: [INKOMST]
- Månadskostnader: [KOSTNADER]
- Sparade pengar: [SPARADE]

Jag kan inte bekosta en advokat utan rättshjälp.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "INKOMST", label: "Månadsinkomst" },
      { key: "KOSTNADER", label: "Månadskostnader" },
      { key: "SPARADE", label: "Sparade pengar" },
    ],
  },
  {
    id: "dom_05",
    title: "Invändning mot exekutiv av domstolsbeslut",
    description: "Invändning mot exekutiv (genomförandet) av domstolsbeslut.",
    context: "Exekutiv kan pausas om du har motiverade skäl (t.ex. procedurfel).",
    advice: "Förklara konkret varför exekutionen bör pausas.",
    importance: "högt",
    template: `Ämne: Invändning mot exekutiv av domstolsbeslut

Hej,

Jag invänder mot exekutionen av domstolsbeslut från [DATUM].

Anledningen är: [ANLEDNING]

Jag begär att exekutionen pausas medan ärendet omprövs.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum för beslutet" },
      { key: "ANLEDNING", label: "Anledning till invändningen" },
    ],
  },
      {
        id: "dom_06",
        title: "Begäran om omprövning av domslut",
        description: "Begär omprövning av ett domslut.",
        context: "Du kan begära omprövning om du anser att domen är felaktig.",
        advice: "Presentera juridiska grunder för omprövningen.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av domslut

Hej,

Begär omprövning av ett domslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "dom_07",
        title: "Invändning mot felaktig rättsprocess",
        description: "Invända mot att rättsprocessen inte följt lagen.",
        context: "Brister i rättsprocessen kan göra domen ogiltigt.",
        advice: "Presentera konkreta exempel på processbrister.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig rättsprocess

Hej,

Invända mot att rättsprocessen inte följt lagen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "dom_08",
        title: "Begäran om uppskov med verkställighet",
        description: "Be om uppskov med verkställighet av domen.",
        context: "Uppskov kan ges om det finns särskilda skäl.",
        advice: "Motivera varför uppskov är nödvändigt.",
        importance: "högt",
        template: `Ämne: Begäran om uppskov med verkställighet

Hej,

Be om uppskov med verkställighet av domen.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "dom_09",
        title: "Begäran om rättshjälp",
        description: "Be om rättshjälp för att bekosta juridisk representation.",
        context: "Rättshjälp kan beviljas om du har begränsad ekonomi.",
        advice: "Presentera dokumentation på din ekonomiska situation.",
        importance: "medel",
        template: `Ämne: Begäran om rättshjälp

Hej,

Be om rättshjälp för att bekosta juridisk representation.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "dom_10",
        title: "Invändning mot felaktig skadereglering",
        description: "Invända mot felaktig skadereglering i dom.",
        context: "Skaderegleringen måste beräknas korrekt.",
        advice: "Presentera dokumentation på den faktiska skadan.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig skadereglering

Hej,

Invända mot felaktig skadereglering i dom.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
],
  },
  {
    id: "boverkets",
    title: "Boverkets",
    subtitle: "Svar till Boverkets",
    icon: "home",
    scenarios: [
  {
    id: "bov_01",
    title: "Begäran om återbetalning av hyresdeposit",
    description: "Begäran om återbetalning av hyresdeposit.",
    context: "Hyresvärden måste återbetala depositionen inom 30 dagar efter att du flyttat ut. Om det inte sker kan du be Boverket om hjälp.",
    advice: "Bifoga kopior av hyresavtal och fotografier från slutbesiktningen.",
    importance: "högt",
    template: `Ämne: Begäran om återbetalning av hyresdeposit

Hej,

Jag begär återbetalning av min hyresdeposit från lägenheten på [ADRESS].

Jag flyttade ut den [DATUM] och har inte mottagit min deposition trots flera påminnelser.

Depositionen var på [BELOPP] SEK.

Jag bifogar kopior av:
- Hyresavtal
- Fotografier från slutbesiktningen
- E-post från hyresvärden

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ADRESS", label: "Lägenhetens adress" },
      { key: "DATUM", label: "Datum för utflyttning" },
      { key: "BELOPP", label: "Depositionen belopp (SEK)" },
    ],
  },
  {
    id: "bov_02",
    title: "Klagomål på dåliga boendeförhållanden",
    description: "Klagomål på dåliga boendeförhållanden.",
    context: "Hyresvärden har skyldighet att hålla lägenheten i gott skick. Klagomål kräver att reparera.",
    advice: "Beskriv konkret vilka problem du har och hur länge de har funnits.",
    importance: "högt",
    template: `Ämne: Klagomål på boendeförhållanden – [ADRESS]

Hej,

Jag vill lämna ett klagomål på boendeförhållandena i min lägenhet på [ADRESS].

Följande problem finns:
- [PROBLEM 1]
- [PROBLEM 2]
- [PROBLEM 3]

Dessa problem har existerat sedan [DATUM] och påverkar min hälsa och säkerhet.

Jag begär att dessa problem åtgärdas omedelbar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]
Telefon: [TELEFON]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "TELEFON", label: "Telefon" },
      { key: "ADRESS", label: "Lägenhetens adress" },
      { key: "PROBLEM 1", label: "Första problemet" },
      { key: "PROBLEM 2", label: "Andra problemet" },
      { key: "PROBLEM 3", label: "Tredje problemet" },
      { key: "DATUM", label: "Datum då problemen började" },
    ],
  },
  {
    id: "bov_03",
    title: "Invändning mot hyreshöjning",
    description: "Invändning mot hyreshöjning.",
    context: "Hyran kan höjas endast i vissa situationer (t.ex. ökade underhållskostnader). Invändning kräver hyresvärden att motivera höjningen.",
    advice: "Jämför din hyra med andra lägenheter i området.",
    importance: "medel",
    template: `Ämne: Invändning mot hyreshöjning

Hej,

Jag invänder mot hyreshöjningen från [DATUM] för lägenheten på [ADRESS].

Höjningen från [GAMMAL HYRA] till [NY HYRA] är inte rimlig eftersom:
- [ANLEDNING 1]
- [ANLEDNING 2]

Jag begär att hyran återgår till tidigare nivå.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "DATUM", label: "Datum för höjningen" },
      { key: "ADRESS", label: "Lägenhetens adress" },
      { key: "GAMMAL HYRA", label: "Tidigare hyra (SEK)" },
      { key: "NY HYRA", label: "Ny hyra (SEK)" },
      { key: "ANLEDNING 1", label: "Första anledningen" },
      { key: "ANLEDNING 2", label: "Andra anledningen" },
    ],
  },
  {
    id: "bov_04",
    title: "Begäran om hyresreduktion",
    description: "Begäran om hyresreduktion på grund av fel i lägenheten.",
    context: "Om lägenheten inte uppfyller standarder bör hyran reduceras. Det är dina rättigheter.",
    advice: "Dokumentera alla problem med fotografier och datum.",
    importance: "medel",
    template: `Ämne: Begäran om hyresreduktion – [ADRESS]

Hej,

Jag begär en hyresreduktion för lägenheten på [ADRESS] på grund av följande fel:
- [FEL 1]
- [FEL 2]

Dessa fel påverkar mitt boende negativt och minskar värdet på lägenheten.

Jag föreslår en reduktion på [PROCENT]% från och med [DATUM].

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "ADRESS", label: "Lägenhetens adress" },
      { key: "FEL 1", label: "Första felet" },
      { key: "FEL 2", label: "Andra felet" },
      { key: "PROCENT", label: "Procent reduktion" },
      { key: "DATUM", label: "Startdatum för reduktion" },
    ],
  },
  {
    id: "bov_05",
    title: "Klagomål på hyresvärden",
    description: "Klagomål på hyresvärdens handläggning.",
    context: "Hyresvärden måste agera etiskt och enligt lag. Klagomål kräver att analysera sina åtgärder.",
    advice: "Beskriv konkret vad hyresvärden gjorde och när.",
    importance: "låg",
    template: `Ämne: Klagomål på hyresvärden

Hej,

Jag vill lämna ett klagomål på min hyresvärds handläggning.

[BESKRIVNING AV PROBLEMET]

Denna behandling har påverkat mig negativt. Jag förväntar mig en förklaring och åtgärd.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
    placeholders: [
      { key: "DITT NAMN", label: "Ditt namn" },
      { key: "PERSONNUMMER", label: "Personnummer" },
      { key: "BESKRIVNING AV PROBLEMET", label: "Beskrivning av problemet" },
    ],
  },
      {
        id: "bov_06",
        title: "Begäran om omprövning av Boverkets beslut",
        description: "Begär omprövning av ett Boverkets beslut.",
        context: "Du kan begära omprövning om du anser att beslutet är felaktigt.",
        advice: "Presentera ny dokumentation eller nya omständigheter.",
        importance: "högt",
        template: `Ämne: Begäran om omprövning av Boverkets beslut

Hej,

Begär omprövning av ett Boverkets beslut.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "bov_07",
        title: "Invändning mot felaktig hyresbedömning",
        description: "Invända mot att hyran bedömts felaktigt.",
        context: "Hyran måste bedömas enligt gällande regler.",
        advice: "Presentera dokumentation på att hyran är felaktigt bedömd.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig hyresbedömning

Hej,

Invända mot att hyran bedömts felaktigt.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "bov_08",
        title: "Begäran om skönsprövning av hyra",
        description: "Be om skönsprövning av hyran.",
        context: "Skönsprövning kan ges om hyran är orimligt hög.",
        advice: "Presentera jämförande hyror i området.",
        importance: "medel",
        template: `Ämne: Begäran om skönsprövning av hyra

Hej,

Be om skönsprövning av hyran.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "bov_09",
        title: "Invändning mot felaktig bostadsstandard",
        description: "Invända mot bedömningen av bostadsstandarden.",
        context: "Bostadsstandarden måste uppfylla minimikrav.",
        advice: "Presentera dokumentation på brister i standarden.",
        importance: "högt",
        template: `Ämne: Invändning mot felaktig bostadsstandard

Hej,

Invända mot bedömningen av bostadsstandarden.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
      {
        id: "bov_10",
        title: "Begäran om ersättning för felaktig bostadsstandard",
        description: "Be om ersättning för brister i bostadsstandarden.",
        context: "Du kan få ersättning om bostaden inte uppfyller standarder.",
        advice: "Presentera dokumentation på bristen och dess påverkan.",
        importance: "medel",
        template: `Ämne: Begäran om ersättning för felaktig bostadsstandard

Hej,

Be om ersättning för brister i bostadsstandarden.

Jag ber er granska detta ärende och återkomma med ett svar.

Med vänlig hälsning
[DITT NAMN]
Personnummer: [PERSONNUMMER]`,
        placeholders: [
          { key: "DITT NAMN", label: "Ditt namn" },
          { key: "PERSONNUMMER", label: "Personnummer" },
        ],
      },
],
  },
];
