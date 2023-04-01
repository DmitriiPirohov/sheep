import React from 'react';
import Box from '@mui/material/Box';

import { useTranslation } from "react-i18next";

export const Zaglushka = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 5 }}>
      <h2>{t('Enter')}</h2>
    </Box>
  );
};
