export type mealInOrder = { mealId: string; amount: number };

export interface Order {
  id: string;
  userId: string;
  meals: mealInOrder[];
  total: number;
  status: statusOrder;
  orderDate: Date;
}

export enum statusOrder {
  processing = "processing",
  shipped = "shipped",
  cancelled = "cancelled",
  completed = "completed",
}
