export const processChartData = (customers: any[]) => {
  const map = new Map();

  customers.forEach((c) => {
    // Tratando o formato $date do MongoDB
    const dateStr = c.created_at?.$date 
      ? c.created_at.$date.split('T')[0] 
      : new Date(c.created_at).toISOString().split('T')[0];

    if (!map.has(dateStr)) {
      map.set(dateStr, { date: dateStr, customersCount: 0, totalValue: 0 });
    }

    const dayData = map.get(dateStr);
    dayData.customersCount += 1;
    dayData.totalValue += (c.consumption || 0);
  });

  return Array.from(map.values())
    .map(d => ({
      date: d.date,
      clientes: d.customersCount,
      ticketMedio: d.customersCount > 0 ? d.totalValue / d.customersCount : 0
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};