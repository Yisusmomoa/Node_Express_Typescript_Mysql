// import { DataTypes, Model } from 'sequelize'
import { Table, Model, DataType, Column, HasMany, BeforeCreate } from 'sequelize-typescript'
import Todo from './todo'
import bcrypt from 'bcrypt'

export interface user {
  id: number
  username: string
  email: string
  pass: string
  salt: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type createUser = Omit<user, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export type loginUser = Pick<user, 'email' | 'pass'>

export type showUser = Omit<user, 'pass' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'salt'>

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

  @Column({
    type: DataType.STRING
  })
    salt!: string

  @Column
    createdAt!: Date

  @Column
    updatedAt!: Date

  @Column
    deletedAt!: Date

  @HasMany(() => Todo)
    todos!: Todo[]

  @BeforeCreate
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async crypt (instance: User) {
    console.log('🚀 ~ file: user.ts:76 ~ User ~ crypt ~ instance:', instance)
    const salt = await bcrypt.genSalt()
    console.log('🚀 ~ file: user.ts:78 ~ User ~ crypt ~ salt:', salt)
    instance.salt = salt
    const passwordHash = await User.hashAuth(instance.pass, salt)
    console.log('🚀 ~ file: user.ts:80 ~ User ~ crypt ~ passwordHash:', passwordHash)
    instance.pass = passwordHash
  }

  static async hashAuth (password: string, salt: string): Promise<any> {
    return await bcrypt.hash(password, salt)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async validatePassword (password: string) {
    const passwordHash = await User.hashAuth(password, this.salt)
    // se compara con el que ya está
    return passwordHash === this.pass
  }
}

export default User
