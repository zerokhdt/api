
CREATE TABLE User (
    UserID CHAR(36) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    UserType ENUM('admin', 'student') NOT NULL,
    Status ENUM('active', 'inactive') NOT NULL
);

CREATE TABLE Subject (
    SubjectID CHAR(36) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DateCreate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE QuestionType (
    QuestionTypeID CHAR(36) PRIMARY KEY,
    Type VARCHAR(50) NOT NULL
);

CREATE TABLE Question (
    QuestionID CHAR(36) PRIMARY KEY,
    Content TEXT NOT NULL,
    QuestionTypeID CHAR(36),
    SubjectID CHAR(36),
    filemp3 text,
    image text,
    FOREIGN KEY (QuestionTypeID) REFERENCES QuestionType(QuestionTypeID),
    FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID)
);

CREATE TABLE Answer (
    AnswerID CHAR(36) PRIMARY KEY,
    Content TEXT NOT NULL,
    QuestionID CHAR(36),
    FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID)
);

CREATE TABLE AnswerTrue (
    AnswerTrueID CHAR(36) PRIMARY KEY,
    QuestionID CHAR(36),
    FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID)
);

CREATE TABLE Result (
    ResultID CHAR(36) PRIMARY KEY,
    UserID CHAR(36),
    AnswerID CHAR(36),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (AnswerID) REFERENCES Answer(AnswerID)
);

INSERT INTO User (UserID,Username, Password, UserType, Status) 
VALUES (UUID(),'admin', '123456', 'admin', 'inactive');

INSERT INTO QuestionType (QuestionTypeID, Type)
VALUES (UUID(), 'Multiple Choice'),(UUID(), 'True/False'),(UUID(), 'Short Answer');





