import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import ProductsService from './services/productsService';

class ItemStore {
  totalItems = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTotalItems() {
    ProductsService.getProductsCount()
      .then(response => {
        this.totalItems = response.data.productsCount;
      })
      .catch(e => {
        console.log(e);
      });
  }
}

const itemStore = new ItemStore();

const StoreContext = createContext(itemStore);

export const useStore = () => useContext(StoreContext);

export default itemStore;