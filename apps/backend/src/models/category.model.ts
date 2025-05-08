import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import ClubCategory from "./clubCategory.model";
import Club from "./club.model";

@Table({
  tableName: "categories",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Category extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name!: string;

  @BelongsToMany(() => Club, () => ClubCategory)
  clubs?: Club[];
}
