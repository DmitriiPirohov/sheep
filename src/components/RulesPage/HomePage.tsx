import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <h1>{t('Rules').split('*')[0]}</h1>

          <span>{t('Rules').split('*')[1]}</span>

          <br />
          <span>user: admin</span>
          <br />
          <span>password: admin</span>
        </Container>
      </React.Fragment>
    </>
  );
};
