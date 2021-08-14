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