-- SQLite
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS discount_coupons;
DROP TABLE IF EXISTS order_entries;
CREATE TABLE clients (cpf TEXT PRIMARY KEY);
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    clientCpf TEXT NOT NULL,
    couponCode TEXT,
    serial INTEGER NOT NULL,
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
CREATE TABLE discount_coupons (
    code TEXT PRIMARY KEY,
    discount NUMBER,
    expireDate DATE
);
INSERT INTO discount_coupons (code, discount, expireDate)
VALUES ("RAP10", 10, "2021-10-10T10:00:00");
CREATE TABLE order_entries (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id)
);
INSERT into products (
        id,
        name,
        weight,
        dimensionX,
        dimensionY,
        dimensionZ,
        price
    )
VALUES ("1", "barbeador", 100, 5, 5, 10, 9000);