BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"email"	text,
	"username"	text,
	"password"	text,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "collections" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"collection_name"	text,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_collection" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "movies" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"movie_name"	text,
	"movie_poster"	text,
	"movie_information"	text,
	"movie_video"	text,
	"movie_length"	real,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "collection_movies" (
	"movie_id"	integer,
	"collection_id"	integer,
	PRIMARY KEY("movie_id","collection_id"),
	CONSTRAINT "fk_collection_movies_movie" FOREIGN KEY("movie_id") REFERENCES "movies"("id"),
	CONSTRAINT "fk_collection_movies_collection" FOREIGN KEY("collection_id") REFERENCES "collections"("id")
);
CREATE TABLE IF NOT EXISTS "histories" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date"	datetime,
	"user_id"	integer,
	"movie_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_history" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_movies_history" FOREIGN KEY("movie_id") REFERENCES "movies"("id")
);
CREATE TABLE IF NOT EXISTS "payments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"payment_method"	text,
	"payment_status"	text,
	"date"	datetime,
	"user_id"	integer,
	"package_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_payment" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_payments_movie_package" FOREIGN KEY("package_id") REFERENCES "movie_packages"("id")
);
CREATE TABLE IF NOT EXISTS "movie_packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"package_name"	text,
	"duration"	datetime,
	"price"	decimal(10, 2),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_collections_deleted_at" ON "collections" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_movies_deleted_at" ON "movies" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_histories_deleted_at" ON "histories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_payments_deleted_at" ON "payments" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_movie_packages_deleted_at" ON "movie_packages" (
	"deleted_at"
);
COMMIT;
