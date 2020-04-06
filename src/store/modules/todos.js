import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const todos = response.data;
    commit("setTodos", todos);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
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
