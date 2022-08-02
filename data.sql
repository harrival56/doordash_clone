DROP DATABASE IF EXISTS doordash;

CREATE DATABASE doordash;

\c doordash;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone integer NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    role text NOT NULL,
    address text NOT NULL

);

CREATE TABLE drivers (
    email text NOT NULL PRIMARY KEY,
    car_brand text NOT NULL,
    car_make text NOT NULL,
    car_year integer NOT NULL,
    car_color text NOT NULL,
    driver_licence text NOT NULL UNIQUE,
    online  BOOLEAN
);

CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    email text NOT NULL,
    address text NOT NULL,
    store_name text NOT NULL,
    open BOOLEAN
);

CREATE TABLE store_items (
    store_id integer REFERENCES stores,
    store_item text NOT NULL,
    category text NOT NULL,
    price integer NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id integer NOT NULL REFERENCES users,
    store_id integer NOT NULL REFERENCES stores,
    driver_id text REFERENCES drivers,
    date timestamp without time zone NOT NULL,
    picked_up_time integer,
    delivered_time integer,
    store_bill integer NOT NULL,
    store_tip integer,
    delivered_price integer NOT NULL,
    driver_tip integer
);

CREATE TABLE ordered_items (
    order_id integer NOT NULL REFERENCES orders,
    item text NOT NULL,
    quantity integer NOT NULL
);



INSERT INTO users
(first_name, last_name, phone, email, password, role, address)
values
('vc', 'legend', 1111111111, 'vc@eg.com', 'vc123', 'admin', '2 bak street peoria IL 32222');

INSERT INTO users
(first_name, last_name, phone, email, password, role, address)
values
('nolly', 'big', 1111111112, 'nolly@eg.com', 'nolly2', 'customer', '3 13th street bronx NY 32215');

INSERT INTO users
(first_name, last_name, phone, email, password, role, address)
values
('ben', 'two', 1111111113, 'ben@eg.com', 'ben3', 'driver', '5 mon street columbus OH 54778');

INSERT INTO users
(first_name, last_name, phone, email, password, role, address)
values
('cross', 'stoves', 1111111114, 'cs@eg.com', 'cs456', 'store', '12 crest street newark NJ 10843'),
('john', 'do', 1111111115, 'johnd@eg.com', 'johnd7', 'driver', '12 crest street newark NJ 10843'),
('mart', 'ibe', 1111111116, 'martibe@eg.com', 'marti8', 'store', '12 crest street newark NJ 10843');


INSERT INTO drivers
    (email, car_brand, car_make, car_year, car_color, driver_licence, online)
values
    ('ben@eg.com', 'toyota', 'prius', 2006, 'gray', 'dl123456', TRUE),
    ('johnd@eg.com', 'honda', 'civic', 2019, 'black', 'jk12348', FALSE);

INSERT INTO stores
    (email, address, store_name, open)
values
    ('cs@eg.com', '12 1st street fontana CA 90665', 'sweet kitchen', TRUE),
    ('martibe@eg.com', '12 1st street fontana CA 90665', 'mart', FALSE);

INSERT INTO store_items
    (store_id, store_item, category, price)
values
    (1, 'okpa', 'food', 3),
    (1, 'oka', 'food', 4),
    (1, 'coke', 'drink', 1),
    (1, 'cake', 'desert', 2),
    (2, 'okpa', 'food', 3),
    (2, 'oka', 'food', 4),
    (2, 'coke', 'drink', 1),
    (2, 'cake', 'desert', 2),
    (3, 'okpa', 'food', 3),
    (3, 'oka', 'food', 4),
    (3, 'coke', 'drink', 1),
    (3, 'cake', 'desert', 2);

INSERT INTO orders
    (customer_id, store_id, driver_id, store_bill, delivered_price, driver_tip)
values
    (2, 1, 'ben@eg.com', 32, 3, 10);

INSERT INTO ordered_items
    (order_id, item, quantity)
values
    (1, 'okpa', 4),
    (1, 'oka', 4),
    (1, 'coke', 4);