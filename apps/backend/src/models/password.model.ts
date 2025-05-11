import { Table, Column, Model, DataType, ForeignKey, BelongsTo, } from 'sequelize-typescript'; 
import User from './user.model';

@Table({
    tableName: "passwords",
    createdAt: "created_at",
    updatedAt: "updated_at",
})
export default class Password extends Model {
    @ForeignKey(() => User)
    @Column({ type: DataType.NUMBER, allowNull: false })
    user_id!: string;

    @BelongsTo(() => User)
    user!: User

    @Column({ type: DataType.STRING, allowNull: false })
    password_hash!: string;
}

