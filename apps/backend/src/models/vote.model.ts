import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  Index,
} from "sequelize-typescript";
import User from "../models/user.model";
import Review from "../models/review.model";

@Table({
  tableName: "votes",
  createdAt: "created_at",
  updatedAt: false,
})
export default class Vote extends Model {
  @Index({ name: "user_review_id", unique: true })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Index({ name: "user_review_id", unique: true })
  @ForeignKey(() => Review)
  @Column({ type: DataType.INTEGER, allowNull: false })
  review_id!: number;

  @BelongsTo(() => Review)
  review!: Review;

  @Column({ type: DataType.INTEGER, allowNull: false })
  vote_value!: number;
}
