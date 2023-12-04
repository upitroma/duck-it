/*placeholder users.sql*/
CREATE TABLE users (
    email varchar(200) NOT NULL UNIQUE,
    username varchar(200) NOT NULL UNIQUE,
    duckId varchar(200) UNIQUE,
    PRIMARY KEY (email)
);