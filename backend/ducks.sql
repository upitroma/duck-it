/*ducks.sql*/
CREATE TABLE ducks (
    id varchar(200) NOT NULL UNIQUE,
    name varchar(200) NOT NULL UNIQUE,
    owner_email varchar(200) DEFAULT NULL,
    strength INT  DEFAULT 1,
    perception INT  DEFAULT 1,
    endurance INT  DEFAULT 1,
    charisma INT  DEFAULT 1,
    intelligence INT  DEFAULT 1,
    agility INT  DEFAULT 1,
    luck INT  DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_email) REFERENCES users (email)
);