export type mealInOrder = { mealId: string; amount: number };

export interface Order {
  id: string;
  userId: string;
  meals: mealInOrder[];
  total: number;
}
