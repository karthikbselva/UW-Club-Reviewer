import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'; 
import User from './user.model';
import Club from './club.model';

@Table({ tableName: "reviews" })
export default class Review extends Model {
    @ForeignKey(() => User)
    @Column({ type: DataType.NUMBER, allowNull: false })
    user_id!: number;
    
    @BelongsTo(() => User)
    user!: User

    @ForeignKey(() => Club)
    @Column({ type: DataType.NUMBER, allowNull: false })
    club_id!: number;
    
    @BelongsTo(() => Club)
    club!: Club;

    @Column({ type: DataType.STRING, allowNull: false })
    comment!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    is_liked!: boolean;

    @Column({ type: DataType.NUMBER, allowNull: false })
    helpful_votes!: number;

}