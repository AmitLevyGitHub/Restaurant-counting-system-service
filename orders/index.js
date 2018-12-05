var events = require("events");
const maxOrders = 10;
var logs = [];

class order {
  constructor(_name, _numOfGuests) {
    this.name = _name;
    this.numOfGuests = _numOfGuests;
  }
}

class Restaurant extends events.EventEmitter {
  constructor() {
    super();
    this.ordersArray = [];
    this.orders = 0;
  }

  resetOrders() {
    while (this.ordersArray.length) this.ordersArray.pop();
    this.orders = 0;

    this.emit("ordersReset");
  }

  addOrder(_name, _numOfGuests) {
    if (this.ordersArray.length <= maxOrders) {
      var _order = new order(_name, _numOfGuests);
      this.ordersArray.push(_order);
      this.orders += 1;
    }
    this.emit("addingOrder");
  }

  removeOrder() {
    if (this.ordersArray.length) {
      this.ordersArray.pop();
      this.orders -= 1;
    }
    this.emit("removingOrder");
  }

  getAll() {
    this.emit("printAllOrders");
  }

  //callback functions

  emptyOrdersList() {
    console.log("All orders were deleted");
    logs.push("All orders were deleted");
  }

  orderAdded() {
    var currIndex = this.ordersArray.length - 1;
    if (this.ordersArray.length < maxOrders) {
      console.log(
        "order added under the name of " +
          this.ordersArray[currIndex].name +
          " for " +
          this.ordersArray[currIndex].numOfGuests +
          " guests"
      );
      logs.push(
        "order added under the name of " +
          this.ordersArray[currIndex].name +
          " for " +
          this.ordersArray[currIndex].numOfGuests +
          " guests"
      );
    } else {
      console.log("No more room in the restaurant");
      logs.push("No more room in the restaurant");
    }
  }

  orderRemoved() {
    if (this.ordersArray.length) {
      console.log("The last order has been deleted");
      logs.push("The last order has been deleted");
    } else {
      console.log("Orders list is empty. No orders to remove");
      logs.push("Orders list is empty. No orders to remove");
    }
  }

  ordersPrint() {
    if (this.ordersArray.length == 0) {
      console.log("no orders to show");
      logs.push("no orders to show");
    } else {
      console.log("List of orders-");
      logs.push("List of orders-");
      for (let i = 0; i < this.ordersArray.length; i++) {
        console.log(this.ordersArray[i].name, this.ordersArray[i].numOfGuests);
        logs.push(
          "Name- " +
            this.ordersArray[i].name +
            ", number of guests- " +
            this.ordersArray[i].numOfGuests
        );
      }
    }
  }
}

module.exports = Restaurant;

module.exports.logs = logs;
