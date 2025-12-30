import { type Campaign } from '../types/Campaign';

export const campaignsMock: Campaign[] = [
  {
    id: 'cmp-001',
    name: 'Reativação Inativos 30 Dias',
    listId: 'em-risco',
    listName: 'Em Risco',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    metrics: {
      enviado: 4200,
      visualizado: 2650,
      clicou: 560,
      convertido: 130,
      revenue: 18450,
      cost: 3400
    },
    timeline: [
      { period: 'Semana 1', enviado: 1200, visualizado: 820, clicou: 160, convertido: 38 },
      { period: 'Semana 2', enviado: 1400, visualizado: 900, clicou: 190, convertido: 42 },
      { period: 'Semana 3', enviado: 1600, visualizado: 930, clicou: 210, convertido: 50 }
    ]
  },

  {
    id: 'cmp-002',
    name: 'Oferta VIP Super Fans',
    listId: 'super-fans',
    listName: 'Super Fans',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    metrics: {
      enviado: 980,
      visualizado: 740,
      clicou: 360,
      convertido: 180,
      revenue: 25600,
      cost: 1100
    },
    timeline: [
      { period: 'Semana 1', enviado: 480, visualizado: 360, clicou: 180, convertido: 92 },
      { period: 'Semana 2', enviado: 500, visualizado: 380, clicou: 180, convertido: 88 }
    ]
  }
];
