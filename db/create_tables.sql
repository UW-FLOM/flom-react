CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS survey (
    survey_id VARCHAR NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    detail json,
    PRIMARY KEY(survey_id)
);

CREATE TABLE IF NOT EXISTS subject (
    subject_id UUID NOT NULL,
    survey_id VARCHAR NOT NULL,
    PRIMARY KEY(subject_id),
    CONSTRAINT fk_survey_id
        FOREIGN KEY(survey_id)
            REFERENCES survey(survey_id)
);

CREATE TABLE IF NOT EXISTS response (
    subject_id UUID NOT NULL,
	start_time TIME,
	end_time TIME,
  	detail json,
    PRIMARY KEY(subject_id),
    CONSTRAINT fk_subject_iD
        FOREIGN KEY(subject_id)
            REFERENCES subject(subject_id)
);

CREATE TABLE IF NOT EXISTS user_right (
    user_right_id SMALLSERIAL,
    detail VARCHAR,
    PRIMARY KEY(user_right_id)
);

INSERT INTO
    user_right (detail)
VALUES
    ('Admin'),
    ('User');

CREATE TABLE IF NOT EXISTS user_type (
    user_type_id SMALLSERIAL,
    detail VARCHAR,
    PRIMARY KEY(user_type_id)
);

INSERT INTO
    user_type (detail)
VALUES
    ('Local'),
    ('SAML');

CREATE TABLE IF NOT EXISTS users (
    user_id UUID NOT NULL,
    user_right_id INT NOT NULL,
    user_type_id INT NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY(user_id),
    CONSTRAINT fk_user_right_id
        FOREIGN KEY(user_right_id)
            REFERENCES user_right(user_right_id),
    CONSTRAINT fk_user_type_id
        FOREIGN KEY(user_type_id)
            REFERENCES user_type(user_type_id)
);

CREATE TABLE local_user(
    user_id UUID NOT NULL,
    username varchar NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY(user_id),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);

/*
WITH admin_id AS (
    INSERT INTO
        users (user_id, user_right_id, user_type_id, name)
        VALUES (uuid_generate_v4(), 1, 1, 'Administrator')
        RETURNING user_id
)
INSERT INTO
    local_user(user_id, username, password)
VALUES
    (admin_id, 'admin', '$2a$10$7geW09JGm75PvvXB.LfQe.mJ0zbrd71nvBZBkt1T/7/36vUIM/0tG');

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
