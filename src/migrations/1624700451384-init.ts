import {MigrationInterface, QueryRunner} from "typeorm";

export class init1624700451384 implements MigrationInterface {
    name = 'init1624700451384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" integer NOT NULL, "userId" uuid, "conversationId" uuid, CONSTRAINT "PK_f0bfd55eb4f4b6738ee5605a048" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "phone" character varying(16), "email" character varying(255) NOT NULL, "password" character varying(300) NOT NULL, "firstName" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isReported" boolean NOT NULL DEFAULT false, "isBlocked" boolean NOT NULL DEFAULT false, "preferences" text, CONSTRAINT "UQ_12ffa5c867f6bb71e2690a526ce" UNIQUE ("email"), CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying(255) NOT NULL, "messageType" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" uuid, "conversationId" uuid, CONSTRAINT "PK_cdce20d67a21ea39507f1df8eef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(40) NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" uuid, CONSTRAINT "PK_e005f2014a3e0ec71e37731695c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."participants" ADD CONSTRAINT "FK_79fce4f363ed61143e36058d121" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."participants" ADD CONSTRAINT "FK_16ad550662508e7f83fb3f98e68" FOREIGN KEY ("conversationId") REFERENCES "public"."conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."messages" ADD CONSTRAINT "FK_0ff157d40b3d3e07a918623f225" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."messages" ADD CONSTRAINT "FK_0a9472500da671277eff8b16c21" FOREIGN KEY ("conversationId") REFERENCES "public"."conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."conversations" ADD CONSTRAINT "FK_a0d2204abc852058bce75643bab" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."conversations" DROP CONSTRAINT "FK_a0d2204abc852058bce75643bab"`);
        await queryRunner.query(`ALTER TABLE "public"."messages" DROP CONSTRAINT "FK_0a9472500da671277eff8b16c21"`);
        await queryRunner.query(`ALTER TABLE "public"."messages" DROP CONSTRAINT "FK_0ff157d40b3d3e07a918623f225"`);
        await queryRunner.query(`ALTER TABLE "public"."participants" DROP CONSTRAINT "FK_16ad550662508e7f83fb3f98e68"`);
        await queryRunner.query(`ALTER TABLE "public"."participants" DROP CONSTRAINT "FK_79fce4f363ed61143e36058d121"`);
        await queryRunner.query(`DROP TABLE "public"."conversations"`);
        await queryRunner.query(`DROP TABLE "public"."messages"`);
        await queryRunner.query(`DROP TABLE "public"."users"`);
        await queryRunner.query(`DROP TABLE "public"."participants"`);
    }

}
