import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export function CustomerTrendChart({ data }: { data: any[] }) {
    const [timeRange, setTimeRange] = React.useState("90d");

    // 1. Filtramos e garantimos a ORDENAÇÃO das datas (essencial para Recharts)
    const filteredData = React.useMemo(() => {
        const referenceDate = new Date();
        let daysToSubtract = 90;
        
        if (timeRange === "365d") daysToSubtract = 365;
        else if (timeRange === "180d") daysToSubtract = 180;
        else if (timeRange === "30d") daysToSubtract = 30;
        else if (timeRange === "7d") daysToSubtract = 7;

        const startDate = new Date();
        startDate.setDate(referenceDate.getDate() - daysToSubtract);
        
        return [...data]
            .filter((item) => new Date(item.date) >= startDate)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data, timeRange]);
    console.log(filteredData)

    return (
        <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 1 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Crescimento e Performance</Typography>
                    <Typography variant="body2" color="text.secondary">Clientes (Esq.) vs Ticket Médio (Dir.)</Typography>
                </Box>
                
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="range-label">Período</InputLabel>
                    <Select
                        labelId="range-label"
                        value={timeRange}
                        label="Período"
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <MenuItem value="7d">Últimos 7 dias</MenuItem>
                        <MenuItem value="30d">Últimos 30 dias</MenuItem>
                        <MenuItem value="90d">Últimos 3 meses</MenuItem>
                        <MenuItem value="365d">Último Ano</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <CardContent sx={{ pt: 4 }}>
                <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorTicket" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                            
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(str) => new Date(str).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
                                minTickGap={30}
                                fontSize={12}
                            />
                            
                            {/* Eixo Y Esquerdo: Clientes */}
                            <YAxis yAxisId="left" orientation="left" stroke="#1976d2" fontSize={12} />
                            
                            {/* Eixo Y Direito: Dinheiro (Ticket Médio) */}
                            <YAxis yAxisId="right" orientation="right" stroke="#2e7d32" fontSize={12} tickFormatter={(val) => `R$${val}`} />
                            
                            <Tooltip 
                                labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                            />
                            <Legend verticalAlign="top" height={36}/>

                            <Area 
                                yAxisId="left"
                                name="Novos Clientes"
                                type="monotone" 
                                dataKey="clientes" 
                                stroke="#1976d2" 
                                fill="url(#colorClientes)" 
                                strokeWidth={2}
                            />
                            <Area 
                                yAxisId="right"
                                name="Ticket Médio (R$)"
                                type="monotone" 
                                dataKey="ticketMedio" 
                                stroke="#2e7d32" 
                                fill="url(#colorTicket)" 
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}