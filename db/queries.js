const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

// ---------------------------------------- Get all menu items from the database ----------------------------------------
const getAllMenuItems = () => {
  const query = `
    SELECT *
    FROM menu_items
  `;
  return db
    .query(query)
    .then(data => {

      const appetizers = [];
      const mains = [];
      const sides = [];
      const desserts = [];
      const beverages = [];

      let menuItems = data.rows;

      // Sort menu items by categories and place in it's own array
      for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i]["category_id"] === 1) {
          appetizers.push(menuItems[i]);
        } else if (menuItems[i]["category_id"] === 2) {
          mains.push(menuItems[i]);
        } else if (menuItems[i]["category_id"] === 3) {
          sides.push(menuItems[i]);
        } else if (menuItems[i]["category_id"] === 4) {
          desserts.push(menuItems[i]);
        } else if (menuItems[i]["category_id"] === 5) {
          beverages.push(menuItems[i]);
        }
      }

      const menu = {
        appetizers: appetizers,
        mains: mains,
        sides: sides,
        desserts: desserts,
        beverages: beverages
      };

      return menu;
    })
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Get a single user from the database given their user id ----------------------------------------
const getUserWithId = (queryParams) => {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1
  `;

  return db
    .query(query, queryParams)
    .then(data => {
      const user = data.rows;
      if (user.length === 1) { // Should return only 1 user
        return user[0];
      } else {
        return null;
      }
    })
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Create a new order and store it to the database ----------------------------------------
const newOrder = (queryParams) => {
  const query = `
    INSERT INTO orders (order_id, user_id, order_time, total_amount, order_items)
    VALUES ($1, $2, $3, $4, $5)
    `;
  return db
    .query(query, queryParams)
    .catch(err => console.log(err.message));
};

// -------------------------------------- Below queries are all for admin (queue) page --------------------------------------

// ---------------------------------------- Load all new orders from the database ----------------------------------------
const loadNewOrders = () => {
  const query = `
    SELECT *
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE orders.status = 'New'
  `;
  return db
    .query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Load all current (in progress) orders from the database ----------------------------------------
const loadCurrentOrders = () => {
  const query = `
    SELECT *
    FROM orders
    JOIN users ON orders.user_id = users.id
    WHERE orders.status = 'In Progress'
  `;
  return db
    .query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Delete an order from the database given the order id ----------------------------------------
const deleteOrder = (queryParams) => {
  const query = `
    DELETE FROM orders
    WHERE order_id = $1
  `;
  return db
    .query(query, queryParams)
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Update an order from the database (change status from 'New' to 'In Progress') ----------------------------------------
const acceptOrder = (queryParams) => {
  const query = `
    UPDATE orders
    SET prep_time = $2, status = 'In Progress', time_stamp = NOW()::TIMESTAMP, order_accepted_time = $3
    WHERE order_id = $1
  `;
  return db
    .query(query, queryParams)
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Update an order from the database (change status from 'Pick-up Ready' to 'Completed') ----------------------------------------
const completeOrder = (queryParams) => {
  const query = `
    UPDATE orders
    SET status = 'Complete'
    WHERE order_id = $1
  `;
  return db
    .query(query, queryParams)
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Update all orders from the database (change status from 'In Progress' to 'Pick-up Ready') if prep time has elapsed ----------------------------------------
const pickupOrder = () => {
  const query = `
    UPDATE orders
    SET status = 'Pick-up Ready'
    WHERE time_stamp < NOW() - prep_time * INTERVAL '1 minute' AND status = 'In Progress'
  `;
  return db
    .query(query)
    .catch(err => console.log(err.message));
};

// ---------------------------------------- Get all orders that are ready for pick-up from the database ----------------------------------------
const getReadyOrders = () => {
  const query = `
    SELECT *
    FROM orders
    JOIN users ON users.id = orders.user_id
    WHERE status = 'Pick-up Ready'
  `;
  return db
    .query(query)
    .then((data) => {
      return data.rows;
    })
    .catch(err => console.log(err.message));
};

module.exports = {
  getAllMenuItems,
  getUserWithId,
  newOrder,
  loadNewOrders,
  loadCurrentOrders,
  deleteOrder,
  acceptOrder,
  completeOrder,
  pickupOrder,
  getReadyOrders
};
