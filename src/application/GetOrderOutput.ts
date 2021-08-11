export default interface GetOrderOutput {
    id: string;
    clientCPF: string;
    deliveryCEP: string | undefined;
    items: {price: number, quantity: number}[];
    discount: number;
    freightTotal: number;
    total: number;
}