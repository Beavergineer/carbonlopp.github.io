import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const EMISSION_FACTORS = {
  // Rough annual kg CO2e estimates per category (individual/person)
  size: { tpe: 800, moyenne_entreprise: 1500, grande_entreprise: 2000, large_entreprise: 3500 },
  sector: { hospital: 2000, secteur_publique: 1000, btp: 2500, tech: 3000 },
  installation: { home: 500, rental: 900, public: 1400, hybrid: 2500 }
};

const AVERAGE_FOOTPRINT = 12000; // Global average ~12 tons CO2e/person/year

export default function CarbonFootprintCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const steps = ['Taille de votre entreprise', 'Secteur d entreprise', 'Infrastructure'];

  const handleAnswer = (category, value) => {
    setAnswers({ ...answers, [category]: value });
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      calculateFootprint();
    }
  };

  const calculateFootprint = () => {
    const total = Object.entries(answers).reduce((sum, [category, choice]) => {
      return sum + (EMISSION_FACTORS[category]?.[choice] || 0);
    }, 0);
    
    const percentage = ((total / AVERAGE_FOOTPRINT) * 100).toFixed(1);
    setResult({ total, percentage, label: getResultLabel(total) });
  };

  const getResultLabel = (total) => {
    if (total < 4000) return "Excellent 🌿";
    if (total < 8000) return "Bien 👍";
    if (total < 12000) return "Moyen ⚠️";
    return "À améliorer 🚨";
  };

  const questions = [
    {
      category: 'size',
      question: "Quelle est la taille de votre entreprise ?",
      options: [
        { value: 'tpe', label: "Petite entreprise (1 - 20 personnes)" },
        { value: 'moyenne_entreprise', label: "Moyenne entreprise (20 - 100 personnes)" },
        { value: 'grande_entreprise', label: "Grande entreprise (100 - 1000 personnes)" },
        { value: 'large_entreprise', label: "Large entreprise (+ de 1000 personnes)" }
      ]
    },
    {
      category: 'sector',
      question: "Dans quel secteur est votre entreprise ?",
      options: [
        { value: 'tech', label: "Développement technologique" },
        { value: 'btp', label: "Construction" },
        { value: 'secteur_public', label: "Secteur public" },
        { value: 'hospital', label: "Secteur médical" }
      ]
    },
    {
      category: 'installation',
      question: "Quel type d infrastructure vous avez ?",
      options: [
        { value: 'rental', label: "Location de bureaux" },
        { value: 'public', label: "Batiments publiques" },
        { value: 'home', label: "Télétravail uniquement" },
        { value: 'hybride', label: "Batiment et télétravail autorisé" }
      ]
    },
  ];

  const currentQuestion = questions[step];

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Quick loop sur votre empreinte carbone
        </Typography>
        <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
          Estimation rapide en 5 questions (2 minutes)
        </Typography>

        {!result ? (
          <>
            <Stepper activeStep={step} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Divider sx={{ my: 3 }} />

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                {currentQuestion.question}
              </FormLabel>
              <RadioGroup
                value={answers[currentQuestion.category] || ''}
                onChange={(e) => handleAnswer(currentQuestion.category, e.target.value)}
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    sx={{ py: 0.5 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        ) : (
          <>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Chip 
                label={`${result.label} (${result.total.toLocaleString()} kg CO₂e/an)`}
                color={result.total < 4000 ? "success" : result.total < 8000 ? "primary" : "warning"}
                variant="filled"
                size="large"
                sx={{ fontSize: '1.2rem', px: 2 }}
              />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Votre empreinte : {result.percentage}% de la moyenne mondiale
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Moyenne mondiale : 12 tonnes CO₂e/personne/an
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                href="https://beavergineer.github.io/carbonlopp.github.io/" 
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<ArrowForward />}
                sx={{ mr: 2 }}
              >
                Calcul détaillé →
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setResult(null);
                }}
              >
                Refaire le test
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
