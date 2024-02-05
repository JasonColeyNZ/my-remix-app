-- enable citext for case insensitive text
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "ModuleIdentifier" AS ENUM ('BookingSettings', 'Bookings', 'CategoriesSettings', 'Client', 'ClientMgmt', 'ClientRecordMgmt', 'ClientSettings', 'CompanySettings', 'Dashboard', 'FormsSettings', 'ProductsSettings', 'SecurityRoleSettings', 'ServicesSettings', 'Team', 'TeamMemberSchedule', 'TeamMgmt', 'TeamRoleMgmt', 'TeamSchedule');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CREATE TYPE "ModuleIdentifier" AS ENUM ('BookingSettings', 'Bookings', 'CategoriesSettings', 'Client', 'ClientMgmt', 'ClientRecordMgmt', 'ClientSettings', 'CompanySettings', 'Dashboard', 'FormsSettings', 'ProductsSettings', 'SecurityRoleSettings', 'ServicesSettings', 'Team', 'TeamMemberSchedule', 'TeamMgmt', 'TeamRoleMgmt', 'TeamSchedule');

-- SUPABASE Custom Claims

CREATE OR REPLACE FUNCTION is_claims_admin() RETURNS "bool"
  LANGUAGE "plpgsql" 
  AS $$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF; 
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;

CREATE OR REPLACE FUNCTION get_my_claims() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$$;

CREATE OR REPLACE FUNCTION get_my_claim(claim TEXT) RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$$;

CREATE OR REPLACE FUNCTION get_entity_id() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  
  select 
  	uuid(btrim(coalesce(nullif(current_setting('request.jwt.claims', true), '')::json -> 'app_metadata' -> 'entityId', null)::text,'"'))
$$;

CREATE OR REPLACE FUNCTION get_claims(uid uuid) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;

CREATE OR REPLACE FUNCTION get_claim(uid uuid, claim text) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;

CREATE OR REPLACE FUNCTION set_claim(uid uuid, claim text, value jsonb) RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$$;

CREATE OR REPLACE FUNCTION delete_claim(uid uuid, claim text) RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER SET search_path = public
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$$;

CREATE OR REPLACE FUNCTION roles_add_module(name text, module_identifier "ModuleIdentifier", description text) RETURNS void
    LANGUAGE "plpgsql" SECURITY INVOKER SET search_path = public
    AS $$
    declare
  moduleid uuid;

    BEGIN
      IF NOT is_claims_admin() THEN
          RAISE EXCEPTION 'error: access denied';
      ELSE        
        SELECT "id" FROM "Module" WHERE "Module"."name" = $1 INTO moduleid;
        
        IF moduleid is null THEN       
          insert into "Module" ("name", "moduleIdentifier", "description") values (name, module_identifier, description);
        END IF;
      END IF;
    END;

$$;

CREATE
OR REPLACE FUNCTION roles_add_permission (name text, description text) RETURNS void LANGUAGE "plpgsql" SECURITY INVOKER
SET
  search_path = public AS $$
    DECLARE
      permissionid uuid;

    BEGIN
      IF NOT is_claims_admin() THEN
          RAISE EXCEPTION 'error: access denied';
      ELSE        
        select "id" from "Permission" where "Permission"."name"=$1 INTO permissionid;
        IF permissionid is null THEN
        insert into "Permission" ("name", "description") values (name, description);
        END IF;
      END IF;
    END;

$$;

CREATE
OR REPLACE FUNCTION roles_populate_module_permissions (module_name text, permission_name text) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  _permissionid uuid;
  _moduleid uuid;
  modulePermissionId uuid;
BEGIN
  SELECT id INTO _moduleid FROM "Module" WHERE "Module".name = module_name;

  SELECT id 
    INTO _permissionid 
    FROM "Permission" 
    WHERE "Permission".name = permission_name;

  SELECT "id" 
    FROM "ModulePermission" 
    WHERE "ModulePermission"."moduleId"=_moduleid 
      AND "ModulePermission"."permissionId"=_permissionid 
      INTO modulepermissionid;


   IF modulepermissionid IS NULL THEN
     INSERT INTO "ModulePermission"("moduleId", "permissionId") VALUES (_moduleid, _permissionid);
   END IF;

END;

$$;

CREATE
OR REPLACE FUNCTION role_settings () RETURNS table (moduleIdentifier text) LANGUAGE plpgsql SECURITY INVOKER as $$

DECLARE
  _role_id uuid;
  _moduleid uuid;
  modulePermissionId uuid;
BEGIN
  RETURN QUERY SELECT CONCAT("j3"."moduleIdentifier", '|', string_agg("j2"."name",',')) FROM (
SELECT "moduleId","permissionId" FROM "ModulePermission" where "ModulePermission"."id" in (
SELECT "RolePermission"."modulePermissionId" FROM "RolePermission" where "RolePermission"."roleId" = (
SELECT id FROM "Role" WHERE id IN (SELECT "User"."roleId" FROM "User" WHERE id=auth.uid())))) j1
LEFT JOIN LATERAL (SELECT "id", "name" FROM "Permission") j2 ON "j1"."permissionId" = "j2"."id"
LEFT JOIN LATERAL (SELECT "id", "moduleIdentifier" FROM "Module") j3 ON "j1"."moduleId" = "j3"."id"
GROUP BY "j3"."moduleIdentifier";

END;

$$;

CREATE
OR REPLACE FUNCTION roles_build_owner_role (entity_id uuid, user_id uuid ) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER as $$

DECLARE
  _role_id uuid;
BEGIN

  -- Create the Owner Role
  INSERT INTO "Role" 
    ("entityId", "name", "description") 
  VALUES 
    (entity_id, 'Owner Role', 'This role cannot be modified and there must be at least one User with this Role') 
  RETURNING "Role"."id" INTO _role_id; 

  -- Add all the ModulePermissions to the new Role
  INSERT INTO "RolePermission" 
    ("modulePermissionId", "roleId") 
  SELECT "id", _role_id FROM "ModulePermission";
  
  -- Add the owner role to the user
  UPDATE "User" SET "roleId" = _role_id WHERE "id" = user_id; 
  
  RETURN _role_id;

END;

$$;

CREATE OR REPLACE FUNCTION demo_install(dest_entity_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
	_new_location_id uuid;
	_service_entity_id uuid;
	_client_form_id uuid;
	_member_form_id uuid;
	_b record;
	_service1_id uuid;
	_service2_id uuid;
	_client_id uuid;
	_user_id uuid;
	_new_booking_id uuid;
	_startDate TIMESTAMP;
	_endDate TIMESTAMP;
BEGIN

SELECT "id" FROM "Entity" WHERE "name" = 'EMS System' INTO _service_entity_id;

-- Location
INSERT INTO 
 	"Location" ("entityId", "name", "mobileNumber", "workNumber", "demo")
 	SELECT dest_entity_id, "name", "mobileNumber", "workNumber", "demo"
 	FROM "Location"
 	WHERE "entityId" = _service_entity_id AND "demo" = true RETURNING "id" INTO _new_location_id;
	
-- Location Hours
INSERT INTO
 	"LocationHours" ("locationId", "dayOfWeek", "start", "end", "include")
	SELECT _new_location_id, "dayOfWeek", "start", "end", "include" FROM "LocationHours"
		INNER JOIN (
			SELECT "id" lh_id 
			FROM "Location" 
			WHERE "entityId" = _service_entity_id AND "demo" = true) loc 
			ON loc.lh_id = "locationId"; 

-- Create Rooms
INSERT INTO 
	"Room" ("locationId", "name")
	SELECT _new_location_id, "Room"."name"
	FROM "Room" 
	INNER JOIN 
		(SELECT "id" 
		 FROM "Location" 
		 WHERE "entityId" = _service_entity_id AND "demo" = true) AS old_loc 
		 ON "locationId"=old_loc.id;

--Product Types
INSERT INTO 
	"ProductType" ("entityId", "name", "demo")
	SELECT dest_entity_id, "name", "demo"
	FROM "ProductType"
	WHERE "entityId" = _service_entity_id AND "demo" = true;

-- Products
INSERT INTO
	"Product" ("entityId", "name", "description", "unitOfMeasure", "productTypeId", "demo")
	SELECT dest_entity_id, "name", "description", "unitOfMeasure", "productTypeId", "demo"
	FROM "Product"
	WHERE "entityId" = _service_entity_id AND "demo" = true;
	
--UPDATE Product Types
UPDATE "Product" AS p SET "productTypeId"=new_pt."id"
	FROM (SELECT * FROM "ProductType" WHERE "entityId" = _service_entity_id AND "demo" = true) AS orig_pt 
	LEFT JOIN (SELECT * FROM "ProductType" WHERE "entityId" = dest_entity_id AND "demo" = true) AS new_pt ON orig_pt."name"=new_pt."name"
	WHERE p."productTypeId" = orig_pt."id" AND p."entityId" = dest_entity_id AND p."demo" = true;

-- Get Member Form Id
SELECT "id" FROM "Form" WHERE "entityId" = dest_entity_id AND "area" = 'MemberDetail' INTO _member_form_id;

-- Users
INSERT INTO "User"
	("id", "entityId", "firstName", "lastName", "email", "mobileNumber", "formId", "avatarData", "demo", "onboardingStatus")
	SELECT gen_random_uuid(), dest_entity_id, "firstName", "lastName", "email", "mobileNumber", _member_form_id, "avatarData", "demo", "onboardingStatus" 
	FROM "User" 
	WHERE "entityId" = _service_entity_id AND "demo" = true;

-- Get Client Form Id
SELECT "id" FROM "Form" WHERE "entityId" = dest_entity_id AND "area" = 'ClientDetail' INTO _client_form_id;

-- Clients
INSERT INTO "Client"
	("entityId", "firstName", "lastName", "email", "mobileNumber", "workNumber", "formId", "avatarData", "demo") 
	SELECT dest_entity_id, "firstName", "lastName", "email", "mobileNumber", "workNumber", _client_form_id, "avatarData", "demo" 
	FROM "Client" 
	WHERE "entityId" = _service_entity_id AND "demo" = true;
	
-- Service Forms
INSERT INTO	"Form"
	("entityId", "name", "description", "area", "formDefinition", "demo")
	SELECT dest_entity_id, "name", "description", "area", "formDefinition", "demo"
	FROM "Form"
	WHERE "entityId" = _service_entity_id AND "demo" = true AND "area" = 'ClientConsent';

INSERT INTO	"Form"
	("entityId", "name", "description", "area", "formDefinition", "demo")
	SELECT dest_entity_id, "name", "description", "area", "formDefinition", "demo"
	FROM "Form"
	WHERE "entityId" = _service_entity_id AND "demo" = true AND "area" = 'ClientQuestionnaire';

-- Service Categories
INSERT INTO "Category"
	("entityId", "name", "color", "textColor", "demo")
	SELECT dest_entity_id, "name", "color", "textColor", "demo"
	FROM "Category"
	WHERE "entityId" = _service_entity_id AND "demo" = true;
	
-- Services
INSERT INTO "Service"
	("entityId", "name", "price", "color", "textColor", "duration", "timeMargin", "timeMarginDescription", 
	 	"maximumConcurrentBookings", "description", "categoryId", "demo")
	SELECT dest_entity_id, "name", "price", "color", "textColor", "duration", "timeMargin", "timeMarginDescription", 
	 	"maximumConcurrentBookings", "description", "categoryId", "demo"
	FROM "Service"
	WHERE "entityId" = _service_entity_id AND "demo" = true;
	
-- UPDATE Service Categories
UPDATE "Service" AS s SET "categoryId"=new_c."id"
	FROM (SELECT * FROM "Category" WHERE "entityId" = _service_entity_id AND "demo" = true) AS orig_c 
	LEFT JOIN (SELECT * FROM "Category" WHERE "entityId" = dest_entity_id AND "demo" = true) AS new_c ON orig_c."name"=new_c."name"
	WHERE s."categoryId" = orig_c."id" AND s."entityId" = dest_entity_id AND s."demo" = true;

INSERT INTO "ServicesOnLocations"
	("locationId", "serviceId")
	SELECT _new_location_id, "id" 
	FROM "Service" 
	WHERE "entityId" = dest_entity_id AND "demo" = true;
	
-- ConsentsOnServices
INSERT INTO "ConsentsOnServices"
	("serviceId", "formId")
	VALUES ((SELECT "id" FROM "Service" WHERE "entityId" = dest_entity_id AND "demo" = true AND "name" = 'Sculptra'), 
	(SELECT "id" FROM "Form" WHERE "entityId" = dest_entity_id AND "demo" = true AND "name" LIKE 'Sculptra%' LIMIT 1));
	
INSERT INTO "ConsentsOnServices"
	("serviceId", "formId")
	VALUES ((SELECT "id" FROM "Service" WHERE "entityId" = dest_entity_id AND "demo" = true AND "name" = 'Micro-Needling'), 
	(SELECT "id" FROM "Form" WHERE "entityId" = dest_entity_id AND "demo" = true AND "name" LIKE 'Micro-needling%' LIMIT 1));

-- Bookings
FOR _b in SELECT * FROM "DemoClientEvent"
LOOP
	SELECT "id" FROM "Service" WHERE "name" = _b.service1 AND "entityId" = dest_entity_id AND "demo" = true INTO _service1_id;
	SELECT "id" FROM "Service" WHERE "name" = _b.service2 AND "entityId" = dest_entity_id AND "demo" = true INTO _service2_id;
	SELECT "id" FROM "Client" WHERE "email" = _b.email AND "entityId" = dest_entity_id AND "demo" = true INTO _client_id;
	SELECT "id" FROM "User" WHERE "email" = _b."teamMemberEmail" AND "entityId" = dest_entity_id INTO _user_id;
	
	SELECT CURRENT_DATE + _b."dayDifference" INTO _startDate;
	SELECT CURRENT_DATE + _b."dayDifference" INTO _endDate;
	SELECT TO_TIMESTAMP(
		CONCAT(
			DATE_PART('year', _startDate), 
			LPAD(DATE_PART('month', _startDate)::text, 2, '0'), 
			LPAD(DATE_PART('day', _startDate)::text, 2, '0'), 
			' ', 
			trunc(_b."startTime"::decimal / 60)::text, 
			':',
			LPAD((_b."startTime"::decimal - trunc(_b."startTime"::decimal / 60) * 60)::text, 2, '0')), 
		'YYYYMMDD HH24:MI') INTO _startDate;
	
	SELECT TO_TIMESTAMP(
		CONCAT(
			DATE_PART('year', _endDate), 
			LPAD(DATE_PART('month', _endDate)::text, 2, '0'), 
			LPAD(DATE_PART('day', _endDate)::text, 2, '0'), 
			' ', 
			trunc(_b."endTime"::decimal / 60)::text, 
			':',
			LPAD((_b."endTime"::decimal - trunc(_b."endTime"::decimal / 60) * 60)::text, 2, '0')), 
		'YYYYMMDD HH24:MI') INTO _endDate;
	
	
	INSERT INTO "Booking"("title", "startDate", "endDate", "allDay", "clientId", "userId", "createdBy", "status")
	VALUES ('Demo Booking', _startDate, _endDate, false, _client_id, _user_id, _user_id, 'BOOKED') RETURNING "id" INTO _new_booking_id;
	
	IF _service1_id IS NOT NULL THEN
		INSERT INTO "ServicesOnBookings" ("serviceId", "bookingId") VALUES (_service1_id, _new_booking_id);
	END IF;
	
	IF _service2_id IS NOT NULL THEN
		INSERT INTO "ServicesOnBookings" ("serviceId", "bookingId") VALUES (_service2_id, _new_booking_id);
	END IF;

END LOOP;


END;

$$;

CREATE OR REPLACE FUNCTION demo_remove(dest_entity_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE 
	_demo_location_id uuid;
BEGIN
	SELECT "id" FROM "Location" WHERE "entityId" = dest_entity_id AND "demo" = true INTO _demo_location_id;
	
	DELETE FROM "LocationHours" WHERE "locationId" = _demo_location_id;

	DELETE FROM "Product" WHERE "entityId" = dest_entity_id AND "demo" = true;

	DELETE FROM "ProductType" WHERE "entityId" = dest_entity_id AND "demo" = true;

	DELETE FROM "Client" WHERE "entityId" = dest_entity_id AND "demo" = true;

	DELETE FROM "Room" WHERE "locationId" = _demo_location_id;

	DELETE FROM "Location" WHERE "id" = _demo_location_id;
	
	DELETE FROM "Form" WHERE "entityId" = dest_entity_id AND "demo" = true;
	
	DELETE FROM "Service" WHERE "entityId" = dest_entity_id AND "demo" = true;
	
	DELETE FROM "Category" WHERE "entityId" = dest_entity_id AND "demo" = true;
	
	DELETE FROM "User" WHERE "entityId" = dest_entity_id AND "demo" = true;
END;

$$;

CREATE OR REPLACE FUNCTION forms_defaults(dest_entity_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
	_service_entity_id uuid;
BEGIN

SELECT "id" FROM "Entity" WHERE "name" = 'EMS System' INTO _service_entity_id;

-- Forms
INSERT INTO
	"Form"("entityId", "name", "description", "area", "formDefinition", "demo", "default")
	SELECT dest_entity_id, "name", "description", "area", "formDefinition", "demo", "default"
	FROM "Form"
	WHERE "entityId" = _service_entity_id AND "demo" = false;
	
END;

$$;

CREATE OR REPLACE FUNCTION initial_setup(user_id uuid, first_name text, last_name text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
	_service_entity_id uuid;
	_new_entity_id uuid;
	_new_location_id uuid;
	_member_form_id uuid;
	_owner_role_id uuid;
BEGIN

SELECT "id" FROM "Entity" WHERE "name" = 'EMS System' INTO _service_entity_id;

--Find/Create Entity
SELECT "id" FROM "Entity" WHERE "ownerId" = user_id INTO _new_entity_id;

IF _new_entity_id IS NULL THEN
	INSERT INTO "Entity"
		("name", "ownerId")
		VALUES ('New Company', user_id) RETURNING "id" INTO _new_entity_id;

	--Install Default Location
	INSERT INTO "Location"
		("entityId", "name")
		VALUES (_new_entity_id, 'Default Location') RETURNING "id" INTO _new_location_id;
		
	--Install Default Location Hours
	-- Location Hours
	INSERT INTO
		"LocationHours" ("locationId", "dayOfWeek", "start", "end", "include")
		SELECT _new_location_id, "dayOfWeek", "start", "end", "include" FROM "LocationHours"
			INNER JOIN (
				SELECT "id" lh_id 
				FROM "Location" 
				WHERE "entityId" = _service_entity_id AND "demo" = true) loc 
				ON loc.lh_id = "locationId"; 

	--Install Default Forms
	PERFORM forms_defaults(_new_entity_id);

	--Build Owner Roles
 	SELECT roles_build_owner_role(_new_entity_id, user_id) INTO _owner_role_id;
END IF;	

SELECT "id" FROM "Form" WHERE "entityId" = _new_entity_id AND "area" = 'MemberDetail' INTO _member_form_id;

--Update User EntityId
UPDATE "User" SET "entityId" = _new_entity_id, "firstName" = first_name, "lastName" = last_name, "formId" = _member_form_id, "roleId" = _owner_role_id
	WHERE "id" = user_id;
	

--Update users app_metadata.entityId
UPDATE auth.users SET raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object('entityId', _new_entity_id)::jsonb 
	WHERE "id" = user_id;

END;

$$;


