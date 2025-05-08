import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Club from "./club.model";

@Table({
  tableName: "socials",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Social extends Model {
  @ForeignKey(() => Club)
  @Column({ type: DataType.INTEGER, allowNull: false })
  club_id!: number;

  @BelongsTo(() => Club)
  club!: Club;

  @Column({ type: DataType.STRING, allowNull: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  instagram!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  tiktok!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  linkedin!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  facebook!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  youtube!: string;
}
