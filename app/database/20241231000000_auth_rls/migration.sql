

-- Auth Triggers
CREATE OR REPLACE FUNCTION public.create_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."User" (id, email)
  VALUES (NEW.id::uuid, NEW.email); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

DROP TRIGGER IF EXISTS create_user_trigger ON auth.users;

CREATE TRIGGER create_user_trigger AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_user();

CREATE OR REPLACE FUNCTION public.update_user() RETURNS TRIGGER AS $$
BEGIN
  UPDATE public."User"
  SET email = NEW.email, "updatedAt" = NEW.updated_at
  WHERE id = NEW.id::uuid; 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY definer;

DROP TRIGGER IF EXISTS update_user_trigger ON auth.users;

CREATE TRIGGER update_user_trigger AFTER UPDATE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.update_user();

CREATE OR REPLACE FUNCTION public.delete_user() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public."User"
  WHERE id = OLD.id::uuid; 
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY definer;

DROP TRIGGER IF EXISTS delete_user_trigger ON auth.users;
CREATE TRIGGER delete_user_trigger AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.delete_user();


-- SUPABASE Custom Claims



-- RLS

-- DO
-- $do$
-- BEGIN
--     IF EXISTS (SELECT FROM pg_catalog.pg_roles
--         WHERE  rolname = 'rls_user'
--         ) THEN

--          --DROP ROLE IF EXISTS rls_user;
--          --CREATE USER rls_user WITH PASSWORD 'H0tr$gjc';

--     ELSE
--         -- while create user is an alias for role, user add login access
--         CREATE USER rls_user WITH PASSWORD 'H0tr$gjc';
--     END IF;
-- END
-- $do$;

GRANT USAGE ON SCHEMA public TO anon, authenticated, rls_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, rls_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, rls_user;
CREATE SCHEMA IF NOT EXISTS auth;

CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--Module

ALTER TABLE "Module" enable row level security;

ALTER TABLE "Module" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Module";

create policy "Entity Isolation Select Policy" ON "Module" 
  for select TO anon, authenticated, rls_user
    USING (true);

--Permission

ALTER TABLE "Permission" enable row level security;

ALTER TABLE "Permission" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Permission";

create policy "Entity Isolation Select Policy" ON "Permission" 
  for select TO anon, authenticated, rls_user
    USING (true);

--ModulePermission

ALTER TABLE "ModulePermission" enable row level security;

ALTER TABLE "ModulePermission" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ModulePermission";

create policy "Entity Isolation Select Policy" ON "ModulePermission" 
  for select TO anon, authenticated, rls_user
    USING (true);


--Role

ALTER TABLE "Role" enable row level security;

ALTER TABLE "Role" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Role";

create policy "Entity Isolation Select Policy" ON "Role" 
  for select TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Role";

create policy "Entity Isolation Insert Policy" ON "Role" 
  for insert TO anon, authenticated, rls_user
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Role";

create policy "Entity Isolation Update Policy" ON "Role" 
  for update TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Role";

create policy "Entity Isolation Delete Policy" ON "Role" 
  for delete TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Role";

CREATE POLICY bypass_rls_policy ON "Role" TO  anon, authenticated, rls_user
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


-- RolePermission

ALTER TABLE "RolePermission" enable row level security;

ALTER TABLE "RolePermission" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "RolePermission";

create policy "Entity Isolation Select Policy" ON "RolePermission" 
  for select TO anon, authenticated, rls_user 
    USING ("roleId" in (select "id" from "Role" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "RolePermission";

create policy "Entity Isolation Insert Policy" ON "RolePermission" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("roleId" in (select "id" from "Role" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "RolePermission";

create policy "Entity Isolation Update Policy" ON "RolePermission" 
  for update TO anon, authenticated, rls_user 
    USING ("roleId" in (select "id" from "Role" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("roleId" in (select "id" from "Role" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "RolePermission";

create policy "Entity Isolation Delete Policy" ON "RolePermission" 
  for delete TO anon, authenticated, rls_user 
    USING ("roleId" in (select "id" from "Role" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "RolePermission";

CREATE POLICY bypass_rls_policy ON "RolePermission" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');



--Entity

ALTER TABLE "Entity" enable row level security;

ALTER TABLE "Entity" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Entity";

create policy "Entity Isolation Select Policy" ON "Entity" 
  for select TO anon, authenticated, rls_user
    USING ("id" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Entity";

create policy "Entity Isolation Insert Policy" ON "Entity" 
  for insert TO anon, authenticated, rls_user
    WITH CHECK ("id" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Entity";

create policy "Entity Isolation Update Policy" ON "Entity" 
  for update TO anon, authenticated, rls_user
    USING ("id" = get_entity_id()) 
    WITH CHECK ("id" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Entity";

create policy "Entity Isolation Delete Policy" ON "Entity" 
  for delete TO anon, authenticated, rls_user
    USING ("id" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Entity";

CREATE POLICY bypass_rls_policy ON "Entity" TO  anon, authenticated, rls_user
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--User

ALTER TABLE "User" enable row level security;

ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "User";

create policy "Entity Isolation Select Policy" ON "User" 
  for select TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "User";

create policy "Entity Isolation Insert Policy" ON "User" 
  for insert TO anon, authenticated, rls_user
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "User";

create policy "Entity Isolation Update Policy" ON "User" 
  for update TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "User";

create policy "Entity Isolation Delete Policy" ON "User" 
  for delete TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "User";

CREATE POLICY bypass_rls_policy ON "User" TO anon, authenticated, rls_user
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--Signature

ALTER TABLE "Signature" enable row level security;

ALTER TABLE "Signature" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Signature";

create policy "Entity Isolation Select Policy" ON "Signature" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Signature";

create policy "Entity Isolation Insert Policy" ON "Signature" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Signature";

create policy "Entity Isolation Update Policy" ON "Signature" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Signature";

create policy "Entity Isolation Delete Policy" ON "Signature" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Signature";

CREATE POLICY bypass_rls_policy ON "Signature" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Booking

ALTER TABLE "Booking" enable row level security;

ALTER TABLE "Booking" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Booking";

create policy "Entity Isolation Select Policy" ON "Booking" 
  for select TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "Booking";

create policy "Entity Isolation Insert Policy" ON "Booking" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "Booking";

create policy "Entity Isolation Update Policy" ON "Booking" 
  for update TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "Booking";

create policy "Entity Isolation Delete Policy" ON "Booking" 
  for delete TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "Booking";

CREATE POLICY bypass_rls_policy ON "Booking" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


--Client

ALTER TABLE "Client" enable row level security;

ALTER TABLE "Client" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Client";

create policy "Entity Isolation Select Policy" ON "Client" 
  for select TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Client";

create policy "Entity Isolation Insert Policy" ON "Client" 
  for insert TO anon, authenticated, rls_user
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Client";

create policy "Entity Isolation Update Policy" ON "Client" 
  for update TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Client";

create policy "Entity Isolation Delete Policy" ON "Client" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Client";

CREATE POLICY bypass_rls_policy ON "Client" TO anon, authenticated, rls_user
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- ClientConsent

ALTER TABLE "ClientConsent" enable row level security;

ALTER TABLE "ClientConsent" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ClientConsent";

create policy "Entity Isolation Select Policy" ON "ClientConsent" 
  for select TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "ClientConsent";

create policy "Entity Isolation Insert Policy" ON "ClientConsent" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ClientConsent";

create policy "Entity Isolation Update Policy" ON "ClientConsent" 
  for update TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "ClientConsent";

create policy "Entity Isolation Delete Policy" ON "ClientConsent" 
  for delete TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "ClientConsent";

CREATE POLICY bypass_rls_policy ON "ClientConsent" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- ClientTag

ALTER TABLE "ClientTag" enable row level security;

ALTER TABLE "ClientTag" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ClientTag";

create policy "Entity Isolation Select Policy" ON "ClientTag" 
  for select TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "ClientTag";

create policy "Entity Isolation Insert Policy" ON "ClientTag" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ClientTag";

create policy "Entity Isolation Update Policy" ON "ClientTag" 
  for update TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "ClientTag";

create policy "Entity Isolation Delete Policy" ON "ClientTag" 
  for delete TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "ClientTag";

CREATE POLICY bypass_rls_policy ON "ClientTag" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- ClientQuestionnaire

ALTER TABLE "ClientQuestionnaire" enable row level security;

ALTER TABLE "ClientQuestionnaire" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ClientQuestionnaire";

create policy "Entity Isolation Select Policy" ON "ClientQuestionnaire" 
  for select TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "ClientQuestionnaire";

create policy "Entity Isolation Insert Policy" ON "ClientQuestionnaire" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ClientQuestionnaire";

create policy "Entity Isolation Update Policy" ON "ClientQuestionnaire" 
  for update TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "ClientQuestionnaire";

create policy "Entity Isolation Delete Policy" ON "ClientQuestionnaire" 
  for delete TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "ClientQuestionnaire";

CREATE POLICY bypass_rls_policy ON "ClientQuestionnaire" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Note

ALTER TABLE "Note" enable row level security;

ALTER TABLE "Note" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Note";

create policy "Entity Isolation Select Policy" ON "Note" 
  for select TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "Note";

create policy "Entity Isolation Insert Policy" ON "Note" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "Note";

create policy "Entity Isolation Update Policy" ON "Note" 
  for update TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "Note";

create policy "Entity Isolation Delete Policy" ON "Note" 
  for delete TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "Note";

CREATE POLICY bypass_rls_policy ON "Note" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Message

ALTER TABLE "Message" enable row level security;

ALTER TABLE "Message" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Message";

create policy "Entity Isolation Select Policy" ON "Message" 
  for select TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "Message";

create policy "Entity Isolation Insert Policy" ON "Message" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "Message";

create policy "Entity Isolation Update Policy" ON "Message" 
  for update TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "Message";

create policy "Entity Isolation Delete Policy" ON "Message" 
  for delete TO anon, authenticated, rls_user 
    USING ("clientId" in (select "id" from "Client" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "Message";

CREATE POLICY bypass_rls_policy ON "Message" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--Tag

ALTER TABLE "Tag" enable row level security;

ALTER TABLE "Tag" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Tag";

create policy "Entity Isolation Select Policy" ON "Tag" 
  for select TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Tag";

create policy "Entity Isolation Insert Policy" ON "Tag" 
  for insert TO anon, authenticated, rls_user
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Tag";

create policy "Entity Isolation Update Policy" ON "Tag" 
  for update TO anon, authenticated, rls_user
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Tag";

create policy "Entity Isolation Delete Policy" ON "Tag" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Tag";

CREATE POLICY bypass_rls_policy ON "Tag" TO anon, authenticated, rls_user
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');



-- UserNote

ALTER TABLE "UserNote" enable row level security;

ALTER TABLE "UserNote" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "UserNote";

create policy "Entity Isolation Select Policy" ON "UserNote" 
  for select TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "UserNote";

create policy "Entity Isolation Insert Policy" ON "UserNote" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "UserNote";

create policy "Entity Isolation Update Policy" ON "UserNote" 
  for update TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "UserNote";

create policy "Entity Isolation Delete Policy" ON "UserNote" 
  for delete TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "UserNote";

CREATE POLICY bypass_rls_policy ON "UserNote" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- UserHour

ALTER TABLE "UserHour" enable row level security;

ALTER TABLE "UserHour" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "UserHour";

create policy "Entity Isolation Select Policy" ON "UserHour" 
  for select TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "UserHour";

create policy "Entity Isolation Insert Policy" ON "UserHour" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "UserHour";

create policy "Entity Isolation Update Policy" ON "UserHour" 
  for update TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "UserHour";

create policy "Entity Isolation Delete Policy" ON "UserHour" 
  for delete TO anon, authenticated, rls_user 
    USING ("userId" in (select "id" from "User" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "UserHour";

CREATE POLICY bypass_rls_policy ON "UserHour" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Record

ALTER TABLE "Record" enable row level security;

ALTER TABLE "Record" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Record";

create policy "Entity Isolation Select Policy" ON "Record" 
  for select TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "Record";

create policy "Entity Isolation Insert Policy" ON "Record" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "Record";

create policy "Entity Isolation Update Policy" ON "Record" 
  for update TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "Record";

create policy "Entity Isolation Delete Policy" ON "Record" 
  for delete TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "Record";

CREATE POLICY bypass_rls_policy ON "Record" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


-- Service

ALTER TABLE "Service" enable row level security;

ALTER TABLE "Service" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Service";

create policy "Entity Isolation Select Policy" ON "Service" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Service";

create policy "Entity Isolation Insert Policy" ON "Service" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Service";

create policy "Entity Isolation Update Policy" ON "Service" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Service";

create policy "Entity Isolation Delete Policy" ON "Service" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Service";

CREATE POLICY bypass_rls_policy ON "Service" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


-- EntityIntegration

ALTER TABLE "EntityIntegration" enable row level security;

ALTER TABLE "EntityIntegration" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "EntityIntegration";

create policy "Entity Isolation Select Policy" ON "EntityIntegration" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "EntityIntegration";

create policy "Entity Isolation Insert Policy" ON "EntityIntegration" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "EntityIntegration";

create policy "Entity Isolation Update Policy" ON "EntityIntegration" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "EntityIntegration";

create policy "Entity Isolation Delete Policy" ON "EntityIntegration" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "EntityIntegration";

CREATE POLICY bypass_rls_policy ON "EntityIntegration" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- IntegrationList

ALTER TABLE "IntegrationList" enable row level security;

ALTER TABLE "IntegrationList" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "IntegrationList";

create policy "Entity Isolation Select Policy" ON "IntegrationList" 
  for select TO anon, authenticated, rls_user 
    USING ("integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "IntegrationList";

create policy "Entity Isolation Insert Policy" ON "IntegrationList" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "IntegrationList";

create policy "Entity Isolation Update Policy" ON "IntegrationList" 
  for update TO anon, authenticated, rls_user 
    USING ("integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "IntegrationList";

create policy "Entity Isolation Delete Policy" ON "IntegrationList" 
  for delete TO anon, authenticated, rls_user 
    USING ("integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id()));

drop policy if exists "bypass_rls_policy" ON "IntegrationList";

CREATE POLICY bypass_rls_policy ON "IntegrationList" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- IntegrationTag

ALTER TABLE "IntegrationTag" enable row level security;

ALTER TABLE "IntegrationTag" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "IntegrationTag";

create policy "Entity Isolation Select Policy" ON "IntegrationTag" 
  for select TO anon, authenticated, rls_user 
    USING ("integrationListId" in 
      (select "id" from "IntegrationList" WHERE "integrationId" in
        (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id())));

drop policy if exists "Entity Isolation Insert Policy" ON "IntegrationTag";

create policy "Entity Isolation Insert Policy" ON "IntegrationTag" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("integrationListId" in 
      (select "id" from "IntegrationList" WHERE "integrationId" in
        (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id())));

drop policy if exists "Entity Isolation Update Policy" ON "IntegrationTag";

create policy "Entity Isolation Update Policy" ON "IntegrationTag" 
  for update TO anon, authenticated, rls_user 
    USING ("integrationListId" in (select "id" from "IntegrationList" WHERE "integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id())))
    WITH CHECK ("integrationListId" in (select "id" from "IntegrationList" WHERE "integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id())));

drop policy if exists "Entity Isolation Delete Policy" ON "IntegrationTag";

 create policy "Entity Isolation Delete Policy" ON "IntegrationTag" 
   for delete TO anon, authenticated, rls_user 
     USING ("integrationListId" in (select "id" from "IntegrationList" WHERE "integrationId" in (select "id" from "EntityIntegration" WHERE "entityId" = get_entity_id())));

drop policy if exists "bypass_rls_policy" ON "IntegrationTag";

CREATE POLICY bypass_rls_policy ON "IntegrationTag" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Form

ALTER TABLE "Form" enable row level security;

ALTER TABLE "Form" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Form";

create policy "Entity Isolation Select Policy" ON "Form" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Form";

create policy "Entity Isolation Insert Policy" ON "Form" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Form";

create policy "Entity Isolation Update Policy" ON "Form" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Form";

create policy "Entity Isolation Delete Policy" ON "Form" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Form";

CREATE POLICY bypass_rls_policy ON "Form" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Field

ALTER TABLE "Field" enable row level security;

ALTER TABLE "Field" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Field";

create policy "Entity Isolation Select Policy" ON "Field" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Field";

 create policy "Entity Isolation Insert Policy" ON "Field" 
   for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Field";

create policy "Entity Isolation Update Policy" ON "Field" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Field";

create policy "Entity Isolation Delete Policy" ON "Field" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Field";

CREATE POLICY bypass_rls_policy ON "Field" TO anon, authenticated, rls_user USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- Product

ALTER TABLE "Product" enable row level security;

ALTER TABLE "Product" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Product";

create policy "Entity Isolation Select Policy" ON "Product" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Product";

create policy "Entity Isolation Insert Policy" ON "Product" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Product";

create policy "Entity Isolation Update Policy" ON "Product" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Product";

create policy "Entity Isolation Delete Policy" ON "Product" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Product";

CREATE POLICY bypass_rls_policy ON "Product" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- ProductType

ALTER TABLE "ProductType" enable row level security;

ALTER TABLE "ProductType" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductType";

create policy "Entity Isolation Select Policy" ON "ProductType" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "ProductType";

create policy "Entity Isolation Insert Policy" ON "ProductType" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "ProductType";

create policy "Entity Isolation Update Policy" ON "ProductType" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "ProductType";

create policy "Entity Isolation Delete Policy" ON "ProductType" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "ProductType";

CREATE POLICY bypass_rls_policy ON "ProductType" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


-- ProductPrice

ALTER TABLE "ProductPrice" enable row level security;

ALTER TABLE "ProductPrice" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductPrice";

create policy "Entity Isolation Select Policy" ON "ProductPrice" 
  for select TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "ProductPrice";

create policy "Entity Isolation Insert Policy" ON "ProductPrice" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ProductPrice";

create policy "Entity Isolation Update Policy" ON "ProductPrice" 
  for update TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "ProductPrice";

create policy "Entity Isolation Delete Policy" ON "ProductPrice" 
  for delete TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));
    

drop policy if exists "bypass_rls_policy" ON "ProductPrice";

CREATE POLICY bypass_rls_policy ON "ProductPrice" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

-- ProductDiscount

ALTER TABLE "ProductDiscount" enable row level security;

ALTER TABLE "ProductDiscount" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductDiscount";

create policy "Entity Isolation Select Policy" ON "ProductDiscount" 
  for select TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "ProductDiscount";

create policy "Entity Isolation Insert Policy" ON "ProductDiscount" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ProductDiscount";

create policy "Entity Isolation Update Policy" ON "ProductDiscount" 
  for update TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "ProductDiscount";

create policy "Entity Isolation Delete Policy" ON "ProductDiscount" 
  for delete TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));
    

drop policy if exists "bypass_rls_policy" ON "ProductDiscount";

CREATE POLICY bypass_rls_policy ON "ProductDiscount" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


-- TextTemplate

ALTER TABLE "TextTemplate" enable row level security;

ALTER TABLE "TextTemplate" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "TextTemplate";

create policy "Entity Isolation Select Policy" ON "TextTemplate" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "TextTemplate";

 create policy "Entity Isolation Insert Policy" ON "TextTemplate" 
   for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "TextTemplate";

create policy "Entity Isolation Update Policy" ON "TextTemplate" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "TextTemplate";

create policy "Entity Isolation Delete Policy" ON "TextTemplate" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "TextTemplate";

CREATE POLICY bypass_rls_policy ON "TextTemplate" TO anon, authenticated, rls_user USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


--Location

ALTER TABLE "Location" enable row level security;

ALTER TABLE "Location" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Location";

create policy "Entity Isolation Select Policy" ON "Location" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Location";

create policy "Entity Isolation Insert Policy" ON "Location" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Location";

create policy "Entity Isolation Update Policy" ON "Location" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Location";

create policy "Entity Isolation Delete Policy" ON "Location" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Location";

CREATE POLICY bypass_rls_policy ON "Location" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--LocationHours

ALTER TABLE "LocationHours" enable row level security;

ALTER TABLE "LocationHours" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "LocationHours";

create policy "Entity Isolation Select Policy" ON "LocationHours" 
  for select TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "LocationHours";

create policy "Entity Isolation Insert Policy" ON "LocationHours" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "LocationHours";

create policy "Entity Isolation Update Policy" ON "LocationHours" 
  for update TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "LocationHours";

create policy "Entity Isolation Delete Policy" ON "LocationHours" 
  for delete TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));
    

drop policy if exists "bypass_rls_policy" ON "LocationHours";

CREATE POLICY bypass_rls_policy ON "LocationHours" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

  --Room

ALTER TABLE "Room" enable row level security;

ALTER TABLE "Room" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Room";

create policy "Entity Isolation Select Policy" ON "Room" 
  for select TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Insert Policy" ON "Room";

create policy "Entity Isolation Insert Policy" ON "Room" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "Room";

create policy "Entity Isolation Update Policy" ON "Room" 
  for update TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Delete Policy" ON "Room";

create policy "Entity Isolation Delete Policy" ON "Room" 
  for delete TO anon, authenticated, rls_user 
    USING ("locationId" in (select "id" from "Location" WHERE "entityId" = get_entity_id()));
    

drop policy if exists "bypass_rls_policy" ON "Room";

CREATE POLICY bypass_rls_policy ON "Room" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');


--ServicesOnRooms

ALTER TABLE "ServicesOnRooms" enable row level security;

ALTER TABLE "ServicesOnRooms" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnRooms";

create policy "Entity Isolation Select Policy" ON "ServicesOnRooms" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnRooms";

 create policy "Entity Isolation Insert Policy" ON "ServicesOnRooms" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnRooms";

 create policy "Entity Isolation Delete Policy" ON "ServicesOnRooms" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ServicesOnRooms";

CREATE POLICY bypass_rls_policy ON "ServicesOnRooms" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ServiceAddon

ALTER TABLE "ServiceAddon" enable row level security;

ALTER TABLE "ServiceAddon" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServiceAddon";

create policy "Entity Isolation Select Policy" ON "ServiceAddon" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ServiceAddon";

 create policy "Entity Isolation Insert Policy" ON "ServiceAddon" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ServiceAddon";

 create policy "Entity Isolation Delete Policy" ON "ServiceAddon" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ServiceAddon";

CREATE POLICY bypass_rls_policy ON "ServiceAddon" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ServicesOnRecords

ALTER TABLE "ServicesOnRecords" enable row level security;

ALTER TABLE "ServicesOnRecords" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnRecords";

create policy "Entity Isolation Select Policy" ON "ServicesOnRecords" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnRecords";

 create policy "Entity Isolation Insert Policy" ON "ServicesOnRecords" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnRecords";

 create policy "Entity Isolation Delete Policy" ON "ServicesOnRecords" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ServicesOnRecords";

CREATE POLICY bypass_rls_policy ON "ServicesOnRecords" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ServicesOnLocations

ALTER TABLE "ServicesOnLocations" enable row level security;

ALTER TABLE "ServicesOnLocations" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnLocations";

create policy "Entity Isolation Select Policy" ON "ServicesOnLocations" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnLocations";

 create policy "Entity Isolation Insert Policy" ON "ServicesOnLocations" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnLocations";

 create policy "Entity Isolation Delete Policy" ON "ServicesOnLocations" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ServicesOnLocations";

CREATE POLICY bypass_rls_policy ON "ServicesOnLocations" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ServicesOnBookings

ALTER TABLE "ServicesOnBookings" enable row level security;

ALTER TABLE "ServicesOnBookings" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnBookings";

create policy "Entity Isolation Select Policy" ON "ServicesOnBookings" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnBookings";

 create policy "Entity Isolation Insert Policy" ON "ServicesOnBookings" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnBookings";

 create policy "Entity Isolation Delete Policy" ON "ServicesOnBookings" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ServicesOnBookings";

CREATE POLICY bypass_rls_policy ON "ServicesOnBookings" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--FormsOnServices

-- ALTER TABLE "FormsOnServices" enable row level security;

-- ALTER TABLE "FormsOnServices" FORCE ROW LEVEL SECURITY;

-- drop policy if exists "Entity Isolation Select Policy" ON "FormsOnServices";

-- create policy "Entity Isolation Select Policy" ON "FormsOnServices" 
--   for select TO anon, authenticated, rls_user 
--     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

--  drop policy if exists "Entity Isolation Insert Policy" ON "FormsOnServices";

--  create policy "Entity Isolation Insert Policy" ON "FormsOnServices" 
--    for insert TO anon, authenticated, rls_user 
--      WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

--  drop policy if exists "Entity Isolation Delete Policy" ON "FormsOnServices";

--  create policy "Entity Isolation Delete Policy" ON "FormsOnServices" 
--    for delete TO anon, authenticated, rls_user 
--      USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
-- drop policy if exists "bypass_rls_policy" ON "FormsOnServices";

-- CREATE POLICY bypass_rls_policy ON "FormsOnServices" TO anon, authenticated, rls_user 
--   USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--Category

ALTER TABLE "Category" enable row level security;

ALTER TABLE "Category" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Category";

create policy "Entity Isolation Select Policy" ON "Category" 
  for select TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Insert Policy" ON "Category";

create policy "Entity Isolation Insert Policy" ON "Category" 
  for insert TO anon, authenticated, rls_user 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Update Policy" ON "Category";

create policy "Entity Isolation Update Policy" ON "Category" 
  for update TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) 
    WITH CHECK ("entityId" = get_entity_id());

drop policy if exists "Entity Isolation Delete Policy" ON "Category";

create policy "Entity Isolation Delete Policy" ON "Category" 
  for delete TO anon, authenticated, rls_user 
    USING ("entityId" = get_entity_id()) ;

drop policy if exists "bypass_rls_policy" ON "Category";

CREATE POLICY bypass_rls_policy ON "Category" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--LetterOfConsent

-- ALTER TABLE "LetterOfConsent" enable row level security;

-- ALTER TABLE "LetterOfConsent" FORCE ROW LEVEL SECURITY;

-- drop policy if exists "Entity Isolation Select Policy" ON "LetterOfConsent";

-- create policy "Entity Isolation Select Policy" ON "LetterOfConsent" 
--   for select TO anon, authenticated, rls_user 
--     USING ("entityId" = get_entity_id());

-- drop policy if exists "Entity Isolation Insert Policy" ON "LetterOfConsent";

-- create policy "Entity Isolation Insert Policy" ON "LetterOfConsent" 
--   for insert TO anon, authenticated, rls_user 
--     WITH CHECK ("entityId" = get_entity_id());

-- drop policy if exists "Entity Isolation Update Policy" ON "LetterOfConsent";

-- create policy "Entity Isolation Update Policy" ON "LetterOfConsent" 
--   for update TO anon, authenticated, rls_user 
--     USING ("entityId" = get_entity_id()) 
--     WITH CHECK ("entityId" = get_entity_id());

-- drop policy if exists "Entity Isolation Delete Policy" ON "LetterOfConsent";

-- create policy "Entity Isolation Delete Policy" ON "LetterOfConsent" 
--   for delete TO anon, authenticated, rls_user 
--     USING ("entityId" = get_entity_id()) ;

-- drop policy if exists "bypass_rls_policy" ON "LetterOfConsent";

-- CREATE POLICY bypass_rls_policy ON "LetterOfConsent" TO anon, authenticated, rls_user 
--   USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ConsentsOnServices

ALTER TABLE "ConsentsOnServices" enable row level security;

ALTER TABLE "ConsentsOnServices" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ConsentsOnServices";

create policy "Entity Isolation Select Policy" ON "ConsentsOnServices" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ConsentsOnServices";

 create policy "Entity Isolation Insert Policy" ON "ConsentsOnServices" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ConsentsOnServices";

 create policy "Entity Isolation Delete Policy" ON "ConsentsOnServices" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ConsentsOnServices";

CREATE POLICY bypass_rls_policy ON "ConsentsOnServices" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--ProductsOnServices

ALTER TABLE "ProductsOnServices" enable row level security;

ALTER TABLE "ProductsOnServices" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductsOnServices";

create policy "Entity Isolation Select Policy" ON "ProductsOnServices" 
  for select TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Insert Policy" ON "ProductsOnServices";

 create policy "Entity Isolation Insert Policy" ON "ProductsOnServices" 
   for insert TO anon, authenticated, rls_user 
     WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

drop policy if exists "Entity Isolation Update Policy" ON "ProductsOnServices";

create policy "Entity Isolation Update Policy" ON "ProductsOnServices" 
  for update TO anon, authenticated, rls_user 
    USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()))
    WITH CHECK ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));

 drop policy if exists "Entity Isolation Delete Policy" ON "ProductsOnServices";

 create policy "Entity Isolation Delete Policy" ON "ProductsOnServices" 
   for delete TO anon, authenticated, rls_user 
     USING ("serviceId" in (select "id" from "Service" WHERE "entityId" = get_entity_id()));
    
drop policy if exists "bypass_rls_policy" ON "ProductsOnServices";

CREATE POLICY bypass_rls_policy ON "ProductsOnServices" TO anon, authenticated, rls_user 
  USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

--entity-public bucket storage

drop policy if exists "Bucket Storage entity-public Select Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-public Select Policy" 
ON storage.objects FOR SELECT TO authenticated
USING ((bucket_id = 'entity-public'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-public Insert Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-public Insert Policy" 
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ((bucket_id = 'entity-public'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-public Update Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-public Update Policy" 
ON storage.objects FOR UPDATE TO authenticated
    USING ((bucket_id = 'entity-public'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]))
    WITH CHECK ((bucket_id = 'entity-public'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-public Delete Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-public Delete Policy" 
ON storage.objects FOR DELETE TO authenticated
USING ((bucket_id = 'entity-public'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

--entity-private bucket storage

drop policy if exists "Bucket Storage entity-private Select Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-private Select Policy" 
ON storage.objects FOR SELECT TO authenticated
USING ((bucket_id = 'entity-private'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-private Insert Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-private Insert Policy" 
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ((bucket_id = 'entity-private'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-private Update Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-private Update Policy" 
ON storage.objects FOR UPDATE TO authenticated
    USING ((bucket_id = 'entity-private'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]))
    WITH CHECK ((bucket_id = 'entity-private'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));

drop policy if exists "Bucket Storage entity-private Delete Policy" ON storage.objects;

CREATE POLICY "Bucket Storage entity-private Delete Policy" 
ON storage.objects FOR DELETE TO authenticated
USING ((bucket_id = 'entity-private'::text) AND ((get_entity_id())::text = (storage.foldername(name))[1]));


--((bucket_id = 'kanzei'::text) AND ((auth.uid())::text = (storage.foldername(name))[2]) AND ((get_entity_id())::text = (storage.foldername(name))[1]))