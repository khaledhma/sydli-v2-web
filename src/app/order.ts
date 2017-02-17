import { ShoppingItem } from './shopping-cart/shopping-item';
import { Address } from './address';

export class Order {

  constructor(private orderSenderId: string,
              private senderAddress: Address,
              private orderTime: number,
              private orderStatus: string = 'pending',
              private orderAcceptedBy: string = 'none',
              private orderGeoArea: number = 0,
              private orderList: ShoppingItem[],
              private orderTotal: number,
              private orderPhotoUrl: string) {

  }

}
