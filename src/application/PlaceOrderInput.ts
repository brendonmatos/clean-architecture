export interface PlaceOrderInput {
  cep: string;
  client: { cpf: string };
  date: Date;
  entries: { productId: string; quantity: number }[];
  coupons: string[];
}
