
CREATE TABLE person (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    username VARCHAR(255)
)

CREATE TABLE task (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    description VARCHAR(255),
    deadline DATE,
    notification BOOLEAN,
    tags VARCHAR(255),
    important BOOLEAN,
    status BOOLEAD,
    group_id INTEGER,
    user_id VARCHAR(255),
    FOREIGN KEY (group_id) REFERENCES group_task (id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE
)

CREATE TABLE group_task (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE
)

CREATE TABLE event (
    id SERIAL PRIMARY KEY NOT NULL, 
    name VARCHAR(255),
    description VARCHAR(255),
    start DATE,
    over_date DATE,
    notification BOOLEAN,
    tags VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES person (id) ON DELETE CASCADE
)






