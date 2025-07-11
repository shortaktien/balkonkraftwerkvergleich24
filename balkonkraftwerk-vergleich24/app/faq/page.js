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
  {
    question: "Was ist ein Balkonkraftwerk Speicher?",
    answer:
      "Ein Balkonkraftwerk Speicher ermöglicht es, überschüssigen Solarstrom zu speichern und später zu nutzen.",
  },
  {
    question: "Brauche ich einen Wechselrichter?",
    answer:
      "Ja, ein Wechselrichter wandelt den erzeugten Gleichstrom in nutzbaren Wechselstrom um.",
  },
  {
    question: "Lohnt sich ein Speicher finanziell?",
    answer:
      "Langfristig kann ein Speicher den Eigenverbrauch erhöhen und so Stromkosten senken.",
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
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Container>
      </PageLayout>
    </>
  );
}
