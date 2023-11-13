import './App.css';
import React from 'react';
import { Provider } from 'mobx-react';
import itemsStore from './itemsStore';
import ShoppingList from './components/shoppingList';

function App() {
  return (
    <div className="App">
      <div>
        <Provider itemsStore={itemsStore}>
          <ShoppingList />
        </Provider>
      </div>
    </div>
  );
}

export default App;
