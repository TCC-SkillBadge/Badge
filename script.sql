CREATE TABLE badge (
    id_badge INT AUTO_INCREMENT NOT NULL,
    institution VARCHAR(70) NOT NULL,
    image_url VARCHAR(70) NOT NULL,
    name_badge VARCHAR(70) NOT NULL,
    desc_badge VARCHAR(300) NOT NULL,
    validity_badge INT NULL,
    status_badge INT NOT NULL,
    created_date DATETIME NOT NULL,
    created_user INT NOT NULL,
    updated_date DATETIME NULL,
    updated_user INT NULL,
    inactivated_date DATETIME NULL,
    inactivated_user INT NULL,
    CONSTRAINT PK_certificado PRIMARY KEY (id_badge),
    CONSTRAINT UN_certificado UNIQUE (image_url)
);

drop Table badge;