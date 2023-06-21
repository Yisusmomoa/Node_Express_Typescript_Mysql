// import { DataTypes, Model } from 'sequelize'
import { Table, Model, DataType, Column, HasMany } from 'sequelize-typescript'
import Todo from './todo'

export interface user {
  id: number
  username: string
  email: string
  pass: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type createUser = Omit<user, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export type loginUser = Pick<user, 'email' | 'pass'>

export type showUser = Omit<user, 'pass' | 'createdAt' | 'updatedAt' | 'deletedAt'>

// @Table
// class User extends Model {
//   @Column name!: string
// }
@Table({ tableName: 'User', underscored: true })
class User extends Model<user | createUser | loginUser | showUser> {
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
    username!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
    email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    pass!: string

  @Column
    createdAt!: Date

  @Column
    updatedAt!: Date

  @Column
    deletedAt!: Date

  @HasMany(() => Todo)
    todos!: Todo[]
}

// class User extends Model<user> implements user {
//   public id!: number
//   public username!: string
//   public email!: string
//   public pass!: string
//   public createdAt?: Date
//   public updatedAt?: Date
//   public deletedAt?: Date
// }
// User.init({
//   id: {
//     type: DataTypes.INTEGER.UNSIGNED,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   pass: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   // Other model options go here
//   timestamps: true,
//   sequelize: sequelizeConnection, // We need to pass the connection instance
//   modelName: 'User', // We need to choose the model name
//   paranoid: true
// })

export default User
