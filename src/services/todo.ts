import Todo, { createTodo, showTodo } from '../models/todo'

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

export const deleteTodo = async (id: number, idUser: number): Promise<number> => {
  const result = await Todo.destroy({
    where: {
      id,
      userCreate: idUser
    }
  })
  if (result !== 1) throw new Error('Erro al eliminar la todo, intentar más tarde')
  return result
}
