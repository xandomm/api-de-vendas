import {MigrationInterface, QueryRunner} from "typeorm";

export class User1636030305891 implements MigrationInterface {
    name = 'User1636030305891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "xablau" character varying`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "xablau"`);
  }

}
