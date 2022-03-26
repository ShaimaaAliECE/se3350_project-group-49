import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WithAxios from './Interceptors/authAxios'
import {UserProvider} from './Context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <WithAxios>
        <App />
      </WithAxios>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
