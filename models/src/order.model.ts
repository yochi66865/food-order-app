export type mealInOrder = { mealId: string; amount: number };

export interface OrderInput {
  userId: string;
  meals: mealInOrder[];
  total: number;
  status: statusOrder;
  orderDate: Date;
}
export interface Order extends OrderInput {
  id: string;
}

export enum statusOrder {
  processing = "processing",
  shipped = "shipped",
  cancelled = "cancelled",
  completed = "completed",
}
