-- CreateTable
CREATE TABLE BookingInfo (
    bookingID INT NOT NULL IDENTITY(1,1),
    RoomName NVARCHAR(255) NULL,
    sendDate DATETIME NULL DEFAULT GETDATE(),
    sender NVARCHAR(255) NULL,
    phoneIn NVARCHAR(255) NULL,
    phoneOut NVARCHAR(255) NULL,
    officeLocation NVARCHAR(255) NULL,
    purpose NVARCHAR(255) NULL,
    startDate DATETIME NULL DEFAULT GETDATE(),
    endDate DATETIME NULL DEFAULT GETDATE(),
    capacity INT NULL,
    cfSender NVARCHAR(255) NULL,
    cfPhone NVARCHAR(255) NULL,
    SendStatus NVARCHAR(255) NULL,
    Role NVARCHAR(255) NULL,
    createdAt DATETIME NULL DEFAULT GETDATE(),
    updatedAt DATETIME NULL,
    RecordStatus NVARCHAR(1) NULL,

    CONSTRAINT PK_BookingInfo PRIMARY KEY (bookingID)
);

-- CreateTable
CREATE TABLE users (
    userID INT NOT NULL IDENTITY(1,1),
    userEmail NVARCHAR(255) NULL,
    officeLocation NVARCHAR(255) NULL,
    createDate DATETIME NULL DEFAULT GETDATE(),
    lastEdit DATETIME NULL,
    RecordStatus NVARCHAR(1) NULL,

    CONSTRAINT UQ_users_userEmail UNIQUE (userEmail),
    CONSTRAINT PK_users PRIMARY KEY (userID)
);

-- CreateTable
CREATE TABLE Assessment (
    id INT NOT NULL IDENTITY(1,1),
    meetingRoom NVARCHAR(255) NULL,
    gender NVARCHAR(255) NULL,
    role NVARCHAR(255) NULL,
    responses NVARCHAR(MAX) NOT NULL,
    comment NVARCHAR(191) NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT PK_Assessment PRIMARY KEY (id)
);
