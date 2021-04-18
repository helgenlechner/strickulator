import React, { useEffect } from 'react';
import { matomo } from '../../helpers/matomo';
import { MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { StoreProvider } from '../../store/store.provider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from '../menu/Menu';
import { Pattern } from '../pattern/Pattern';
import { ActiveStep } from '../activeStep/ActiveStep';
import { Header } from '../header/Header';
import { HomePage } from '../homePage/HomePage';
import styles from './App.module.css';

export const App = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <MatomoProvider value={matomo}>
      <StoreProvider>
        <BrowserRouter>
          <ActiveStep />
          <Header />
          <div className={styles.container}>
            <Menu />
            <div className={styles.mainContent}>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/projects/:projectId">
                  <Pattern />
                </Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </StoreProvider>
    </MatomoProvider>
  );
};
