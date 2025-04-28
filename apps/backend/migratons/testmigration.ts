import { QueryInterface } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.createTable('Users', {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(255)',
      allowNull: false,
    },
    email: {
      type: 'VARCHAR(255)',
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: 'DATE',
      allowNull: false,
    },
    updatedAt: {
      type: 'DATE',
      allowNull: false,
    },
  });
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.dropTable('Users');
}