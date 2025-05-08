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
  tableName: "schedules",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class Schedule extends Model {
  @ForeignKey(() => Club)
  @Column({ type: DataType.INTEGER, allowNull: false })
  club_id!: number;

  @BelongsTo(() => Club)
  club!: Club;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  sunday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  monday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  tuesday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  wednesday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  thursday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  friday!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  saturday!: boolean;
}
