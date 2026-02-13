import { type Campaign } from '../types/Campaign';

export const campaignsMock: Campaign[] = [
  {
    id: 'cmp-001',
    name: 'Campanha Carna āKala 2026',
    listId: 'em-risco',
    listName: 'Em Risco',
    startDate: '2024-02-12',
    endDate: '2024-02-17',
    metrics: {
      enviado: 50,
      visualizado: 0,
      clicou: 0,
      convertido: 0,
      revenue: 0,
      cost: 0
    },
    timeline: [
      { period: 'Dia 1', enviado: 50, visualizado: 0, clicou: 0, convertido: 0 },
      { period: 'Dia 2', enviado: 0, visualizado: 0, clicou: 0, convertido: 0 },
      { period: 'Dia 3', enviado: 0, visualizado: 0, clicou: 0, convertido: 0 },
      { period: 'Dia 4', enviado: 0, visualizado: 0, clicou: 0, convertido: 0 },
      { period: 'Dia 5', enviado: 0, visualizado: 0, clicou: 0, convertido: 0 }
    ]
  },

  // {
  //   id: 'cmp-002',
  //   name: 'Oferta VIP Super Fans',
  //   listId: 'super-fans',
  //   listName: 'Super Fans',
  //   startDate: '2024-02-01',
  //   endDate: '2024-02-15',
  //   metrics: {
  //     enviado: 980,
  //     visualizado: 740,
  //     clicou: 360,
  //     convertido: 180,
  //     revenue: 25600,
  //     cost: 1100
  //   },
  //   timeline: [
  //     { period: 'Semana 1', enviado: 480, visualizado: 360, clicou: 180, convertido: 92 },
  //     { period: 'Semana 2', enviado: 500, visualizado: 380, clicou: 180, convertido: 88 }
  //   ]
  // }
];
