CREATE TABLE IF NOT EXISTS "user" (
     id uuid,
     email varchar(255) UNIQUE,
     password varchar(100),
     type varchar(50),
     image_url varchar(255),
     created_at timestamp
);

CREATE TABLE IF NOT EXISTS items (
     id uuid,
     item_name TEXT NOT NULL,
     complete BOOLEAN DEFAULT false,
     PRIMARY KEY (id)
);
