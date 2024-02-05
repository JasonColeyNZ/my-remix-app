-- CreateEnum
CREATE TYPE "UserOnboarding" AS ENUM ('NOT_STARTED', 'PERSONAL_COMPLETED', 'COMPANY_COMPLETED', 'LEGAL_COMPLETED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FormArea" AS ENUM ('ClientDetail', 'ClientNote', 'ClientQuestionnaire', 'ClientRecord', 'ClientConsent', 'MemberDetail', 'MemberNote', 'Products', 'Services', 'Category');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('Client', 'User', 'Booking', 'Record');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PREPARING', 'BOOKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('EMAIL', 'SMS');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "UnitOfMeasure" AS ENUM ('each', 'pieces', 'box', 'case', 'lb', 'oz', 'kg', 'g', 'mg', 'ml', 'l', 'gal', 'qt', 'pt');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('NewClientSoliciation', 'ReactivateOldClient', 'SolicitReferrals', 'ServiceReminder');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('Email', 'SMS', 'OnlineCoupon', 'StreetSign', 'CharityEvent', 'NewspaperAdvertisement');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('Mailchimp', 'SendGrid');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entityId" UUID,
    "userPermissionId" UUID,
    "mobileNumber" TEXT,
    "homeNumber" TEXT,
    "maritalStatus" TEXT,
    "workNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "formData" JSONB,
    "formId" UUID,
    "avatarData" JSONB,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "onboardingStatus" "UserOnboarding" NOT NULL DEFAULT 'NOT_STARTED',
    "roleId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "ownerId" UUID,
    "mobileNumber" TEXT,
    "workNumber" TEXT,
    "demoDataInstalled" BOOLEAN NOT NULL DEFAULT true,
    "addressId" UUID,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "area" "FormArea" NOT NULL DEFAULT 'ClientDetail',
    "formDefinition" JSONB NOT NULL,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "default" BOOLEAN NOT NULL DEFAULT false,
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "user" BOOLEAN NOT NULL,

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT,
    "workNumber" TEXT,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "addressId" UUID,
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationHours" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dayOfWeek" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "include" BOOLEAN DEFAULT true,
    "locationId" UUID NOT NULL,

    CONSTRAINT "LocationHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHour" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dayOfWeek" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "include" BOOLEAN DEFAULT true,
    "locationId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "color" TEXT,
    "textColor" TEXT,
    "duration" TEXT NOT NULL DEFAULT '0:30',
    "timeMargin" TEXT,
    "timeMarginDescription" TEXT,
    "maximumConcurrentBookings" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "categoryId" UUID NOT NULL,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#5551CE',
    "textColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "mobileNumber" TEXT,
    "occupation" TEXT,
    "addressId" UUID,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "defaultLocationId" UUID,
    "countryOfBirth" TEXT,
    "homeNumber" TEXT,
    "maritalStatus" TEXT,
    "preferredName" TEXT,
    "workNumber" TEXT,
    "formData" JSONB,
    "formId" UUID NOT NULL,
    "avatarData" JSONB,
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" CITEXT NOT NULL,
    "tagType" "TagType" NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#5551CE',
    "textColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "integrationTagId" TEXT,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ClientTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "title" TEXT,
    "description" TEXT,
    "blockTime" BOOLEAN NOT NULL DEFAULT false,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT NOT NULL DEFAULT '#5551CE',
    "textColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "userId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PREPARING',
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "clientId" UUID NOT NULL,
    "formId" UUID NOT NULL,
    "formData" JSONB NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNote" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "formId" UUID NOT NULL,
    "formData" JSONB NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "MessageType" NOT NULL DEFAULT 'SMS',
    "status" "MessageStatus" NOT NULL DEFAULT 'SENDING',
    "clientId" UUID NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT,
    "description" TEXT,
    "totalCost" DECIMAL(65,30),
    "clientId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "totalDuration" INTEGER,
    "bloodPressure" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnServices" (
    "serviceId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UsersOnServices_pkey" PRIMARY KEY ("userId","serviceId")
);

-- CreateTable
CREATE TABLE "ServicesOnRooms" (
    "serviceId" UUID NOT NULL,
    "roomId" UUID NOT NULL,

    CONSTRAINT "ServicesOnRooms_pkey" PRIMARY KEY ("serviceId","roomId")
);

-- CreateTable
CREATE TABLE "ServicesOnLocations" (
    "serviceId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "ServicesOnLocations_pkey" PRIMARY KEY ("serviceId","locationId")
);

-- CreateTable
CREATE TABLE "ServicesOnBookings" (
    "serviceId" UUID NOT NULL,
    "bookingId" UUID NOT NULL,

    CONSTRAINT "ServicesOnBookings_pkey" PRIMARY KEY ("serviceId","bookingId")
);

-- CreateTable
CREATE TABLE "ServicesOnRecords" (
    "serviceId" UUID NOT NULL,
    "recordId" UUID NOT NULL,
    "serviceCost" DECIMAL(65,30),
    "serviceDuration" INTEGER,
    "actualCost" DECIMAL(65,30),
    "actualDuration" INTEGER,

    CONSTRAINT "ServicesOnRecords_pkey" PRIMARY KEY ("serviceId","recordId")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "streetAddress" TEXT,
    "streetAddress2" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDefaults" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "locationId" UUID,
    "clientTable" JSONB,
    "clientBookingTable" JSONB,
    "clientNoteTable" JSONB,
    "clientRecordTable" JSONB,
    "clientMessageTable" JSONB,
    "clientConsentTable" JSONB,
    "memberTable" JSONB,
    "memberNoteTable" JSONB,
    "productTable" JSONB,
    "staffView" TEXT,
    "roomView" TEXT,
    "bookingView" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserDefaults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextTemplate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" DECIMAL(65,30),
    "text" TEXT NOT NULL,
    "type" TEXT,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TextTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextsOnServices" (
    "textTemplateId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,

    CONSTRAINT "TextsOnServices_pkey" PRIMARY KEY ("textTemplateId","serviceId")
);

-- CreateTable
CREATE TABLE "ConsentsOnServices" (
    "serviceId" UUID NOT NULL,
    "formId" UUID NOT NULL,

    CONSTRAINT "ConsentsOnServices_pkey" PRIMARY KEY ("formId","serviceId")
);

-- CreateTable
CREATE TABLE "ClientConsent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "consentTitle" TEXT NOT NULL,
    "consentText" TEXT NOT NULL,
    "formData" JSONB,
    "formId" UUID NOT NULL,
    "clientAcceptance" BOOLEAN NOT NULL DEFAULT false,
    "clientSignatureId" UUID,
    "clientSignatureDateTime" TIMESTAMP(3),
    "userAcceptance" BOOLEAN NOT NULL DEFAULT false,
    "userSignatureId" UUID,
    "userSignatureDateTime" TIMESTAMP(3),
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signature" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "objectType" TEXT NOT NULL,
    "objectId" UUID NOT NULL,
    "signature" TEXT NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "label" TEXT NOT NULL,
    "shortLabel" TEXT,
    "description" TEXT,
    "fieldType" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "options" JSONB,
    "validation" JSONB,
    "controlType" TEXT,
    "displayOptions" JSONB,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "formId" UUID NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientQuestionnaire" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "clientId" UUID NOT NULL,
    "formId" UUID NOT NULL,
    "signatureId" UUID,
    "entityId" UUID NOT NULL DEFAULT (current_setting('app.current_entity_id'::text))::uuid,

    CONSTRAINT "ClientQuestionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "formId" UUID NOT NULL,
    "objectId" UUID NOT NULL,
    "objectType" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unitOfMeasure" "UnitOfMeasure" NOT NULL,
    "productTypeId" UUID NOT NULL,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "price" DECIMAL(65,30) NOT NULL,
    "productId" UUID NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "locationId" UUID NOT NULL,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDiscount" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "minQuantity" INTEGER NOT NULL DEFAULT 1,
    "discountValue" DECIMAL(65,30) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "productId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "ProductDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "locationId" UUID NOT NULL,
    "type" "CampaignType" NOT NULL,
    "communitionType" "CommunicationType" NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignProduct" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "campaignId" UUID NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "discountValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CampaignProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignVendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "thirdPartyVendorId" UUID NOT NULL,

    CONSTRAINT "CampaignVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdPartyVendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "key" TEXT NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "ThirdPartyVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserConnection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "providerId" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemoClientEvent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "dayDifference" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "service1" TEXT NOT NULL,
    "service2" TEXT NOT NULL,
    "teamMemberEmail" TEXT NOT NULL,

    CONSTRAINT "DemoClientEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityIntegration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),
    "state" TEXT,
    "accessToken" TEXT,
    "serverPrefix" TEXT,
    "integrationType" "IntegrationType" NOT NULL,
    "integrationData" JSONB,
    "invalid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EntityIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationList" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "integrationId" UUID NOT NULL,
    "listId" TEXT NOT NULL,
    "listName" TEXT NOT NULL,
    "listType" TEXT,
    "listData" JSONB,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IntegrationList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "integrationListId" UUID NOT NULL,
    "tagId" UUID NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "IntegrationTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationUpdateLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "integrationId" UUID NOT NULL,
    "updateType" TEXT NOT NULL,
    "updateData" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedData" JSONB,

    CONSTRAINT "IntegrationUpdateLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityId" UUID NOT NULL DEFAULT get_entity_id(),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "modulePermissionId" UUID NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","modulePermissionId")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sort" INTEGER,
    "moduleIdentifier" "ModuleIdentifier",

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulePermission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "moduleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "ModulePermission_pkey" PRIMARY KEY ("moduleId","permissionId")
);

-- CreateIndex
CREATE INDEX "User_entityId_idx" ON "User"("entityId");

-- CreateIndex
CREATE INDEX "User_id_entityId_idx" ON "User"("id", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Entity_name_idx" ON "Entity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_ownerId_key" ON "Entity"("ownerId");

-- CreateIndex
CREATE INDEX "Form_area_idx" ON "Form"("area");

-- CreateIndex
CREATE INDEX "Form_entityId_idx" ON "Form"("entityId");

-- CreateIndex
CREATE INDEX "Location_entityId_idx" ON "Location"("entityId");

-- CreateIndex
CREATE INDEX "Location_id_entityId_idx" ON "Location"("id", "entityId");

-- CreateIndex
CREATE INDEX "Location_entityId_addressId_idx" ON "Location"("entityId", "addressId");

-- CreateIndex
CREATE INDEX "LocationHours_locationId_idx" ON "LocationHours"("locationId");

-- CreateIndex
CREATE INDEX "UserHour_id_idx" ON "UserHour"("id");

-- CreateIndex
CREATE INDEX "UserHour_dayOfWeek_start_end_locationId_userId_idx" ON "UserHour"("dayOfWeek", "start", "end", "locationId", "userId");

-- CreateIndex
CREATE INDEX "UserHour_userId_locationId_idx" ON "UserHour"("userId", "locationId");

-- CreateIndex
CREATE INDEX "Room_locationId_idx" ON "Room"("locationId");

-- CreateIndex
CREATE INDEX "UserLocation_userId_locationId_idx" ON "UserLocation"("userId", "locationId");

-- CreateIndex
CREATE INDEX "Service_entityId_idx" ON "Service"("entityId");

-- CreateIndex
CREATE INDEX "Service_id_entityId_idx" ON "Service"("id", "entityId");

-- CreateIndex
CREATE INDEX "Service_categoryId_idx" ON "Service"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_categoryId_key" ON "Service"("name", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_entityId_idx" ON "Category"("entityId");

-- CreateIndex
CREATE INDEX "Category_id_entityId_idx" ON "Category"("id", "entityId");

-- CreateIndex
CREATE INDEX "Client_entityId_idx" ON "Client"("entityId");

-- CreateIndex
CREATE INDEX "Client_entityId_id_idx" ON "Client"("entityId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Tag_entityId_tagType_idx" ON "Tag"("entityId", "tagType");

-- CreateIndex
CREATE INDEX "ClientTag_clientId_idx" ON "ClientTag"("clientId");

-- CreateIndex
CREATE INDEX "ClientTag_tagId_idx" ON "ClientTag"("tagId");

-- CreateIndex
CREATE INDEX "Booking_clientId_idx" ON "Booking"("clientId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_userId_clientId_idx" ON "Booking"("userId", "clientId");

-- CreateIndex
CREATE INDEX "Note_clientId_idx" ON "Note"("clientId");

-- CreateIndex
CREATE INDEX "UserNote_userId_idx" ON "UserNote"("userId");

-- CreateIndex
CREATE INDEX "Message_clientId_idx" ON "Message"("clientId");

-- CreateIndex
CREATE INDEX "Record_clientId_idx" ON "Record"("clientId");

-- CreateIndex
CREATE INDEX "UsersOnServices_serviceId_userId_idx" ON "UsersOnServices"("serviceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDefaults_userId_key" ON "UserDefaults"("userId");

-- CreateIndex
CREATE INDEX "UserDefaults_userId_idx" ON "UserDefaults"("userId");

-- CreateIndex
CREATE INDEX "TextTemplate_entityId_type_idx" ON "TextTemplate"("entityId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ClientConsent_clientSignatureId_key" ON "ClientConsent"("clientSignatureId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientConsent_userSignatureId_key" ON "ClientConsent"("userSignatureId");

-- CreateIndex
CREATE INDEX "ClientConsent_clientId_formId_idx" ON "ClientConsent"("clientId", "formId");

-- CreateIndex
CREATE INDEX "Signature_objectId_objectType_idx" ON "Signature"("objectId", "objectType");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_objectId_objectType_key" ON "Signature"("objectId", "objectType");

-- CreateIndex
CREATE INDEX "Field_formId_idx" ON "Field"("formId");

-- CreateIndex
CREATE INDEX "Field_area_idx" ON "Field"("area");

-- CreateIndex
CREATE INDEX "Field_entityId_area_idx" ON "Field"("entityId", "area");

-- CreateIndex
CREATE INDEX "ClientQuestionnaire_id_idx" ON "ClientQuestionnaire"("id");

-- CreateIndex
CREATE INDEX "ClientQuestionnaire_clientId_idx" ON "ClientQuestionnaire"("clientId");

-- CreateIndex
CREATE INDEX "ClientQuestionnaire_entityId_idx" ON "ClientQuestionnaire"("entityId");

-- CreateIndex
CREATE INDEX "FormData_formId_idx" ON "FormData"("formId");

-- CreateIndex
CREATE INDEX "FormData_objectId_objectType_idx" ON "FormData"("objectId", "objectType");

-- CreateIndex
CREATE UNIQUE INDEX "FormData_formId_objectId_objectType_key" ON "FormData"("formId", "objectId", "objectType");

-- CreateIndex
CREATE INDEX "Product_entityId_idx" ON "Product"("entityId");

-- CreateIndex
CREATE INDEX "Product_id_entityId_idx" ON "Product"("id", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_productTypeId_key" ON "Product"("name", "productTypeId");

-- CreateIndex
CREATE INDEX "ProductType_entityId_idx" ON "ProductType"("entityId");

-- CreateIndex
CREATE INDEX "ProductPrice_productId_archived_idx" ON "ProductPrice"("productId", "archived");

-- CreateIndex
CREATE INDEX "ProductDiscount_productId_archived_idx" ON "ProductDiscount"("productId", "archived");

-- CreateIndex
CREATE INDEX "Campaign_locationId_idx" ON "Campaign"("locationId");

-- CreateIndex
CREATE INDEX "CampaignProduct_campaignId_idx" ON "CampaignProduct"("campaignId");

-- CreateIndex
CREATE INDEX "UserConnection_userId_idx" ON "UserConnection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserConnection_providerName_providerId_key" ON "UserConnection"("providerName", "providerId");

-- CreateIndex
CREATE INDEX "DemoClientEvent_email_idx" ON "DemoClientEvent"("email");

-- CreateIndex
CREATE INDEX "EntityIntegration_entityId_idx" ON "EntityIntegration"("entityId");

-- CreateIndex
CREATE INDEX "EntityIntegration_entityId_integrationType_invalid_idx" ON "EntityIntegration"("entityId", "integrationType", "invalid");

-- CreateIndex
CREATE INDEX "IntegrationList_integrationId_idx" ON "IntegrationList"("integrationId");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationList_integrationId_listId_key" ON "IntegrationList"("integrationId", "listId");

-- CreateIndex
CREATE INDEX "IntegrationTag_integrationListId_idx" ON "IntegrationTag"("integrationListId");

-- CreateIndex
CREATE INDEX "IntegrationUpdateLog_integrationId_updated_idx" ON "IntegrationUpdateLog"("integrationId", "updated");

-- CreateIndex
CREATE INDEX "Role_entityId_idx" ON "Role"("entityId");

-- CreateIndex
CREATE INDEX "Role_id_entityId_idx" ON "Role"("id", "entityId");

-- CreateIndex
CREATE INDEX "RolePermission_roleId_idx" ON "RolePermission"("roleId");

-- CreateIndex
CREATE INDEX "RolePermission_modulePermissionId_idx" ON "RolePermission"("modulePermissionId");

-- CreateIndex
CREATE INDEX "Permission_id_idx" ON "Permission"("id");

-- CreateIndex
CREATE INDEX "Module_id_idx" ON "Module"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ModulePermission_id_key" ON "ModulePermission"("id");

-- CreateIndex
CREATE INDEX "ModulePermission_moduleId_idx" ON "ModulePermission"("moduleId");

-- CreateIndex
CREATE INDEX "ModulePermission_permissionId_idx" ON "ModulePermission"("permissionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPermissionId_fkey" FOREIGN KEY ("userPermissionId") REFERENCES "UserPermissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationHours" ADD CONSTRAINT "LocationHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHour" ADD CONSTRAINT "UserHour_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHour" ADD CONSTRAINT "UserHour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_defaultLocationId_fkey" FOREIGN KEY ("defaultLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientTag" ADD CONSTRAINT "ClientTag_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientTag" ADD CONSTRAINT "ClientTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNote" ADD CONSTRAINT "UserNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNote" ADD CONSTRAINT "UserNote_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnServices" ADD CONSTRAINT "UsersOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnServices" ADD CONSTRAINT "UsersOnServices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnRooms" ADD CONSTRAINT "ServicesOnRooms_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnRooms" ADD CONSTRAINT "ServicesOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnLocations" ADD CONSTRAINT "ServicesOnLocations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnLocations" ADD CONSTRAINT "ServicesOnLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnBookings" ADD CONSTRAINT "ServicesOnBookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnBookings" ADD CONSTRAINT "ServicesOnBookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnRecords" ADD CONSTRAINT "ServicesOnRecords_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicesOnRecords" ADD CONSTRAINT "ServicesOnRecords_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDefaults" ADD CONSTRAINT "UserDefaults_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTemplate" ADD CONSTRAINT "TextTemplate_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextsOnServices" ADD CONSTRAINT "TextsOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextsOnServices" ADD CONSTRAINT "TextsOnServices_textTemplateId_fkey" FOREIGN KEY ("textTemplateId") REFERENCES "TextTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentsOnServices" ADD CONSTRAINT "ConsentsOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentsOnServices" ADD CONSTRAINT "ConsentsOnServices_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientConsent" ADD CONSTRAINT "ClientConsent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientConsent" ADD CONSTRAINT "ClientConsent_clientSignatureId_fkey" FOREIGN KEY ("clientSignatureId") REFERENCES "Signature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientConsent" ADD CONSTRAINT "ClientConsent_userSignatureId_fkey" FOREIGN KEY ("userSignatureId") REFERENCES "Signature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientConsent" ADD CONSTRAINT "ClientConsent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientQuestionnaire" ADD CONSTRAINT "ClientQuestionnaire_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormData" ADD CONSTRAINT "FormData_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDiscount" ADD CONSTRAINT "ProductDiscount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDiscount" ADD CONSTRAINT "ProductDiscount_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignProduct" ADD CONSTRAINT "CampaignProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignProduct" ADD CONSTRAINT "CampaignProduct_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignVendor" ADD CONSTRAINT "CampaignVendor_thirdPartyVendorId_fkey" FOREIGN KEY ("thirdPartyVendorId") REFERENCES "ThirdPartyVendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdPartyVendor" ADD CONSTRAINT "ThirdPartyVendor_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConnection" ADD CONSTRAINT "UserConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityIntegration" ADD CONSTRAINT "EntityIntegration_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationList" ADD CONSTRAINT "IntegrationList_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "EntityIntegration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationTag" ADD CONSTRAINT "IntegrationTag_integrationListId_fkey" FOREIGN KEY ("integrationListId") REFERENCES "IntegrationList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_modulePermissionId_fkey" FOREIGN KEY ("modulePermissionId") REFERENCES "ModulePermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePermission" ADD CONSTRAINT "ModulePermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePermission" ADD CONSTRAINT "ModulePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
