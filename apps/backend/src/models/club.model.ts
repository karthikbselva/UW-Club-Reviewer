import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
  BelongsToMany,
} from "sequelize-typescript";
import Review from "./review.model";
import Category from "./category.model";
import Schedule from "./schedule.model";
import ClubCategory from "./clubCategory.model";
import Social from "./social.model";

@Table({
  tableName: "clubs",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Club extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  competition_level!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  skill_level!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_active!: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  banner_photo!: string;

  @HasOne(() => Schedule)
  schedule!: Schedule;

  @HasOne(() => Social)
  social!: Social;

  @BelongsToMany(() => Category, () => ClubCategory)
  categories!: Category[];

  //@HasMany(() => Review)
  //reviews!: Review[];
}
