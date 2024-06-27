CREATE TABLE badge
(
    id_badge INT AUTO_INCREMENT NOT NULL,
    imagem_mb VARCHAR(70) NOT NULL,
    desc_certificacao VARCHAR(300) NOT NULL,
    criador VARCHAR(70) NOT NULL,
    
    CONSTRAINT PK_certificado PRIMARY KEY (id_badge),
    CONSTRAINT UN_certificado UNIQUE (imagem_mb)
);

ALTER TABLE badge
	ADD COLUMN validade INT NULL;