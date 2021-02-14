CREATE TABLE IF NOT EXISTS Surveys (
    SurveyID UUID NOT NULL,
    Nickname CHAR,
    Detail json,
    PRIMARY KEY (SurveyID)
);

CREATE TABLE IF NOT EXISTS Subjects (
	SubjectID UUID NOT NULL,
  	FK_SurveyID UUID NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
  	PRIMARY KEY (SubjectID),
    FOREIGN KEY (FK_SurveyID) REFERENCES Surveys(SurveyID)
);

CREATE TABLE IF NOT EXISTS Response (
	FK_SubjectID UUID NOT NULL,
  	Detail json,
  	PRIMARY KEY (FK_SubjectID),
    FOREIGN KEY (FK_SubjectID) REFERENCES Subjects(SubjectID)
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
