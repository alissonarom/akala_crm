import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Slider, Stack, InputAdornment, TextField } from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import CustomerPopup from '../components/CustomerPopup';
import { useCustomers } from '../components/CustomerContext';

const Customers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { customers, loading, error } = useCustomers();
  const [scoreRange, setScoreRange] = React.useState<number[]>([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
    
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'whatsapp', headerName: 'WhatsApp', width: 150 },
    { field: 'total_orders', headerName: 'Pedidos', type: 'number', width: 100 },
    { field: 'total_visits', headerName: 'Visitas', type: 'number', width: 100 },
    {
      field: 'average_ticket',
      headerName: 'Ticket Médio',
      width: 130,
      renderCell: (params: GridRenderCellParams) => `R$ ${params.value.toFixed(2)}`
    },
    {
      field: 'lead_score',
      headerName: 'Score',
      type: 'number',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight="bold" color={params.value > 80 ? 'primary.main' : 'text.primary'}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5, overflow: 'hidden' }}>
          {params.value.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      )
    },
  ];

  if (loading) {
    return <div>Carregando clientes...</div>; // Renderização de loading rápido
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  
  if (customers.length === 0) {
    return <div>Nenhum cliente encontrado.</div>;
  }

  const filteredRows = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
  return customers.filter(c => {
    const matchesSearch = 
      c.name?.toLowerCase().includes(lowerTerm) || 
      c.email?.toLowerCase().includes(lowerTerm) ||
      c.whatsapp?.includes(searchTerm);

    const matchesScore = (c.lead_score >= scoreRange[0] && c.lead_score <= scoreRange[1]);

            return matchesSearch && matchesScore;
        });
    }, [customers, searchTerm, scoreRange]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Clientes
      </Typography>
<Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                    
                    {/* Input de Busca por Texto */}
                    <TextField
                        placeholder="Buscar por nome, email ou whats..."
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Slider de Lead Score */}
                    <Box sx={{ minWidth: 250 }}>
                        <Typography variant="caption" color="text.secondary">
                            Lead Score: {scoreRange[0]} - {scoreRange[1]}
                        </Typography>
                        <Slider
                            value={scoreRange}
                            onChange={(_, newValue) => setScoreRange(newValue as number[])}
                            valueLabelDisplay="auto"
                            size="small"
                        />
                    </Box>

                    {/* Contador de Resultados */}
                    <Chip 
                        label={`${filteredRows.length} encontrados`} 
                        color="primary" 
                        variant="outlined" 
                        sx={{ fontWeight: 'bold' }}
                    />
                </Stack>
            </Paper>
      <Box sx={{ height: 650, width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 50 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          onRowClick={(params) => setSelectedCustomer(params.row)}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
          }}
        />
      </Box>

      <CustomerPopup
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </Box>
  );
};

export default Customers;
