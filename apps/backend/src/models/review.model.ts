import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
  HasMany,
  Default,
} from "sequelize-typescript";
import User from "./user.model";
import Club from "./club.model";
import Vote from "./vote.model";

@Table({ tableName: "reviews" })
export default class Review extends Model {
  @Index({ name: "user_club_id", unique: true })
  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER, allowNull: false })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Index({ name: "user_club_id", unique: true })
  @ForeignKey(() => Club)
  @Column({ type: DataType.NUMBER, allowNull: false })
  club_id!: number;

  @BelongsTo(() => Club)
  club!: Club;

  @Column({ type: DataType.STRING, allowNull: false })
  comment!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  likes_club!: boolean;

  @Default(0)
  @Column({ type: DataType.NUMBER, allowNull: false })
  vote_sum!: number;

  @HasMany(() => Vote)
  votes!: Vote[];
}
