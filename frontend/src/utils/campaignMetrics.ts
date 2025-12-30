import { type Campaign } from '../types/Campaign';

export const calculateROI = (campaign: Campaign) => {
  const { revenue, cost } = campaign.metrics;
  return ((revenue - cost) / cost).toFixed(2);
};

export const rate = (value: number, total: number) =>
  total === 0 ? 0 : ((value / total) * 100).toFixed(1);
