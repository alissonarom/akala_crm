import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export function CustomerTrendChart({ data }: { data: any[] }) {
    const [timeRange, setTimeRange] = React.useState("90d");

    const filteredData = React.useMemo(() => {
        const referenceDate = new Date();
        let daysToSubtract = 90;
        
        if (timeRange === "365d") daysToSubtract = 365;
        else if (timeRange === "180d") daysToSubtract = 180;
        else if (timeRange === "30d") daysToSubtract = 30;
        else if (timeRange === "7d") daysToSubtract = 7;

        const startDate = new Date();
        startDate.setDate(referenceDate.getDate() - daysToSubtract);
        
        return data.filter((item) => new Date(item.date) >= startDate);
    }, [data, timeRange]);

    return (
        <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 1 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Crescimento e Performance</Typography>
                    <Typography variant="body2" color="text.secondary">Análise de aquisição de clientes vs. gasto médio</Typography>
                </Box>
                
                <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="time-range-label">Período de Análise</InputLabel>
                <Select
                    labelId="time-range-label"
                    value={timeRange}
                    label="Período de Análise" // Importante para o MUI "abrir" o espaço na borda para o label
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ borderRadius: 2 }}
                >
                    <MenuItem value="7d">Últimos 7 dias</MenuItem>
                    <MenuItem value="30d">Últimos 30 dias</MenuItem>
                    <MenuItem value="90d">Últimos 3 meses</MenuItem>
                    <MenuItem value="180d">Últimos 6 meses</MenuItem>
                    <MenuItem value="365d">Último Ano</MenuItem>
                </Select>
            </FormControl>
            </Box>

            <CardContent sx={{ pt: 4 }}>
                <Box sx={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                                axisLine={false}
                                tickLine={false}
                                tickMargin={10}
                                tickFormatter={(str) => new Date(str).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
                                fontSize={12}
                            />
                            <YAxis axisLine={false} tickLine={false} fontSize={12} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                            />
                            <Legend verticalAlign="top" height={36}/>
                            <Area 
                                name="Novos Clientes"
                                type="monotone" 
                                dataKey="clientes" 
                                stroke="#1976d2" 
                                fillOpacity={1} 
                                fill="url(#colorClientes)" 
                                strokeWidth={2}
                            />
                            <Area 
                                name="Ticket Médio (R$)"
                                type="monotone" 
                                dataKey="ticketMedio" 
                                stroke="#2e7d32" 
                                fillOpacity={1} 
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