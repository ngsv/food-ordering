/* eslint-env jquery */

// This works....
// Must be under document.ready

$(document).ready(function() {
  const createNewOrder = (order) => {
    const $order = $(`
      <div class="table-row">
        <span class="row-id">${order.order_id}</span>
        <span class="row-customer">${order.first_name} ${order.last_name}</span>
        <span class="row-phone">${order.phone}</span>
        <span class="row-time">${order.time}</span>
        <span class="row-prepTime">${order.prep}</span>
        <span class="row-status">${order.status}</span>
      </div>
      `);
    $('#table').append($order);
  };

  const newOrder = {
    order_id: "123456",
    first_name: "Steven",
    last_name: "Ngov",
    phone: "647-718-1094",
    time: "4:00",
    prep: 20,
    status: "New"
  };

  createNewOrder(newOrder);
});
