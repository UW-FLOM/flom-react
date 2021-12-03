CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS survey (
    id VARCHAR NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    visibility_id INT,
    page_group_id INT,
    detail json,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS subject (
    id UUID NOT NULL,
    survey_id VARCHAR NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_survey_id
        FOREIGN KEY(survey_id)
            REFERENCES survey(id)
);

CREATE TABLE IF NOT EXISTS response (
    subject_id UUID NOT NULL,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
  	detail json,
    PRIMARY KEY(subject_id),
    CONSTRAINT fk_subject_iD
        FOREIGN KEY(subject_id)
            REFERENCES subject(id)
);

CREATE TABLE IF NOT EXISTS user_right (
    id SMALLSERIAL,
    detail VARCHAR,
    PRIMARY KEY(id)
);

INSERT INTO
    user_right (detail)
VALUES
    ('Admin'),
    ('User');

CREATE TABLE IF NOT EXISTS user_type (
    id SMALLSERIAL,
    detail VARCHAR,
    PRIMARY KEY(id)
);

INSERT INTO
    user_type (detail)
VALUES
    ('Local'),
    ('SAML');

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL,
    user_right_id INT NOT NULL,
    user_type_id INT NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_right_id
        FOREIGN KEY(user_right_id)
            REFERENCES user_right(id),
    CONSTRAINT fk_user_type_id
        FOREIGN KEY(user_type_id)
            REFERENCES user_type(id)
);

CREATE TABLE IF NOT EXISTS local_user(
    user_id UUID NOT NULL,
    username varchar NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY(user_id, username),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);

-- Initialize the admin account with password "mypassword"
WITH admin_id AS (
    INSERT INTO
        users (id, user_right_id, user_type_id, name)
        VALUES (uuid_generate_v4(), 1, 1, 'Administrator')
        RETURNING id
)
INSERT INTO
    local_user(user_id, username, password)
VALUES
    ((SELECT * FROM admin_id), 'admin', '$2a$10$gV8Z9cUxiJb8HFWlPB4px.Bk7v8kcWNk1mshRa7pa8q9m5LvsuQx6');

CREATE TABLE IF NOT EXISTS page_type (
    id SMALLSERIAL,
    detail VARCHAR,
    PRIMARY KEY(id)
);

INSERT INTO
    page_type (detail)
VALUES
    ('form'),
    ('map');

CREATE TABLE IF NOT EXISTS page_list(
    id UUID NOT NULL,
    page_type_id INT NOT NULL,
    next_page UUID,
    PRIMARY KEY(id),
    CONSTRAINT fk_page_type_id
        FOREIGN KEY(page_type_id)
            REFERENCES page_type(id),
    CONSTRAINT fk_next_page
        FOREIGN KEY(next_page)
            REFERENCES page_list(id)
);

CREATE TABLE IF NOT EXISTS page_group(
    id UUID NOT NULL,
    survey_id VARCHAR NOT NULL,
    first_page UUID NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_survey_id
        FOREIGN KEY(survey_id)
            REFERENCES survey(id),
    CONSTRAINT fk_first_page
        FOREIGN KEY(first_page)
            REFERENCES page_list(id)
);

/*
CREATE TABLE IF NOT EXISTS Question_Types (
    QuestionTypeID UUID NOT NULL,
    detail VARCHAR(2048),
    PRIMARY KEY (QuestionTypeID)
);


CREATE TABLE IF NOT EXISTS Questions (
    QuestionID UUID NOT NULL,
    FK_QuestionTypeID UUID NOT NULL,
    FK_SurveyID UUID NOT NULL,
    description VARCHAR(2048),
    PRIMARY KEY (QuestionID),
    FOREIGN KEY (FK_SurveyID) REFERENCES Surveys(SurveyID),
    FOREIGN KEY (FK_QuestionTypeID) REFERENCES Question_Types(QuestionTypeID)
);

CREATE TABLE IF NOT EXISTS Polygons (
    PolygonID UUID NOT NULL,
    FK_SubjectID UUID NOT NULL,
    Geolocation geography(Polygon),
    name VARCHAR(255),
    PRIMARY KEY (PolygonID),
    FOREIGN KEY (FK_SubjectID) REFERENCES Subjects(SubjectID)
);

CREATE TABLE IF NOT EXISTS Answers (
    AnswerID UUID NOT NULL,
    FK_SubjectID UUID NOT NULL,
    FK_PolygonID UUID NOT NULL,
    FK_QuestionID UUID NOT NULL,
    isPolygon boolean,
    detail VARCHAR(2048),
    PRIMARY KEY (AnswerID),
    FOREIGN KEY (FK_PolygonID) REFERENCES Polygons(PolygonID),
    FOREIGN KEY (FK_QuestionID) REFERENCES Questions(QuestionID)
);
*/
