import Todo, { createTodo, showTodo, updateTodo } from '../models/todo'

export const newTodo = async (todo: createTodo): Promise<createTodo> => {
  const result = await Todo.create(todo)
  return result
}

export const showTodosByUser = async (id: number): Promise<showTodo[] | undefined> => {
  const todos = await Todo.findAll({
    where: {
      userCreate: id
    }
  })
  return todos
}

export const showTodoById = async (id: number, idUser: number): Promise<showTodo> => {
  const todo = await Todo.findOne({
    where: { id, userCreate: idUser }
  })
  if (todo == null) throw new Error('No se encontro la todo seleccionada')
  return todo
}

export const deleteTodo = async (id: number): Promise<number> => {
  const result = await Todo.destroy({
    where: { id }
  })
  if (result !== 1) throw new Error('Erro al eliminar la todo, intentar más tarde')
  return result
}

export const updateTodoMe = async (id: number, todoInfo: updateTodo): Promise<showTodo> => {
  const todo = await Todo.findByPk(id)
  if (todo === undefined || todo === null) throw new Error('Error, todo no encontrada')
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  todoInfo.title.length > 0
    ? todo.title = todoInfo.title
    : todo.title
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  if (todoInfo.description !== undefined) {
    todo.description = todoInfo.description
  }
  await todo.save()
  return todo
}

export const completedTodo = async (id: number): Promise<showTodo> => {
  const result = await Todo.findByPk(id)
  if (result === undefined || result === null) throw new Error('Error, todo no encontrada')
  result.completed = !result.completed
  await result.save()
  return result
}
