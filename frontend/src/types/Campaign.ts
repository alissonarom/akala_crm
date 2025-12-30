export interface CampaignMetrics {
  enviado: number;
  viewed: number;
  clicou: number;
  converted: number;
  revenue: number;
  cost: number;
}

export interface CampaignPeriodMetrics {
  period: string; // ex: "2024-01"
  enviado: number;
  viewed: number;
  clicou: number;
  converted: number;
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
