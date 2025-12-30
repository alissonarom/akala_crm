export interface CampaignMetrics {
  enviado: number;
  visualizado: number;
  clicou: number;
  convertido: number;
  revenue: number;
  cost: number;
}

export interface CampaignPeriodMetrics {
  period: string; // ex: "2024-01"
  enviado: number;
  visualizado: number;
  clicou: number;
  convertido: number;
}

export interface Campaign {
  id: string;
  name: string;
  listId: string;
  listName: string;
  startDate: string;
  endDate: string;
  metrics: CampaignMetrics;
  timeline: CampaignPeriodMetrics[];
}
