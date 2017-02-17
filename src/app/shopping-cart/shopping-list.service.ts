import { Injectable, EventEmitter } from '@angular/core';

import { ShoppingItem } from './shopping-item';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ShoppingListService {

  private shoppingList: ShoppingItem[] = [];
  public ItemsCount = new EventEmitter<number>();

  constructor(private authService: AuthenticationService) { }

  getCurrentItemsCount(): number {
    return this.shoppingList.length;
  };

  updateItemsCount() {
    this.ItemsCount.emit(this.shoppingList.length);
  };

  getList(uId: string): ShoppingItem[] {
    this.shoppingList = this.restoreFromLocalStorage(uId);
    this.updateItemsCount();
    return this.shoppingList;
  };

  deleteList(uId: string) {
    this.shoppingList = [];
    this.updateItemsCount();
    this.removeFromLocalStorage(uId);
  };

  addItem(item: ShoppingItem, uId: string) {
    let exist = false;
    let index = -1;
    if (this.getCurrentItemsCount() > 0) {
      for (let i = 0; i < this.getCurrentItemsCount(); i++) {
        if (this.shoppingList[i]['medecineId'] == item['medecineId']) {
          exist = true;
          index = i;
        }
      }
    }
    if (exist) {
      this.incrementItem(this.shoppingList[index], uId);
    } else {
      this.shoppingList.push(item);
    }
    this.updateItemsCount();
    this.storeToLocalStorage(this.shoppingList, uId);
  };

  removeItem(item: ShoppingItem, uId: string) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    this.updateItemsCount();
    this.storeToLocalStorage(this.shoppingList, uId);
    if (this.getCurrentItemsCount() === 0) {
      this.removeFromLocalStorage(uId);
    }
  };

  editItem(newitem: ShoppingItem, olditem: ShoppingItem, uId: string) {
    this.shoppingList[this.shoppingList.indexOf(olditem)] = newitem;
    this.updateItemsCount();
    this.storeToLocalStorage(this.shoppingList, uId);
  };

  incrementItem(item: ShoppingItem, uId: string) {
    let item2: ShoppingItem = this.shoppingList[this.shoppingList.indexOf(item)];
    item2['medecineQty']++;
    this.editItem(item2, item, uId);
  };

  decrementItem(item: ShoppingItem, uId: string) {
    let item2: ShoppingItem = this.shoppingList[this.shoppingList.indexOf(item)];
    item2['medecineQty']--;
    this.editItem(item2, item, uId);
  };

  storeToLocalStorage(list: ShoppingItem[], uId: string) {
    let dataToStore = { 'uid': uId, 'shoppingList': list };
    localStorage.setItem('shoppingList_'+uId, JSON.stringify(dataToStore));
  };

  restoreFromLocalStorage(uId: string): ShoppingItem[] {
    if (localStorage.getItem('shoppingList_'+uId) !== null) {
      let data = JSON.parse(localStorage.getItem('shoppingList_'+uId));
      let userId = data.uid;
      if (uId == userId) {
        return data.shoppingList;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  removeFromLocalStorage(uId: string) {
    if (localStorage.getItem('shoppingList_'+uId) !== null) {
      let data = JSON.parse(localStorage.getItem('shoppingList_'+uId));
      let userId = data.uid;
      if (uId == userId) {
        localStorage.removeItem('shoppingList_'+uId);
      }
    }
  };


}
