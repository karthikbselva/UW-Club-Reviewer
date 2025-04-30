import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'; 
import { TermEnum } from '../../types';
import Review from './review.model';

@Table({ tableName: "users" })
export default class User extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    first_name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    last_name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    program_name!: string;

    @Column({ type: DataType.ENUM(...Object.values(TermEnum)), allowNull: false })
    term_of_study!: TermEnum;

    @Column({ type: DataType.STRING, allowNull: false })
    profile_photo?: string;

    @HasMany(() => Review)
    reviews!: Review[]
    
}