-- Drop tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

-- Recreate tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(32) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_time VARCHAR(32),
  prep_time INTEGER,
  total_amount DECIMAL,
  status VARCHAR(32) DEFAULT 'New',
  is_complete BOOLEAN DEFAULT FALSE
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255)
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL,
  image_url VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);
