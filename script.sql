CREATE TABLE badge (
    id_badge INT AUTO_INCREMENT NOT NULL,
    institution VARCHAR(70) NOT NULL,
    image_url VARCHAR(70) NOT NULL,
    name_badge VARCHAR(70) NOT NULL,
    desc_badge VARCHAR(300) NOT NULL,
    validity_badge INT NULL,
    status_badge INT NOT NULL,
    createdDate DATETIME NOT NULL,
    createdUser INT NOT NULL,
    updatedDate DATETIME NULL,
    updatedUser INT NULL,
    inactivatedDate DATETIME NULL,
    inactivatedUser INT NULL,
    CONSTRAINT PK_certificado PRIMARY KEY (id_badge),
    CONSTRAINT UN_certificado UNIQUE (image_url)
);