import React, { useEffect } from 'react';
import { matomo } from '../../helpers/matomo';
import { MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { StoreProvider } from '../../store/store.provider';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from '../menu/Menu';
import { Pattern } from '../pattern/Pattern';
import { ActiveStep } from '../activeStep/ActiveStep';
import { Header } from '../header/Header';

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
          <Menu />
          <div>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/projects/0" />
              </Route>
              <Route path="/projects/:projectId" children={<Pattern />} />
            </Switch>
          </div>
        </BrowserRouter>
      </StoreProvider>
    </MatomoProvider>
  );
};
