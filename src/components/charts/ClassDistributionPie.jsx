import * as React from "react";
import { Typography, Box } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


// Pourcentages fixes des scopes (en %)
const scopePercentages = {
  scope1: 10,   // 10 %
  scope2: 15,   // 15 %
  scope3: 75,   // 65 %
};

// Couleurs par scope
const mainClassBaseColors = {
  'Scope 1': '#5e8b7e', // Dark teal
  'Scope 2': '#a7c957', // Light green
  'Scope 3': '#f28f3b', // Orange
};

// Construit les données principales (scopes) avec leurs vrais pourcentages
const buildMainData = () => {
  const labels = ['Scope 1', 'Scope 2', 'Scope 3'];
  let total = 0;

  const mainClassData = labels.map((label, i) => {
    const value = scopePercentages[`scope${i + 1}`];
    total += value;
    const id = label.replace(/\s/g, '-').toLowerCase();
    const color = mainClassBaseColors[label] || '#cccccc';

    return {
      id,
      label,
      value,
      color,
    };
  });

  return { mainClassData, total };
};


// Construit les sous‑catégories (ex. : sub‑scopes) par scope
const buildSubCategories = (mainClassData) => {
  const subCategoryData = [];
  const subCategoriesPerClass = 3;

  mainClassData.forEach((mainItem) => {
    const mainValue = mainItem.value;
    let subtotal = 0;
    const subItems = [];

    for (let i = 0; i < subCategoriesPerClass; i++) {
      const value = Math.max(1, Math.floor((mainValue / subCategoriesPerClass) * (0.7 + i * 0.1))); // répartition raisonnable
      subtotal += value;

      const subId = `${mainItem.id}-${i}`;
      const subColor = mainItem.color; // même couleur, plus légère possible

      subItems.push({ id: subId, value, color: subColor, parentId: mainItem.id });
    }

    // Ajuste la dernière sous‑catégorie pour tomber exactement sur mainValue
    if (subtotal !== mainValue && subItems.length > 0) {
      const diff = mainValue - subtotal;
      const last = subItems[subItems.length - 1];
      last.value += diff;
    }

    subCategoryData.push(...subItems);
  });

  return subCategoryData;
};


const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}


export default function ClassDistributionPie() {
  const { mainClassData, total } = React.useMemo(buildMainData, []);
  const subCategoryData = React.useMemo(
    () => buildSubCategories(mainClassData),
    [mainClassData]
  );

  const innerRadius1 = 50;
  const outerRadius1 = 100;
  const innerRadius2 = outerRadius1;
  const outerRadius2 = innerRadius2 + 30;

  return (
    <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Répartition des émissions par scope
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', height: 400 }}>
        <PieChart
          series={[
            // 1er anneau : Scope 1, 2, 3 avec leurs vrais % (10, 15, 65)
            {
              innerRadius: innerRadius1,
              outerRadius: outerRadius1,
              data: mainClassData.map((item) => {
                const percentage = (item.value / total) * 100;
                return {
                  ...item,
                  percentage,
                };
              }),
              arcLabel: (item) =>
                `${item.label} (${item.percentage.toFixed(0)}%)`,
              valueFormatter: (item) =>
                `${item.value.toFixed(1)} % du total`,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlight: { additionalRadius: 5 },
              cornerRadius: 5,
              paddingAngle: 1,
            },
            // 2ème anneau : sous‑catégories par scope
            {
              innerRadius: innerRadius2 + 2,
              outerRadius: outerRadius2,
              data: subCategoryData.map((item) => {
                const parent = mainClassData.find((d) => d.id === item.parentId);
                const percentage = parent ? (item.value / parent.value) * 100 : 0;
                return {
                  ...item,
                  percentage,
                };
              }),
              arcLabel: (item) =>
                `${item.value.toFixed(0)}%`,
              valueFormatter: (item) => {
                const parent = mainClassData.find(d => d.id === item.parentId);
                const parentLabel = parent ? parent.label : 'Scope';
                return `${item.value.toFixed(1)}% de ${parentLabel}`;
              },
              arcLabelRadius: outerRadius2 + 20,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlight: { additionalRadius: 5 },
              cornerRadius: 5,
              paddingAngle: 1,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: '11px',
            },
          }}
          hideLegend
        >
          <PieCenterLabel>Scopes</PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}
