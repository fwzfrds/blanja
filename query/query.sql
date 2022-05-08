CREATE TABLE users (id INT NOT NULL GENERATED ALWAYS AS IDENTITY, 
    first_name varchar(255), 
    last_name varchar(255), 
    email varchar(255),
    user_password varchar(255), 
    phone varchar(255), 
    gender varchar(255), 
    birth date, 
    user_address varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE categories(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE admins(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE carts(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    qty INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);


CREATE TABLE products(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NULL,
    qty INT DEFAULT 0,
    price INT DEFAULT 0,
    id_category INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

SELECT products.*, categories.name AS name_category FROM products INNER JOIN categories ON products.id_category = categories.id;

SELECT carts.*, products.name AS name_product FROM carts INNER JOIN products ON carts.id_product = products.id WHERE carts.id_user = 2;