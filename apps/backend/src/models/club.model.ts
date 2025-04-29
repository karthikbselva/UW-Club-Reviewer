import { Table, Column, Model, DataType } from 'sequelize-typescript'; 
import { ClubCategory, ClubCategoryEnum, DayEnum, SemesterEnum } from '../../types';

@Table({ tableName: "clubs" })
export default class Club extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    description!: string;

    @Column({ type: DataType.NUMBER, allowNull: false })
    competition_level!: number;

    @Column({ type: DataType.NUMBER, allowNull: false })
    skill_level!: number;

    @Column({ type: DataType.ARRAY(DataType.ENUM(...ClubCategoryEnum)), allowNull: false })
    club_categories!: [ClubCategory];

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    is_active!: boolean;

    @Column({ type: DataType.ARRAY(DataType.ENUM(...Object.values(SemesterEnum))), allowNull: false })
    active_terms!: [SemesterEnum];

    @Column({ type: DataType.ARRAY(DataType.ENUM(...Object.values(DayEnum))), allowNull: false })
    days_of_operation!: [DayEnum];

    @Column({ type: DataType.STRING, allowNull: false })
    banner_photo!: string;
}