import { Box, Paper, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, subtitle, delay }: any) => (
    <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
            {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {subtitle}
        </Typography>
    </Paper>
);

const Dashboard: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Overview
            </Typography>

            {/* Main Layout */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>

                {/* Metrics Column */}
                <Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
                        {/* Row 1 */}
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Total de Clientes" value="1,245" subtitle="Clientes ativos" delay={0.1} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Novos Clientes" value="+48" subtitle="Últimos 7 dias" delay={0.2} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Faturamento" value="R$ 45.2k" subtitle="Este mês" delay={0.3} />
                        </Box>

                        {/* Row 2 */}
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '50%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Tempo Médio" value="12.5 dias" subtitle="Entre pedidos" delay={0.4} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '50%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Ticket Médio" value="R$ 85.50" subtitle="Por pedido" delay={0.5} />
                        </Box>
                    </Box>
                </Box>

                {/* Top Customers Column */}
                <Box>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Top Clientes</Typography>
                        {/* Mock List */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="subtitle2">Cliente VIP {i}</Typography>
                                    <Typography variant="caption" color="text.secondary">Leadscore: {100 - i * 5}</Typography>
                                </Box>
                                <Chip label="top10" size="small" color="primary" variant="outlined" />
                            </Box>
                        ))}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
