const state = {
  todo: [],
  form: {
    f_name: '',
    l_name: '',
    id: 1
  }
}
const actions = {
  addTodo () {
    state.todo.push({
      f_name: state.form.f_name,
      l_name: state.form.l_name,
      id: state.form.length + 1
    })
  },
  removeTodo (com, index) {
    state.todo.splice((index), 1)
  }
}
export default {
  namespaced: true,
  state,
  actions
}
