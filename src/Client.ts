

interface IClient {cpf: string}

export class Client implements IClient {
    cpf: string;
    constructor( client: IClient ) {
        this.cpf = client.cpf;
    }
}