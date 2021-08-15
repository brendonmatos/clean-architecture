import GetOrder from "../../src/application/GetOrder"
import GetOrderInput from "../../src/application/GetOrderInput"
import PlaceOrder from "../../src/application/PlaceOrder"
import { PlaceOrderInput } from "../../src/application/PlaceOrderInput"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import GeoProviderMemory from "../../src/infra/gateway/memory/GeoProviderMemory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"
import DatabaseSqlite from "../../src/infra/database/DatabaseSqlite"
import ProductRepositorySqlite from "../../src/infra/repository/sqlite/ProductRepositorySqlite"
import { Product } from "../../src/domain/entity/Product"

const databaseSqlite = new DatabaseSqlite("./database.sqlite")

beforeAll(async () => {
    await databaseSqlite.connect()

    await databaseSqlite.db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS clients;
    CREATE TABLE clients (cpf TEXT PRIMARY KEY);
    CREATE TABLE orders (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        clientCpf TEXT NOT NULL,
        FOREIGN KEY(clientCpf) REFERENCES clients(clientCpf)
    );
    CREATE TABLE products (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL, 
        weight INT NOT NULL, 
        dimensionX INT NOT NULL, 
        dimensionY INT NOT NULL, 
        dimensionZ INT NOT NULL, 
        price INT NOT NULL
    );
    `)

    const productsRepository = new ProductRepositorySqlite(databaseSqlite)

    await productsRepository.save(new Product("1", "barbeador", 100, { x: 5, y: 5, z: 10 }, 9000))
})

test("should be create order entry with 3 items and discount", async function() {
    const placeOrderInput: PlaceOrderInput = {
        client: {
            cpf: "186.360.540-10",
        },
        cep: "999999",
        entries: [
            {
                productId: "1",
                quantity: 1
            },
        ],
        coupons : [
            "RAP10"
        ]
    }
    const orderRepository = new OrderRepositoryMemory()
    const productRepository = new ProductRepositorySqlite(databaseSqlite)
    const couponRepository = new CouponRepositoryMemory()
    const geoMemory = new GeoProviderMemory()
    const placeOrder = new PlaceOrder({products: productRepository, orders: orderRepository, coupons: couponRepository, geo: geoMemory})
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(9000)
})

test("should be able to create an order and fetch it after", async function() {
    const placeOrderInput: PlaceOrderInput = {
        "client": {
            "cpf": "186.360.540-10",
        },
        "cep": "999999",
        "entries": [
            {
                "productId": "1",
                "quantity": 1
            },
        ],
        coupons : [
            "RAP10"
        ]
    }
    const orderRepository = new OrderRepositoryMemory()
    const productRepository = new ProductRepositorySqlite(databaseSqlite)
    const couponRepository = new CouponRepositoryMemory()
    const geoMemory = new GeoProviderMemory()
    const placeOrder = new PlaceOrder({products: productRepository, orders: orderRepository, coupons: couponRepository, geo: geoMemory})
    const placeOrderOuput = await placeOrder.execute(placeOrderInput)
    const getOrder = new GetOrder({orders: orderRepository})
    const getOrderInput: GetOrderInput = {
        id: placeOrderOuput.id
    } 
    const getOrderOutput = await getOrder.execute(getOrderInput)
    expect(getOrderOutput.id).toBe(placeOrderOuput.id)
    expect(getOrderOutput.clientCPF).toBeDefined()
    expect(getOrderOutput.deliveryCEP).toBeDefined()
    expect(getOrderOutput.discount).toBeDefined()
    expect(getOrderOutput.freightTotal).toBeDefined()
    expect(getOrderOutput.total).toBeDefined()
    expect(getOrderOutput.items).toBeDefined()
    expect(getOrderOutput.items.length).toBe(1)
})


