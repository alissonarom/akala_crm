import { Paper, Chip, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";


const AIInsightCard: React.FC = () => (
  <Paper
    component={motion.div}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    sx={{
      p: 3,
      borderRadius: 3,
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: '#fff'
    }}
  >
    <Chip
      label="Insight IA"
      size="small"
      sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }}
    />

    <Typography variant="h6" fontWeight="bold" gutterBottom>
      Desempenho abaixo do potencial
    </Typography>

    <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
      A campanha gerou alto volume de visualizações, porém converteu abaixo da
      média histórica, indicando falha na oferta ou no CTA.
    </Typography>

    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

    <Typography variant="subtitle2" gutterBottom>
      Próximos passos recomendados
    </Typography>

    <ul style={{ margin: 0, paddingLeft: 16, opacity: 0.9 }}>
      <li>Replicar campanha apenas para Super Fans</li>
      <li>Testar oferta direta com desconto fixo</li>
      <li>Reduzir texto e CTA para pedido imediato</li>
    </ul>
  </Paper>
);

export default AIInsightCard;