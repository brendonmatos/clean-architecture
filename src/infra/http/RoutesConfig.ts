
import GetOrder from "../../application/GetOrder";
import PlaceOrder from "../../application/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import GeoProviderMemory from "../../infra/gateway/memory/GeoProviderMemory";
import Http from "./Http";

export default class RoutesConfig {
    http: Http;
    repositoryFactory: RepositoryFactory;

    constructor (http: Http, repositoryFactory: RepositoryFactory) {
        this.http = http;
        this.repositoryFactory = repositoryFactory;
    }

    build () {
        this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
            const getOrder = new GetOrder(this.repositoryFactory);
            const order = await getOrder.execute(params.code);
            return order;
        });

        this.http.on("post", "/orders", async (params: any, body: any) => {
            const placeOrder = new PlaceOrder(this.repositoryFactory, new GeoProviderMemory());
            const order = await placeOrder.execute(body);
            return order;
        });
    }
}
