CREATE DATABASE Desarrollo;

USE Prueba01;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT, correo VARCHAR(50) NOT NULL
);

CREATE TABLE tipoPersona(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipoPersona VARCHAR(50) NOT NULL,
);

SELECT * FROM personas;