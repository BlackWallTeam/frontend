import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TheMap } from './components/TheMap';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom'
import router from './router'
import store from './store';
import 'antd/dist/reset.css';


function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    </div>
  );
}

export default App;
