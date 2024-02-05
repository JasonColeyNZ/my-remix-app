import type { PrismaClient } from "@prisma/client";

// export const setupRLS = async (prisma: PrismaClient) => {
//   prisma.$executeRaw`ALTER TABLE Client ENABLE ROW LEVEL SECURITY;`;
//   prisma.$executeRaw`CREATE POLICY "entity_isolation_policy" ON Client USING ("entityId" = get_claim(id, 'entityId')::uuid);`;
// };

export const setupRLS = async (prisma: PrismaClient) => {
  console.log("Setting up RLS");

  await prisma.$executeRawUnsafe(
    `DO
$do$
BEGIN
    IF EXISTS (SELECT FROM pg_catalog.pg_roles
        WHERE  rolname = 'rls_user'
        ) THEN

         DROP ROLE IF EXISTS rls_user;
         CREATE USER rls_user WITH PASSWORD 'H0tr$gjc';

    ELSE
        -- while create user is an alias for role, user add login access
        CREATE USER rls_user WITH PASSWORD 'H0tr$gjc';
    END IF;
END
$do$;`,
  );
  await prisma.$executeRawUnsafe(`GRANT USAGE ON SCHEMA public to rls_user;`);
  await prisma.$executeRawUnsafe(
    `GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to rls_user;`,
  );
  await prisma.$executeRawUnsafe(
    `GRANT ALL ON ALL TABLES IN SCHEMA public TO rls_user;`,
  );
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS auth;`);
  await prisma.$executeRawUnsafe(`CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;`);

  // await prisma.$executeRawUnsafe(
  //   `ALTER TABLE "Client" enable row level security;`
  // );
  // await prisma.$executeRawUnsafe(
  //   `ALTER TABLE "Client" FORCE ROW LEVEL SECURITY;`
  // );
  // await prisma.$executeRawUnsafe(
  //   `create policy "Entity Isolation Policy" ON "Client" for select using ("entityId" = get_my_claim('entityId')::text::uuid);`
  // );
};
