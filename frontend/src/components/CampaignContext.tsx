import React, { createContext, useContext, useState } from 'react';
import { campaignsMock } from '../mocks/campaignsMock';
import { type Campaign } from '../types/Campaign';

interface CampaignContextProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign;
  selectCampaign: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextProps>(
  {} as CampaignContextProps
);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns] = useState(campaignsMock);
  const [selectedId, setSelectedId] = useState(campaignsMock[0].id);

  const selectedCampaign =
    campaigns.find(c => c.id === selectedId) || campaigns[0];

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        selectedCampaign,
        selectCampaign: setSelectedId
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);
