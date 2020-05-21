
let httpConfig = {
  protocol: 'http',
  host: "localhost",
  port: 8090,
  root: "/api",
  baseUrl: "http://localhost:8090/api"
};

let swalError = (error) => {
  return {
    title: "Error",
    text: error.toString(),
    icon: "error",
    button: "OK"
  }
};

export let settings = {
  remote : {
    api: {
      context: httpConfig,
      baseUrl: httpConfig.baseUrl,
      headers: {
        jsonContent: {"Content-Type": "application/json"}
      }
    }
  },
  errors : {
    swal: swalError
  },
  cart : {
    item: {
      states: {
        queued: "QUEUED",
        deleted: "DELETED",
        checkedOut: "CHECKED_OUT",
        abandoned: "ABANDONED"
      }
    },
    addButton : {
      sourceKeys: {
        BOOK_KEY : "Book",
        BOOK_DETAIL_KEY: "BookDetail",
        CART_PLUS_KEY: "Cart-plus",
        CART_MINUS_KEY: "Cart-minus"
      }
    }
  }
};
