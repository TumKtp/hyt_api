-- USER TABLE
CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    encry_password TEXT NOT NULL,
    salt TEXT NOT NULL,
    detail TEXT,
    role SMALLINT
);
-- PATIENT TABLE
CREATE TABLE patients (
    id BIGSERIAL NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    nickname VARCHAR(50),
    user_info TEXT,
    address TEXT,
    phone_number VARCHAR(12)
);

INSERT INTO users (firstname,lastname,nickname) VALUES ('a','b','asdasd');
SELECT * FROM users ;