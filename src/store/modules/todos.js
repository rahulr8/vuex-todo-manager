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
    const response = await axios.get(`${BASE_URL}?_limit=${limit}`);

    const todos = response.data;
    commit("setTodos", todos);
  },

  async updateTodo({ commit }, todo) {
    const response = await axios.put(`${BASE_URL}/${todo.id}`, todo);

    const updatedTodo = response.data;
    commit("updateTodo", updatedTodo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
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
