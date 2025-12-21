export const processChartData = (customers: any[]) => {
  const map = new Map();

  customers.forEach((c) => {
    // Pegando a data de 'customer_since' em vez de 'created_at'
    const rawDate = c.customer_since?.$date || c.customer_since;
    if (!rawDate) return;

    const dateStr = new Date(rawDate).toISOString().split('T')[0];

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
      ticketMedio: d.customersCount > 0 ? Number((d.totalValue / d.customersCount).toFixed(2)) : 0
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};