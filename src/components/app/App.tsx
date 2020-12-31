import React, { useEffect } from 'react';
import { matomo } from '../../helpers/matomo';
import { MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { StoreProvider } from '../../store/store.provider';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Project } from '../project/Project';

export const App = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({});
  }, [trackPageView]);

  return (
    <MatomoProvider value={matomo}>
      <StoreProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/projects/0" />
            </Route>
            <Route path="/projects/:projectId" children={<Project />} />
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    </MatomoProvider>
  );
};
