import ReactDOM from 'react-dom/client';
import App from './App';
import React, { Suspense } from 'react';

// store
import { Provider } from 'react-redux';
import store from "store";

// react-query library
import { QueryClient, QueryClientProvider } from "react-query";
// css
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/index.css";


  // setup query client (react-query)
  const queryClient = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
          <Suspense fallback="loading...">  
            <App />
          </Suspense>
        </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

