import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from "framer-motion";


interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtitle }) => {
  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -4 }}
      sx={{
        p: 3,
        borderRadius: 3,
        height: '100%',
        cursor: 'default',
        textAlign: 'center'
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
        {value}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Paper>
  );
};

export default KpiCard;
