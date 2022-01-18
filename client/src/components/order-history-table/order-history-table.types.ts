import { ServiceItem } from "../services-page/my-services.types";

export interface OrderHistoryTableItemProps {
    orderItem: OrderItem;
}

export interface OrderItem {
    order_id: number;
    service: ServiceItem;
}