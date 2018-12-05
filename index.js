var eventsConfig = require("./config").events,
  Restaurant = require("./orders"),
  http = require("http"),
  logs = require("./orders").logs,
  port = process.env.PORT || 3000;

var myRestaurant = new Restaurant();

myRestaurant.on(eventsConfig.AddingOrder, myRestaurant.orderAdded);
myRestaurant.on(eventsConfig.RemovingOrder, myRestaurant.orderRemoved);
myRestaurant.on(eventsConfig.OrdersReset, myRestaurant.emptyOrdersList);
myRestaurant.on(eventsConfig.PrintAllOrders, myRestaurant.ordersPrint);

http
  .createServer((req, res) => {
    res.writeHeader(200);

    // in order to avoid printing twice
    if (req.url != "/favicon.ico") {
      myRestaurant.getAll();

      myRestaurant.addOrder("Amit", 4);
      myRestaurant.addOrder("Yaniv", 3);
      myRestaurant.addOrder("Zipora", 6);
      myRestaurant.addOrder("Nurit", 7);

      myRestaurant.removeOrder();
      myRestaurant.removeOrder();

      myRestaurant.addOrder("Guy", 5);

      myRestaurant.getAll();

      myRestaurant.resetOrders();

      myRestaurant.getAll();
    }

    res.write("success\n");
    res.end(JSON.stringify(logs));
  })
  .listen(port);
