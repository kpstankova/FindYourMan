import { ServiceItem } from "../services-page/my-services.types";

export interface CartPageProps {
    itemsInCart: ServiceItem[];
}

export interface CartItemProps {
    cartItem: ServiceItem;
    removeItemFromCart: (data: number) => void;
}

export interface StripeCheckoutButtonProps {
    totalPrice: number;
    cartItems: ServiceItem[];
    clearCart: () => void;
}