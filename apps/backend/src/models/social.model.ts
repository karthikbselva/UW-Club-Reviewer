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
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  club_id!: number;

  @BelongsTo(() => Club)
  club!: Club;

  @Column({ type: DataType.STRING, allowNull: true })
  email!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  instagram!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  tiktok!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  linkedin!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  facebook!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  youtube!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  discord!: string | null;
}