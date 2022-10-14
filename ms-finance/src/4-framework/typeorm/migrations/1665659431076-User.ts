import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1665659431076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(200)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
