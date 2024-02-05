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

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
CREATE SCHEMA IF NOT EXISTS auth;

REVOKE ALL ON SCHEMA auth FROM rls_user;
REVOKE All ON ALL TABLES IN SCHEMA auth FROM rls_user;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA auth FROM rls_user;

REASSIGN OWNED BY rls_user TO postgres;  -- or some other trusted role
DROP OWNED BY rls_user;
DROP ROLE rls_user;

CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;

--Entity

ALTER TABLE "Entity" enable row level security;

ALTER TABLE "Entity" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Entity";
drop policy if exists "Entity Isolation Insert Policy" ON "Entity";
drop policy if exists "Entity Isolation Update Policy" ON "Entity";
drop policy if exists "Entity Isolation Delete Policy" ON "Entity";
drop policy if exists "bypass_rls_policy" ON "Entity";

--User

ALTER TABLE "User" enable row level security;

ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "User";
drop policy if exists "Entity Isolation Insert Policy" ON "User";
drop policy if exists "Entity Isolation Update Policy" ON "User";
drop policy if exists "Entity Isolation Delete Policy" ON "User";
drop policy if exists "bypass_rls_policy" ON "User";

--Signature

ALTER TABLE "Signature" enable row level security;

ALTER TABLE "Signature" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Signature";
drop policy if exists "Entity Isolation Insert Policy" ON "Signature";
drop policy if exists "Entity Isolation Update Policy" ON "Signature";
drop policy if exists "Entity Isolation Delete Policy" ON "Signature";
drop policy if exists "bypass_rls_policy" ON "Signature";

-- Booking

ALTER TABLE "Booking" enable row level security;

ALTER TABLE "Booking" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Booking";
drop policy if exists "Entity Isolation Insert Policy" ON "Booking";
drop policy if exists "Entity Isolation Update Policy" ON "Booking";
drop policy if exists "Entity Isolation Delete Policy" ON "Booking";
drop policy if exists "bypass_rls_policy" ON "Booking";

--Client

ALTER TABLE "Client" enable row level security;

ALTER TABLE "Client" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Client";
drop policy if exists "Entity Isolation Insert Policy" ON "Client";
drop policy if exists "Entity Isolation Update Policy" ON "Client";
drop policy if exists "Entity Isolation Delete Policy" ON "Client";
drop policy if exists "bypass_rls_policy" ON "Client";

-- ClientConsent

ALTER TABLE "ClientConsent" enable row level security;

ALTER TABLE "ClientConsent" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ClientConsent";
drop policy if exists "Entity Isolation Insert Policy" ON "ClientConsent";
drop policy if exists "Entity Isolation Update Policy" ON "ClientConsent";
drop policy if exists "Entity Isolation Delete Policy" ON "ClientConsent";
drop policy if exists "bypass_rls_policy" ON "ClientConsent";

-- ClientQuestionnaire

ALTER TABLE "ClientQuestionnaire" enable row level security;

ALTER TABLE "ClientQuestionnaire" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ClientQuestionnaire";
drop policy if exists "Entity Isolation Insert Policy" ON "ClientQuestionnaire";
drop policy if exists "Entity Isolation Update Policy" ON "ClientQuestionnaire";
drop policy if exists "Entity Isolation Delete Policy" ON "ClientQuestionnaire";
drop policy if exists "bypass_rls_policy" ON "ClientQuestionnaire";

-- Note

ALTER TABLE "Note" enable row level security;

ALTER TABLE "Note" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Note";
drop policy if exists "Entity Isolation Insert Policy" ON "Note";
drop policy if exists "Entity Isolation Update Policy" ON "Note";
drop policy if exists "Entity Isolation Delete Policy" ON "Note";
drop policy if exists "bypass_rls_policy" ON "Note";

-- Message

ALTER TABLE "Message" enable row level security;

ALTER TABLE "Message" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Message";
drop policy if exists "Entity Isolation Insert Policy" ON "Message";
drop policy if exists "Entity Isolation Update Policy" ON "Message";
drop policy if exists "Entity Isolation Delete Policy" ON "Message";
drop policy if exists "bypass_rls_policy" ON "Message";

-- UserNote

ALTER TABLE "UserNote" enable row level security;

ALTER TABLE "UserNote" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "UserNote";
drop policy if exists "Entity Isolation Insert Policy" ON "UserNote";
drop policy if exists "Entity Isolation Update Policy" ON "UserNote";
drop policy if exists "Entity Isolation Delete Policy" ON "UserNote";
drop policy if exists "bypass_rls_policy" ON "UserNote";

-- UserHour

ALTER TABLE "UserHour" enable row level security;

ALTER TABLE "UserHour" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "UserHour";
drop policy if exists "Entity Isolation Insert Policy" ON "UserHour";
drop policy if exists "Entity Isolation Update Policy" ON "UserHour";
drop policy if exists "Entity Isolation Delete Policy" ON "UserHour";
drop policy if exists "bypass_rls_policy" ON "UserHour";

-- Record

ALTER TABLE "Record" enable row level security;

ALTER TABLE "Record" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Record";
drop policy if exists "Entity Isolation Insert Policy" ON "Record";
drop policy if exists "Entity Isolation Update Policy" ON "Record";
drop policy if exists "Entity Isolation Delete Policy" ON "Record";
drop policy if exists "bypass_rls_policy" ON "Record";

-- Service

ALTER TABLE "Service" enable row level security;

ALTER TABLE "Service" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Service";
drop policy if exists "Entity Isolation Insert Policy" ON "Service";
drop policy if exists "Entity Isolation Update Policy" ON "Service";
drop policy if exists "Entity Isolation Delete Policy" ON "Service";
drop policy if exists "bypass_rls_policy" ON "Service";


-- EntityIntegration

ALTER TABLE "EntityIntegration" enable row level security;

ALTER TABLE "EntityIntegration" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "EntityIntegration";
drop policy if exists "Entity Isolation Insert Policy" ON "EntityIntegration";
drop policy if exists "Entity Isolation Update Policy" ON "EntityIntegration";
drop policy if exists "Entity Isolation Delete Policy" ON "EntityIntegration";
drop policy if exists "bypass_rls_policy" ON "EntityIntegration";

-- Form

ALTER TABLE "Form" enable row level security;

ALTER TABLE "Form" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Form";
drop policy if exists "Entity Isolation Insert Policy" ON "Form";
drop policy if exists "Entity Isolation Update Policy" ON "Form";
drop policy if exists "Entity Isolation Delete Policy" ON "Form";
drop policy if exists "bypass_rls_policy" ON "Form";

-- Field

ALTER TABLE "Field" enable row level security;

ALTER TABLE "Field" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Field";
drop policy if exists "Entity Isolation Insert Policy" ON "Field";
drop policy if exists "Entity Isolation Update Policy" ON "Field";
drop policy if exists "Entity Isolation Delete Policy" ON "Field";
drop policy if exists "bypass_rls_policy" ON "Field";

-- Product

ALTER TABLE "Product" enable row level security;

ALTER TABLE "Product" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Product";
drop policy if exists "Entity Isolation Insert Policy" ON "Product";
drop policy if exists "Entity Isolation Update Policy" ON "Product";
drop policy if exists "Entity Isolation Delete Policy" ON "Product";
drop policy if exists "bypass_rls_policy" ON "Product";

-- ProductType

ALTER TABLE "ProductType" enable row level security;

ALTER TABLE "ProductType" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductType";
drop policy if exists "Entity Isolation Insert Policy" ON "ProductType";
drop policy if exists "Entity Isolation Update Policy" ON "ProductType";
drop policy if exists "Entity Isolation Delete Policy" ON "ProductType";
drop policy if exists "bypass_rls_policy" ON "ProductType";

-- ProductPrice

ALTER TABLE "ProductPrice" enable row level security;

ALTER TABLE "ProductPrice" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductPrice";
drop policy if exists "Entity Isolation Insert Policy" ON "ProductPrice";
drop policy if exists "Entity Isolation Update Policy" ON "ProductPrice";
drop policy if exists "Entity Isolation Delete Policy" ON "ProductPrice";
drop policy if exists "bypass_rls_policy" ON "ProductPrice";

-- ProductDiscount

ALTER TABLE "ProductDiscount" enable row level security;

ALTER TABLE "ProductDiscount" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ProductDiscount";
drop policy if exists "Entity Isolation Insert Policy" ON "ProductDiscount";
drop policy if exists "Entity Isolation Update Policy" ON "ProductDiscount";
drop policy if exists "Entity Isolation Delete Policy" ON "ProductDiscount";
drop policy if exists "bypass_rls_policy" ON "ProductDiscount";

-- TextTemplate

ALTER TABLE "TextTemplate" enable row level security;

ALTER TABLE "TextTemplate" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "TextTemplate";
drop policy if exists "Entity Isolation Insert Policy" ON "TextTemplate";
drop policy if exists "Entity Isolation Update Policy" ON "TextTemplate";
drop policy if exists "Entity Isolation Delete Policy" ON "TextTemplate";
drop policy if exists "bypass_rls_policy" ON "TextTemplate";

--Location

ALTER TABLE "Location" enable row level security;

ALTER TABLE "Location" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Location";
drop policy if exists "Entity Isolation Insert Policy" ON "Location";
drop policy if exists "Entity Isolation Update Policy" ON "Location";
drop policy if exists "Entity Isolation Delete Policy" ON "Location";
drop policy if exists "bypass_rls_policy" ON "Location";

--LocationHours

ALTER TABLE "LocationHours" enable row level security;

ALTER TABLE "LocationHours" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "LocationHours";
drop policy if exists "Entity Isolation Insert Policy" ON "LocationHours";
drop policy if exists "Entity Isolation Update Policy" ON "LocationHours";
drop policy if exists "Entity Isolation Delete Policy" ON "LocationHours";
drop policy if exists "bypass_rls_policy" ON "LocationHours";

--Room

ALTER TABLE "Room" enable row level security;

ALTER TABLE "Room" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Room";
drop policy if exists "Entity Isolation Insert Policy" ON "Room";
drop policy if exists "Entity Isolation Update Policy" ON "Room";
drop policy if exists "Entity Isolation Delete Policy" ON "Room";
drop policy if exists "bypass_rls_policy" ON "Room";

--ServicesOnRooms

ALTER TABLE "ServicesOnRooms" enable row level security;

ALTER TABLE "ServicesOnRooms" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnRooms";
drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnRooms";
drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnRooms";
drop policy if exists "bypass_rls_policy" ON "ServicesOnRooms";

--ServicesOnRecords

ALTER TABLE "ServicesOnRecords" enable row level security;

ALTER TABLE "ServicesOnRecords" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnRecords";
drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnRecords";
drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnRecords";
drop policy if exists "bypass_rls_policy" ON "ServicesOnRecords";

--ServicesOnLocations

ALTER TABLE "ServicesOnLocations" enable row level security;

ALTER TABLE "ServicesOnLocations" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnLocations";
drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnLocations";
drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnLocations";
drop policy if exists "bypass_rls_policy" ON "ServicesOnLocations";

--ServicesOnBookings

ALTER TABLE "ServicesOnBookings" enable row level security;

ALTER TABLE "ServicesOnBookings" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ServicesOnBookings";
drop policy if exists "Entity Isolation Insert Policy" ON "ServicesOnBookings";
drop policy if exists "Entity Isolation Delete Policy" ON "ServicesOnBookings";
drop policy if exists "bypass_rls_policy" ON "ServicesOnBookings";

--Category

ALTER TABLE "Category" enable row level security;

ALTER TABLE "Category" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "Category";
drop policy if exists "Entity Isolation Insert Policy" ON "Category";
drop policy if exists "Entity Isolation Update Policy" ON "Category";
drop policy if exists "Entity Isolation Delete Policy" ON "Category";
drop policy if exists "bypass_rls_policy" ON "Category";

--ConsentsOnServices

ALTER TABLE "ConsentsOnServices" enable row level security;

ALTER TABLE "ConsentsOnServices" FORCE ROW LEVEL SECURITY;

drop policy if exists "Entity Isolation Select Policy" ON "ConsentsOnServices";
drop policy if exists "Entity Isolation Insert Policy" ON "ConsentsOnServices";
drop policy if exists "Entity Isolation Delete Policy" ON "ConsentsOnServices";
drop policy if exists "bypass_rls_policy" ON "ConsentsOnServices";

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