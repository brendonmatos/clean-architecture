export default interface GetOrderOutput {
  code: string;
  clientCPF: string;
  deliveryCEP: string | undefined;
  items: { price: number; quantity: number }[];
  discount: number;
  freightTotal: number;
  total: number;
}
