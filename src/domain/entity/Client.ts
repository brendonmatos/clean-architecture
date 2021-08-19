import Cpf from "./Cpf";

export interface IClient {
  cpf: string;
}

export class Client {
  cpf: Cpf;
  constructor(client: IClient) {
    this.cpf = new Cpf(client.cpf);
  }
}
