import { FunctionComponent } from 'react';
import { AreaContext } from '../../context/area.context';

interface Props {
  id: string;
}

export const Directions: FunctionComponent<Props> = ({ children, id }) => (
  <AreaContext.Provider value={id}>
    <ol type="A">{children}</ol>
  </AreaContext.Provider>
);
