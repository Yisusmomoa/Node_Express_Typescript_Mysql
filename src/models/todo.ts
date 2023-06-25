import { Table, Model, DataType, Column, ForeignKey } from 'sequelize-typescript'

import User from './user'

export interface todo {
  id: number
  title: string
  description?: string
  userCreate: number
  completed: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export type createTodo = Omit<todo, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'completed'>
export type showTodo = Omit<todo, 'updatedAt' | 'deletedAt'>

@Table({ tableName: 'Todo', underscored: true })
class Todo extends Model<todo | createTodo | showTodo> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  })
    id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
    description!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
    completed!: boolean

  @Column
    createdAt!: Date

  @Column
    updatedAt!: Date

  @Column
    deletedAt!: Date

  @ForeignKey(() => User)
  @Column
    userCreate!: number
}

export default Todo
