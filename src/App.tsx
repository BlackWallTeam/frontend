import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TheMap } from './components/TheMap';
import {Provider} from 'react-redux'
import store from './store';
import 'antd/dist/reset.css';


function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <TheMap />
            <Sidebar />
        </Provider>
    </div>
  );
}

export default App;
