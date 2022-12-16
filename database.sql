
CREATE TABLE person (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    username VARCHAR(255)
)

CREATE TABLE post (
    id SERIAL PRIMARY KEY
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
)


INSERT INTO person (name, surname) values ($1, $2) Returning *