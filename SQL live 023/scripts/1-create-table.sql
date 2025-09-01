\c live023

DROP TABLE IF EXISTS customers;
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL,
    first_name VARCHAR(20),
    last_name VARCHAR(60),
    email VARCHAR(256),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL,
    customer_id INT,
    amount NUMERIC(7, 2)
);