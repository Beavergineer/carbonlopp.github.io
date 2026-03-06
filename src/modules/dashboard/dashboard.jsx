import { Box, Typography } from '@mui/material';
import ClassDistributionPie from '../../components/charts/ClassDistributionPie'; 

export default function Dashboard() {
  return (
      <Box sx={{ width: '100%' , p: 4 }}>
      {/* Explanatory box for ACV and carbon footprint */}
        <Box sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }} >
          <Typography variant="h5" gutterBottom>
            ACV & Empreinte Carbone
          </Typography>
          <Typography variant="body1" paragraph>
            L’Analyse du Cycle de Vie (ACV) permet d’évaluer l’impact environnemental d’un produit ou service
            sur l’ensemble de sa vie (matières premières, production, transport, usage, fin de vie).
          </Typography>
          <Typography variant="body1">
            Le but de cet indicateur d’empreinte carbone est de visualiser la contribution de chaque scope
            (Scope 1, 2, 3) aux émissions de gaz à effet de serre, afin de cibler les actions de réduction.
          </Typography>
        </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 2 }} >
            {/* 2.2 RIGHT: pie chart */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }} >
              <ClassDistributionPie />
            </Box>
        {/* 2.1 LEFT: explanation of the scopes */}
            <Box sx={{ flex: 1, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }} >
              <Typography variant="h6" gutterBottom>
                Les scopes d’émissions
              </Typography>
              <Typography variant="body2" component="div">
                <ul>
                  <li>
                    <strong>Scope 1</strong>: émissions directes (combustion, process industriels, etc.).
                  </li>
                  <li>
                    <strong>Scope 2</strong>: émissions indirectes liées à l’énergie achetée (électricité, chaleur, vapeur).
                  </li>
                  <li>
                    <strong>Scope 3</strong>: autres émissions indirectes de la chaîne de valeur (logistique, déchets, produits, etc.).
                  </li>
                </ul>
              </Typography>
            </Box>
          </Box>
      </Box>
  );
}