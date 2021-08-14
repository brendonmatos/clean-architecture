CREATE TABLE clients { cpf TEXT PRIMARY KEY };
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    clientCpf TEXT NOT NULL,
    FOREIGN KEY(clientCpf) REFERENCES clients(clientCpf)
);