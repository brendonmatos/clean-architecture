export default interface GetOrderOutput {
  code: string;
  freight: number;
  total: number;
  orderItems: { itemName: string; price: number; quantity: number }[];
}
