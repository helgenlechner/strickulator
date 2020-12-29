import { createInstance } from '@datapunt/matomo-tracker-react';

export const matomo = createInstance({
  urlBase: '//analytics.helgenlechner.com',
  siteId: 2,
  trackerUrl: '//analytics.helgenlechner.com/matomo.php',
});
