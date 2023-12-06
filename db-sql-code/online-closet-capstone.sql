DROP SCHEMA IF EXISTS online_closet_capstone;
CREATE SCHEMA online_closet_capstone;
USE online_closet_capstone;
-- DROP DATABASE online_closet;

DROP TABLE IF EXISTS MEASUREMENTS;
DROP TABLE IF EXISTS BUYING;
DROP TABLE IF EXISTS OUTFITS_TAG_SYSTEM;
DROP TABLE IF EXISTS OUTFIT;
DROP TABLE IF EXISTS TAG_SYSTEM;
DROP TABLE IF EXISTS CLOTHING;
DROP TABLE IF EXISTS USER;
CREATE TABLE USER
(
userID INT NOT NULL,
username VARCHAR(30) NOT NULL, 
password VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
mobile_phone INT,
PRIMARY KEY(userID)
);

CREATE TABLE CLOTHING(
userID INT NOT NULL,
clothingID INT NOT NULL,
image_link VARCHAR(250),
title VARCHAR(50),
brand VARCHAR(60),
description VARCHAR(250),
size VARCHAR(8),
typeNo INT,
subtypeNo INT,
colorNo INT,
specialSizingNo INT,
genderNo INT,
selling INT,
buying INT,
PRIMARY KEY(clothingID),
FOREIGN KEY(userID) REFERENCES USER(userID)
);

CREATE TABLE TAG_SYSTEM(
userID INT NOT NULL,
clothingID INT NOT NULL,
tag VARCHAR(50),
FOREIGN KEY(userID) REFERENCES USER(userID),
FOREIGN KEY(clothingID) REFERENCES CLOTHING(clothingID)
);

CREATE TABLE OUTFIT(
userID INT NOT NULL,
clothingID INT NOT NULL,
outfitID INT NOT NULL,
title VARCHAR(50),
description VARCHAR(250),
PRIMARY KEY(outfitID),
FOREIGN KEY(userID) REFERENCES USER(userID),
FOREIGN KEY(clothingID) REFERENCES CLOTHING(clothingID)
);

CREATE TABLE OUTFITS_TAG_SYSTEM(
userID INT NOT NULL,
outfitID INT NOT NULL,
tag VARCHAR(50),
FOREIGN KEY(userID) REFERENCES USER(userID),
FOREIGN KEY(outfitID) REFERENCES OUTFIT(outfitID)
);

CREATE TABLE BUYING(
userID INT NOT NULL,
clothingID INT NOT NULL,
link VARCHAR(100),
dateNotif DATETIME,
FOREIGN KEY(userID) REFERENCES USER(userID),
FOREIGN KEY(clothingID) REFERENCES CLOTHING(clothingID)
);

CREATE TABLE MEASUREMENTS(
userID INT NOT NULL,
clothingID INT NOT NULL,
bust INT,
waist INT,
hip INT,
length INT,
arm_opening INT,
leg_opening INT,
inseam INT,
FOREIGN KEY(userID) REFERENCES USER(userID),
FOREIGN KEY(clothingID) REFERENCES CLOTHING(clothingID)
);

DROP TABLE IF EXISTS TYPE;
CREATE TABLE TYPE(
typeNo INT NOT NULL,
type VARCHAR(50),
PRIMARY KEY(typeNo)
);

DROP TABLE IF EXISTS SUBTYPE;
CREATE TABLE SUBTYPE(
subtypeNo INT NOT NULL,
typeNo INT NOT NULL,
subtype VARCHAR(50),
PRIMARY KEY(subtypeNo)
);

DROP TABLE IF EXISTS GENDER;
CREATE TABLE GENDER(
genderNo INT,
gender VARCHAR(50),
PRIMARY KEY(genderNo)
);

-- CREATE TABLE SIZE(
-- sizeNo INT,
-- size VARCHAR(50),
-- PRIMARY KEY(sizeNo)
-- );
DROP TABLE IF EXISTS SPECIAL_SIZING;
CREATE TABLE SPECIAL_SIZING(
special_sizingNo INT,
special_sizing VARCHAR(50),
PRIMARY KEY(special_sizingNo)
);

DROP TABLE IF EXISTS COLOR;
CREATE TABLE COLOR(
colorNo INT NOT NULL,
color VARCHAR(15),
PRIMARY KEY(colorNo)
);

-- insert statements here !

Insert into TYPE values (0, 'Tops');
Insert into TYPE values (1, 'Bottoms');
Insert into TYPE values (2, 'One Piece');
Insert into TYPE values (3, 'Shoes');
Insert into TYPE values (4, 'Accessories');

-- subtypeNo, typeNo, subtype
Insert into SUBTYPE values (0, 0, 'Blouse');
Insert into SUBTYPE values (1, 0, 'Button Down');
Insert into SUBTYPE values (2, 0, 'Short Sleeve Tee');
Insert into SUBTYPE values (3, 0, 'Long Sleeve Tee');
Insert into SUBTYPE values (4, 0, 'Sweater');
Insert into SUBTYPE values (5, 0, 'Tank Top');
Insert into SUBTYPE values (6, 0, 'Bodysuit');
Insert into SUBTYPE values (7, 0, 'Sweatshirt');
Insert into SUBTYPE values (8, 0, 'Jacket');
Insert into SUBTYPE values (9, 0, 'Coat');
Insert into SUBTYPE values (10, 0, 'Batching Top');

Insert into SUBTYPE values (11, 1, 'Skirt');
Insert into SUBTYPE values (12, 1, 'Pants');
Insert into SUBTYPE values (13, 1, 'Leggings');
Insert into SUBTYPE values (14, 1, 'Jeans');
Insert into SUBTYPE values (15, 1, 'Bathing Bottom');

Insert into SUBTYPE values (16, 2, 'Dress');
Insert into SUBTYPE values (17, 2, 'Overalls');
Insert into SUBTYPE values (18, 2, 'Jumpsuit');
Insert into SUBTYPE values (19, 2, 'Swimsuit');

Insert into SUBTYPE values (20, 3, 'Flats');
Insert into SUBTYPE values (21, 3, 'Sneakers');
Insert into SUBTYPE values (22, 3, 'Boots');
Insert into SUBTYPE values (23, 3, 'Heels');
Insert into SUBTYPE values (24, 3, 'Loafers');
Insert into SUBTYPE values (25, 3, 'Dress Shoes');
Insert into SUBTYPE values (26, 3, 'Sandals');
Insert into SUBTYPE values (27, 3, 'Slippers');

Insert into SUBTYPE values (28, 4, 'Belt');
Insert into SUBTYPE values (29, 4, 'Earrings');
Insert into SUBTYPE values (30, 4, 'Necklace');
Insert into SUBTYPE values (31, 4, 'Bracelet');
Insert into SUBTYPE values (32, 4, 'Ring');
Insert into SUBTYPE values (33, 4, 'Hair Accessories');
Insert into SUBTYPE values (34, 4, 'Tie');
Insert into SUBTYPE values (35, 4, 'Scarf');
Insert into SUBTYPE values (36, 4, 'Bag');
Insert into SUBTYPE values (37, 4, 'Hat');
Insert into SUBTYPE values (38, 4, 'Other');


Insert into SPECIAL_SIZING values (0, 'Petite');
Insert into SPECIAL_SIZING values (1, 'Tall');
Insert into SPECIAL_SIZING values (2, 'Curvy');
Insert into SPECIAL_SIZING values (3, 'Maternity');
Insert into SPECIAL_SIZING values (4, 'Wide');
Insert into SPECIAL_SIZING values (5, 'Narrow');


Insert into COLOR values (0, 'White');
Insert into COLOR values (1, 'Black');
Insert into COLOR values (2, 'Grey');
Insert into COLOR values (3, 'Red');
Insert into COLOR values (4, 'Orange');
Insert into COLOR values (5, 'Yellow');
Insert into COLOR values (6, 'Green');
Insert into COLOR values (7, 'Blue');
Insert into COLOR values (8, 'Purple');
Insert into COLOR values (9, 'Pink');
Insert into COLOR values (10, 'Patterned');

Insert into GENDER values (0, 'Womens');
Insert into GENDER values (1, 'Mens');
Insert into GENDER values (2, 'N/A');

-- insert testing data !
Insert into USER values(100000, 'testing', 'testing1', 'jessmiro@uw.edu', 2065658325);

-- without sizeNo and switched subtype and colorNo
Insert into CLOTHING values(100000, 100000, 'https://onlineclosetblob.blob.core.windows.net/online-closet-capstone/practice-clothing/IMG_1432.jpeg', 'red flower white dress', 'Jessica Simpson', 'cute white dress with red flowers. Pairs well with red shoes and Vivienne Westwood necklace', 'M', 2, 0, 0, NULL, 0, 0, 0);


Insert into CLOTHING values(100000, 100001, 'https://onlineclosetblob.blob.core.windows.net/online-closet-capstone/practice-clothing/IMG_1433.jpeg', 'burgundy aviator jacket', 'topshop', 'Includes 3 belt pieces', '8', 0, 9, 3, NULL, 0, 0, 0);

Insert into SPECIAL_SIZING values(6, 'N/A');

-- Select * FROM CLOTHING;
