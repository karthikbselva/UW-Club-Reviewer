import { Table, Column, Model, DataType, HasMany, HasOne } from "sequelize-typescript";
import { TermEnum } from "../../types";
import Review from "./review.model";
import Vote from "./vote.model";
import Password from "./password.model";

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  program_name!: string | null;

  @Column({ type: DataType.ENUM(...Object.values(TermEnum)), allowNull: true })
  term_of_study!: TermEnum | null;

  @Column({ type: DataType.STRING, allowNull: true })
  profile_photo!: string | null;

  @HasOne(() => Password)
  password_hash!: Password;

  @HasMany(() => Review)
  reviews!: Review[];

  @HasMany(() => Vote)
  votes!: Vote[];
}
