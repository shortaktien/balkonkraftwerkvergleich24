"use client";
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";
import { FaqJsonLd } from "../utils/faqStructuredData";
import PageLayout from "../PageLayout";

const faqs = [
  // Allgemeines & Begriffe
  { question: "--- Allgemeines & Begriffe ---", answer: "" },
  {
    question: "Was ist ein Balkonkraftwerk (BKW)?",
    answer: "Eine kleine plug-&-play PV-Anlage (Module + Wechselrichter + Stecker) für den Balkon oder die Terrasse.",
  },
  {
    question: "Unterschied zwischen BKW und Photovoltaikanlage?",
    answer: "BKWs sind Stecker-Solargeräte bis 800 VA (Wechselrichterleistung) zur Eigenversorgung, keine Großanlage.",
  },
  {
    question: "Was bedeuten Wp und VA?",
    answer: "Wp = Spitzenleistung der Module; VA = Wechselrichter-Scheinleistung.",
  },

  // Technik & Komponenten
  { question: "--- Technik & Komponenten ---", answer: "" },
  {
    question: "Wie viele Module kann ich nutzen?",
    answer: "Bis zu 2.000 Wp Modulleistung erlaubt, mit maximal 800 W Einspeiseleistung.",
  },
  {
    question: "Brauche ich spezielle Wechselrichter?",
    answer: "Mikrowechselrichter mit Sicherheitszertifikaten (z. B. DGS, VDE) sind Pflicht.",
  },
  {
    question: "Welcher Stecker ist empfohlen?",
    answer: "Schuko ist üblich, Wieland-Stecker wird für höhere Sicherheit empfohlen.",
  },
  {
    question: "Kann ich mehrere Module in Reihe schalten?",
    answer: "Ja, solange Gesamtleistung ≤ 2.000 Wp und Einspeiselimit 800 W eingehalten wird.",
  },
  {
    question: "Lohnt sich ein Batteriespeicher für BKW?",
    answer: "Rein aus PV oft nicht nötig, lohnt sich aber bei hohem Eigenverbrauch.",
  },
  {
    question: "Welche Speichergrößen gibt es?",
    answer: "Bis einige kWh, oft erweiterbar. Leistung unabhängig vom Speicher begrenzt. Regel-Meldepflicht.",
  },
  {
    question: "Stromausfall und BKW – funktioniert das?",
    answer: "Nein – Netzreferenz fehlt, Wechselrichter schaltet sicher ab.",
  },

  // Montage & Halterungen
  { question: "--- Montage & Halterungen ---", answer: "" },
  {
    question: "Wo kann ich das BKW montieren?",
    answer: "Balkonbrüstung, Wand, Flachdach, Terrasse, Carport.",
  },
  {
    question: "Hält mein Balkon das aus?",
    answer: "Normgerechte Balkone tragen problemlos ein Standard-System.",
  },
  {
    question: "Sind leichte Folienmodule sinnvoll?",
    answer: "Ja – einfach mit Kabelbindern montierbar, auch glasreiche Module möglich.",
  },
  {
    question: "Brauche ich Spezialwerkzeug?",
    answer: "Meist nur Montagematerial; Elektroarbeiten erfordern Fachkraft.",
  },
  {
    question: "Darf ich Mehrfachstecker nutzen?",
    answer: "Nein – kann Überlast oder Sicherheitsrisiken verursachen.",
  },

  // Ausrichtung & Ertrag
  { question: "--- Ausrichtung & Ertrag ---", answer: "" },
  {
    question: "Welche Ausrichtung ist optimal?",
    answer: "Südausrichtung ideal, Ost/West mit Speicher kann sinnvoll sein.",
  },
  {
    question: "Wie viel Jahresertrag?",
    answer: "Rechnet man mit 3–10 Jahren Amortisation, je nach Sonnenlage und Strompreis.",
  },
  {
    question: "Was bei Schatten?",
    answer: "Schatten reduziert Ertrag stark – nach Norden kaum empfehlenswert.",
  },

  // Rechtliches & Gesetze
  { question: "--- Rechtliches & Gesetze ---", answer: "" },
  {
    question: "Genehmigung nötig?",
    answer: "Nein, solange innerhalb von 800 W / 2.000 Wp bleibt. Zustimmung Vermieter/WEG erforderlich – nur bei Unzumutbarkeit darf abgelehnt werden.",
  },
  {
    question: "Anmeldung notwendig?",
    answer: "Anmeldung im Marktstammdatenregister innerhalb eines Monats.",
  },
  {
    question: "Zählertausch?",
    answer: "Netzbetreiber kann tauschen, keine Kosten für dich.",
  },
  {
    question: "USt-Befreiung?",
    answer: "Komponenten & Installation bis 30 kWp umsatzsteuerfrei (§ 12 Abs 3 UStG).",
  },
  {
    question: "Privileg für Mieter/WEG?",
    answer: "Seit Oktober 2024 können Vermieter/WEG nur bei besonderem Grund ablehnen.",
  },
  {
    question: "Fassadenschutz / Denkmal?",
    answer: "Baurechtliche Einschränkungen evtl. durch Denkmalschutz oder gestalterische Pflicht.",
  },

  // Kosten & Wirtschaftlichkeit
  { question: "--- Kosten & Wirtschaftlichkeit ---", answer: "" },
  {
    question: "Was kostet ein BKW?",
    answer: "Komplettsets ab 300–500 €, bei Discountern ab ca. 300 €.",
  },
  {
    question: "Wann amortisiert sich ein BKW?",
    answer: "Meist nach 3–10 Jahren, abhängig von Verbrauch und Sonneneinstrahlung.",
  },
  {
    question: "Gibt es Förderungen?",
    answer: "Förderungen regional möglich, oft von Kommune oder Wohnungseigentümer.",
  },

  // Zubehör & Sicherheit
  { question: "--- Zubehör & Sicherheit ---", answer: "" },
  {
    question: "Was gehört in ein Komplett-Set?",
    answer: "Module, Wechselrichter, Stecker, Kabel, Halterung, ggf. Speicher.",
  },
  {
    question: "Welche Zertifikate?",
    answer: "DGS-Sicherheitsstandard, VDE-Produktnorm, Mikrowechselrichter zertifiziert.",
  },
  {
    question: "Brauche ich Überspannungsschutz?",
    answer: "Ja, besonders bei Gewittern oder für Außensteckdose empfohlen.",
  },
  {
    question: "Versicherung notwendig?",
    answer: "Hausrat-/Haftpflichtversicherung decken Schäden meist ab; extra Element lohnt.",
  },
  {
    question: "Wie erkenne ich defektes BKW?",
    answer: "Messgeräte, Zähler oder App des Wechselrichters nutzen.",
  },

  // Betrieb & Verwaltung
  { question: "--- Betrieb & Verwaltung ---", answer: "" },
  {
    question: "Eigenverbrauch vs. Einspeisung?",
    answer: "Alles ungenutzte fließt unvergütet ins Netz – keine Vergütung für BKW.",
  },
  {
    question: "Kann ich parallel PV-Dachanlage betreiben?",
    answer: "Ja, Kombination erlaubt; Einspeisung wird anteilig gedeckelt.",
  },
  {
    question: "BKW beim Auszug mitnehmen?",
    answer: "Mieter müssen Rückbau klären – schadensfrei einbauen oder Entfernung ggfs. vom Vermieter bestimmt.",
  },
  {
    question: "Entsorgung alter Module?",
    answer: "Wertstoffhof oder Hersteller-Recycling – keine Entsorgung im Restmüll.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ | Balkonspeicher24</title>
        <meta
          name="description"
          content="Antworten auf häufige Fragen zu Balkonkraftwerk Speichern."
        />
        <link rel="canonical" href="https://balkonspeicher24.shortaktien.de/faq" />
        <FaqJsonLd faqs={faqs} />
      </Head>
      <PageLayout>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Paper sx={{ p: 4, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom>
              Häufige Fragen (FAQ)
            </Typography>
            {faqs.map((faq, index) =>
  faq.question.startsWith('---') ? (
    <Typography key={index} variant="h6" sx={{ mt: 4, mb: 2 }}>
      {faq.question.replace(/---/g, '').trim()}
    </Typography>
  ) : (
    <Accordion key={index}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{faq.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">{faq.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
)}
          </Paper>
        </Container>
      </PageLayout>
    </>
  );
}
