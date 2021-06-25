import {MigrationInterface, QueryRunner} from "typeorm";

export class participants1624584630559 implements MigrationInterface {
    name = 'participants1624584630559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "conversationId" uuid`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_6b54f24a585e94ef3fc7aa7ef5d" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_6b54f24a585e94ef3fc7aa7ef5d"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "conversationId"`);
    }

}
