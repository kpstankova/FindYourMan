import { ServiceItem } from "../../components/services-page/my-services.types";

export const addToCart = (itemsInCart: ServiceItem[], newItem: ServiceItem) => {
    if (!itemsInCart.find((item: ServiceItem) => item.service_id === newItem.service_id)) {
      const currentSubItems = itemsInCart.concat([newItem]);
      return currentSubItems;
    } else {
        return itemsInCart;
    }
}

export const removeFromCart = (itemsInCart: ServiceItem[], itemToRemoveId: number, currentPrice: number) => {
  const itemToRemove = itemsInCart.find((item: ServiceItem) => item.service_id === itemToRemoveId);
  if(itemToRemove) {
    return currentPrice - itemToRemove.price;
  } else {
    return 0;
  }
}