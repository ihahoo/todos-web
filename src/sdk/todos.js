import fetch from "@36node/fetch";

export default class SDK {
  base;

  get auth() {
    return "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWNiOWE0ZWRjNDhhZDQwMDEyMGQyOGEwIiwiZXhwIjoyNTU3MDM1MjU4LCJyb2xlcyI6WyJBRE1JTiJdLCJucyI6Ii9hZHZlbnR1cmVyIn0.DJ7lG-6cI5E8dIq8o6cIk5YCS66GV75Km7EW03GxGzWxigQm6hZsqVeGRruyrwJ6De-3VrS9Rcz7srdPyZpyzHV1VaHd_Xxw1iY2UKPwiVZsnvLgcNIwFQmar6E3pQaBxyT7PT8E4aNwhKPcVDWs-D8Osi5QH6HftFMoW-ZHQJ0";
  }

  constructor(opt = { base: "" }) {
    this.base = opt.base;
  }

  todo = {
    listTodos: req => {
      return fetch(`${this.base}/todos`, {
        method: "GET",
        headers: { Authorization: this.auth },
      });
    },
    createTodo: req => {
      const { body } = req || {};

      if (!body) throw new Error("requetBody is required for createTodo");

      return fetch(`${this.base}/todos`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth },
      });
    },
    showTodoById: req => {
      const { todoId } = req || {};

      if (!todoId) throw new Error("todoId is required for showTodoById");

      return fetch(`${this.base}/todos/${todoId}`, {
        method: "GET",
        headers: { Authorization: this.auth },
      });
    },
    updateTodo: req => {
      const { todoId, body } = req || {};

      if (!todoId) throw new Error("todoId is required for updateTodo");
      if (!body) throw new Error("requetBody is required for updateTodo");

      return fetch(`${this.base}/todos/${todoId}`, {
        method: "PUT",
        body,
        headers: { Authorization: this.auth },
      });
    },
    deleteTodo: req => {
      const { todoId } = req || {};

      if (!todoId) throw new Error("todoId is required for deleteTodo");

      return fetch(`${this.base}/todos/${todoId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth },
      });
    },
  };
}
