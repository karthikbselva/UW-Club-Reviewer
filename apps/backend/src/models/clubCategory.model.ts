import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Club from "./club.model";
import Category from "./category.model";

@Table({
  tableName: "club_categories",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class ClubCategory extends Model {
  @ForeignKey(() => Club)
  @Column({ type: DataType.INTEGER, allowNull: false })
  club_id!: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id!: number;
}
