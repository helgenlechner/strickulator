import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import { projectEpics } from './project/project.epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['projects'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootEpic = combineEpics(...projectEpics);
const epicMiddleWare = createEpicMiddleware();

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(epicMiddleWare)),
  );
  let persistor = persistStore(store);

  epicMiddleWare.run(rootEpic);

  return { store, persistor };
};

export const StoreProvider: FunctionComponent = ({ children }) => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
