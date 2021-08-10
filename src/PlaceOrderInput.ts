export interface PlaceOrderInput {
    cep: string;
    client: { cpf: string };
    entries: {productId: string, quantity: number}[];
    coupons: string[];
}