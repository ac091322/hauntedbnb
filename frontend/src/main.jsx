import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider, Modal } from './context/Modal';
import { SkeletonTheme } from 'react-loading-skeleton';
import ThemeProvider from './context/Theme';
import './index.css';


const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}
// in browser console: window.store
// in browser console: window.store.getState()
// in browser console: window.session


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ModalProvider>
      <Provider store={store}>
        <SkeletonTheme baseColor="var(--skeleton-base-color)" highlightColor="var(--skeleton-highlight-color)">
          <ThemeProvider>
            <App />
            <Modal />
          </ThemeProvider>
        </SkeletonTheme>
      </Provider>
    </ModalProvider>

  </React.StrictMode>
);
