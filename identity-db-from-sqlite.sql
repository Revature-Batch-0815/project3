BEGIN TRANSACTION;
DROP TABLE IF EXISTS "__EFMigrationsHistory";
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId"	TEXT NOT NULL,
	"ProductVersion"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY("MigrationId")
);
DROP TABLE IF EXISTS "AspNetRoles";
CREATE TABLE IF NOT EXISTS "AspNetRoles" (
	"Id"	TEXT NOT NULL,
	"Name"	TEXT,
	"NormalizedName"	TEXT,
	"ConcurrencyStamp"	TEXT,
	CONSTRAINT "PK_AspNetRoles" PRIMARY KEY("Id")
);
DROP TABLE IF EXISTS "AspNetUsers";
CREATE TABLE IF NOT EXISTS "AspNetUsers" (
	"Id"	TEXT NOT NULL,
	"UserName"	TEXT,
	"NormalizedUserName"	TEXT,
	"Email"	TEXT,
	"NormalizedEmail"	TEXT,
	"EmailConfirmed"	INTEGER NOT NULL,
	"PasswordHash"	TEXT,
	"SecurityStamp"	TEXT,
	"ConcurrencyStamp"	TEXT,
	"PhoneNumber"	TEXT,
	"PhoneNumberConfirmed"	INTEGER NOT NULL,
	"TwoFactorEnabled"	INTEGER NOT NULL,
	"LockoutEnd"	TEXT,
	"LockoutEnabled"	INTEGER NOT NULL,
	"AccessFailedCount"	INTEGER NOT NULL,
	CONSTRAINT "PK_AspNetUsers" PRIMARY KEY("Id")
);
DROP TABLE IF EXISTS "DeviceCodes";
CREATE TABLE IF NOT EXISTS "DeviceCodes" (
	"UserCode"	TEXT NOT NULL,
	"DeviceCode"	TEXT NOT NULL,
	"SubjectId"	TEXT,
	"SessionId"	TEXT,
	"ClientId"	TEXT NOT NULL,
	"Description"	TEXT,
	"CreationTime"	TEXT NOT NULL,
	"Expiration"	TEXT NOT NULL,
	"Data"	TEXT NOT NULL,
	CONSTRAINT "PK_DeviceCodes" PRIMARY KEY("UserCode")
);
DROP TABLE IF EXISTS "Keys";
CREATE TABLE IF NOT EXISTS "Keys" (
	"Id"	TEXT NOT NULL,
	"Version"	INTEGER NOT NULL,
	"Created"	TEXT NOT NULL,
	"Use"	TEXT,
	"Algorithm"	TEXT NOT NULL,
	"IsX509Certificate"	INTEGER NOT NULL,
	"DataProtected"	INTEGER NOT NULL,
	"Data"	TEXT NOT NULL,
	CONSTRAINT "PK_Keys" PRIMARY KEY("Id")
);
DROP TABLE IF EXISTS "PersistedGrants";
CREATE TABLE IF NOT EXISTS "PersistedGrants" (
	"Key"	TEXT NOT NULL,
	"Type"	TEXT NOT NULL,
	"SubjectId"	TEXT,
	"SessionId"	TEXT,
	"ClientId"	TEXT NOT NULL,
	"Description"	TEXT,
	"CreationTime"	TEXT NOT NULL,
	"Expiration"	TEXT,
	"ConsumedTime"	TEXT,
	"Data"	TEXT NOT NULL,
	CONSTRAINT "PK_PersistedGrants" PRIMARY KEY("Key")
);
DROP TABLE IF EXISTS "AspNetRoleClaims";
CREATE TABLE IF NOT EXISTS "AspNetRoleClaims" (
	"Id"	INTEGER NOT NULL,
	"RoleId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserClaims";
CREATE TABLE IF NOT EXISTS "AspNetUserClaims" (
	"Id"	INTEGER NOT NULL,
	"UserId"	TEXT NOT NULL,
	"ClaimType"	TEXT,
	"ClaimValue"	TEXT,
	CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY("Id" AUTOINCREMENT),
	CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserLogins";
CREATE TABLE IF NOT EXISTS "AspNetUserLogins" (
	"LoginProvider"	TEXT NOT NULL,
	"ProviderKey"	TEXT NOT NULL,
	"ProviderDisplayName"	TEXT,
	"UserId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY("LoginProvider","ProviderKey"),
	CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserRoles";
CREATE TABLE IF NOT EXISTS "AspNetUserRoles" (
	"UserId"	TEXT NOT NULL,
	"RoleId"	TEXT NOT NULL,
	CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY("UserId","RoleId"),
	CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY("RoleId") REFERENCES "AspNetRoles"("Id") ON DELETE CASCADE,
	CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP TABLE IF EXISTS "AspNetUserTokens";
CREATE TABLE IF NOT EXISTS "AspNetUserTokens" (
	"UserId"	TEXT NOT NULL,
	"LoginProvider"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Value"	TEXT,
	CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY("UserId","LoginProvider","Name"),
	CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY("UserId") REFERENCES "AspNetUsers"("Id") ON DELETE CASCADE
);
DROP INDEX IF EXISTS "IX_AspNetRoleClaims_RoleId";
CREATE INDEX IF NOT EXISTS "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" (
	"RoleId"
);
DROP INDEX IF EXISTS "RoleNameIndex";
CREATE UNIQUE INDEX IF NOT EXISTS "RoleNameIndex" ON "AspNetRoles" (
	"NormalizedName"
);
DROP INDEX IF EXISTS "IX_AspNetUserClaims_UserId";
CREATE INDEX IF NOT EXISTS "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" (
	"UserId"
);
DROP INDEX IF EXISTS "IX_AspNetUserLogins_UserId";
CREATE INDEX IF NOT EXISTS "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" (
	"UserId"
);
DROP INDEX IF EXISTS "IX_AspNetUserRoles_RoleId";
CREATE INDEX IF NOT EXISTS "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" (
	"RoleId"
);
DROP INDEX IF EXISTS "EmailIndex";
CREATE INDEX IF NOT EXISTS "EmailIndex" ON "AspNetUsers" (
	"NormalizedEmail"
);
DROP INDEX IF EXISTS "UserNameIndex";
CREATE UNIQUE INDEX IF NOT EXISTS "UserNameIndex" ON "AspNetUsers" (
	"NormalizedUserName"
);
DROP INDEX IF EXISTS "IX_DeviceCodes_DeviceCode";
CREATE UNIQUE INDEX IF NOT EXISTS "IX_DeviceCodes_DeviceCode" ON "DeviceCodes" (
	"DeviceCode"
);
DROP INDEX IF EXISTS "IX_DeviceCodes_Expiration";
CREATE INDEX IF NOT EXISTS "IX_DeviceCodes_Expiration" ON "DeviceCodes" (
	"Expiration"
);
DROP INDEX IF EXISTS "IX_Keys_Use";
CREATE INDEX IF NOT EXISTS "IX_Keys_Use" ON "Keys" (
	"Use"
);
DROP INDEX IF EXISTS "IX_PersistedGrants_ConsumedTime";
CREATE INDEX IF NOT EXISTS "IX_PersistedGrants_ConsumedTime" ON "PersistedGrants" (
	"ConsumedTime"
);
DROP INDEX IF EXISTS "IX_PersistedGrants_Expiration";
CREATE INDEX IF NOT EXISTS "IX_PersistedGrants_Expiration" ON "PersistedGrants" (
	"Expiration"
);
DROP INDEX IF EXISTS "IX_PersistedGrants_SubjectId_ClientId_Type";
CREATE INDEX IF NOT EXISTS "IX_PersistedGrants_SubjectId_ClientId_Type" ON "PersistedGrants" (
	"SubjectId",
	"ClientId",
	"Type"
);
DROP INDEX IF EXISTS "IX_PersistedGrants_SubjectId_SessionId_Type";
CREATE INDEX IF NOT EXISTS "IX_PersistedGrants_SubjectId_SessionId_Type" ON "PersistedGrants" (
	"SubjectId",
	"SessionId",
	"Type"
);
COMMIT;
