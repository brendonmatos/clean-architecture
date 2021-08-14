
import _ from "lodash";
import {Product} from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";
import DatabaseSQL from "../../database/DatabaseSQL";


const FORMAT_INDEX_SIZE = 8

const formatUnique = (year, index: number) => {
    return `${year}${index.toString().padStart(FORMAT_INDEX_SIZE, '0')}`
}

export default class ProductRepositorySqlite implements ProductRepository {
    database: DatabaseSQL;

    constructor(database: DatabaseSQL) {
        this.database = database
    }

    async getById(id: string): Promise<Product | undefined>{
        return this.database.one("select * from product where id = ?", [id])
    }

    async save(product: Product): Promise<Product>{
        return this.database.one("insert into product (id, clientCpf, date) values (?, ?, ?)", [product.id, product.client.cpf, product.date])
    }
}
