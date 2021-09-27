
import DatabaseSQLRepositoryFactory from "./infra/factory/DatabaseSQLRepositoryFactory";
import ExpressHttp from "./infra/http/ExpressHttp";
import HapiHttp from "./infra/http/HapiHttp"
import RoutesConfig from "./infra/http/RoutesConfig";

const http = new ExpressHttp();
// const http = new HapiHttp();
const repositoryFactory = new DatabaseSQLRepositoryFactory();
const routesConfig = new RoutesConfig(http, repositoryFactory);
routesConfig.build();
http.listen(3000);