import React from 'react';
import {
  Box,
  Paper,
  Typography,
  MenuItem,
  Select
} from '@mui/material';
import { useCampaigns } from '../components/CampaignContext';
import { calculateROI, rate } from '../utils/campaignMetrics';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';
import KpiCard from '../components/kpiCard';
import AIInsightCard from '../components/AIInsightCard';
const CampaignPerformance: React.FC = () => {
  
  
  const listPerformance = [
    { name: 'Em Risco', conversion: 1.2 },
    { name: 'Novos Clientes', conversion: 2.1 },
    { name: 'Top Spenders', conversion: 4.4 },
    { name: 'Super Fans', conversion: 6.8 }
  ];
  
  const { campaigns, selectedCampaign, selectCampaign } = useCampaigns();
  
  const { metrics } = selectedCampaign;

  const funnelData = selectedCampaign.timeline;

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Performance de Campanhas
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select
            size="small"
            value={selectedCampaign.id}
            onChange={(e) => selectCampaign(e.target.value)}
          >
            {campaigns.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>

          <Select size="small" defaultValue="30">
            <MenuItem value="30">Últimos 30 dias</MenuItem>
            <MenuItem value="60">Últimos 60 dias</MenuItem>
            <MenuItem value="90">Últimos 90 dias</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* KPI GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(6, 1fr)' },
          gap: 2,
          mb: 4
        }}
      >
        <KpiCard title="Enviadas" value={metrics.enviado} subtitle="Mensagens disparadas" />
        <KpiCard title="Visualização" value={`${rate(metrics.visualizado, metrics.enviado)}%`} subtitle="Taxa de abertura" />
        <KpiCard title="CTR" value={`${rate(metrics.clicou, metrics.visualizado)}%`} subtitle="Cliques / visualizações" />
        <KpiCard title="Conversão" value={`${rate(metrics.convertido, metrics.clicou)}%`} subtitle="Pedidos gerados" />
        <KpiCard title="Receita" value={`R$ ${metrics.revenue.toLocaleString()}`} subtitle="Vendas atribuídas" />
        <KpiCard title="ROI" value={`${calculateROI(selectedCampaign)}x`} subtitle="Retorno da campanha" />
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '3fr 1.2fr' },
          gap: 3
        }}
      >
        {/* LEFT */}
        <Box>
          {/* FUNNEL CHART */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography fontWeight="bold" gutterBottom>
              Funil da Campanha
            </Typography>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={funnelData}>
                <defs>
                  <linearGradient id="colorenviado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <ReTooltip />
                <Area type="monotone" dataKey="enviado" stroke="#413ca4ff" fill="url(#colorenviado)" />
                <Area type="monotone" dataKey="visualizado" stroke="#266b40ff" fill="#82ca9eb9" />
                <Area type="monotone" dataKey="clicou" stroke="#825c12ff" fill="#ffc758b0" />
                <Area type="monotone" dataKey="convertido" stroke="#cd0202ff" fill="#ff5252c0" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>

          {/* PERFORMANCE POR LISTA */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" gutterBottom>
              Conversão por Lista
            </Typography>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={listPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip />
                <Bar dataKey="conversion" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* RIGHT */}
        <AIInsightCard />
      </Box>
    </Box>
  );
};

export default CampaignPerformance;
