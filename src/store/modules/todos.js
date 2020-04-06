import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(BASE_URL);

    const todos = response.data;
    commit("setTodos", todos);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(BASE_URL, {
      title,
      completed: false,
    });

    const newTodo = response.data;
    commit("newTodo", newTodo);
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`${BASE_URL}/${id}`);

    commit("removeTodo", id);
  },

  async filterTodos({ commit }, event) {
    const limit = parseInt(
      event.target.options[event.target.options.selectedIndex].innerText
    );
    console.log("limit", limit);
    const response = await axios.get(`${BASE_URL}?_limit=${limit}`);

    const todos = response.data;
    commit("setTodos", todos);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

// Getters - Get a part of the state. You can compute values here too if you want
// Actions - Are trigerred by events and are able to commit a change to the state
// Mutation - Are able to state the change by being called my action commits
