import React from 'react';
import { Box, Typography, Paper, Chip, Button, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';

interface CustomerList {
    id: string;
    name: string;
    description: string;
    count: number;
    tags: string[];
    icon: React.ReactNode;
    color: string;
}

const mockLists: CustomerList[] = [
    {
        id: '1',
        name: 'Top Spenders',
        description: 'Clientes com ticket médio acima de R$ 100',
        count: 24,
        tags: ['vip', 'lucrativo'],
        icon: <TrendingUpIcon />,
        color: 'success.main'
    },
    {
        id: '2',
        name: 'Novos Clientes',
        description: 'Cadastrados nos últimos 7 dias',
        count: 12,
        tags: ['novo', 'onboarding'],
        icon: <GroupIcon />,
        color: 'info.main'
    },
    {
        id: '3',
        name: 'Em Risco',
        description: 'Sem pedidos há mais de 30 dias',
        count: 8,
        tags: ['sumido', 'churn-risk'],
        icon: <WarningIcon />,
        color: 'warning.main'
    }
];

const Lists: React.FC = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Listas de Segmentação
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Nova Lista
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fill, minmax(300px, 1fr))' }, gap: 3 }}>
                {mockLists.map((list) => (
                    <Paper key={list.id} sx={{ p: 3, position: 'relative', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <IconButton sx={{ position: 'absolute', top: 12, right: 12 }}>
                            <MoreVertIcon />
                        </IconButton>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${list.color}15`, color: list.color }}>
                                {list.icon}
                            </Box>
                            <Typography variant="h6" fontWeight="bold">
                                {list.name}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                            {list.description}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {list.tags.map(tag => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                ))}
                            </Box>
                            <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                                {list.count} clientes
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default Lists;
