CREATE DATABASE IF NOT EXISTS fichajes;

USE fichajes;

DROP TABLE IF EXISTS Prefiere;
DROP TABLE IF EXISTS Utiliza;
DROP TABLE IF EXISTS Escuderia;
DROP TABLE IF EXISTS Piloto;
DROP TABLE IF EXISTS Coche;

-- Tabla Coche
CREATE TABLE Coche (
    nombre_modelo VARCHAR(100) PRIMARY KEY,
    caballos INT NOT NULL,
    pais_fabricacion VARCHAR(100) NOT NULL
);

-- Tabla Piloto
CREATE TABLE Piloto (
    nombre_piloto VARCHAR(100),
    apellido_piloto VARCHAR(100),
    nacionalidad VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    PRIMARY KEY (nombre_piloto, apellido_piloto)
);

-- Tabla Escudería
CREATE TABLE Escuderia (
    nombre_escuderia VARCHAR(100) PRIMARY KEY,
    pais_sede VARCHAR(100) NOT NULL
);

-- Tabla Piloto prefiere_correr_para Escudería
CREATE TABLE Prefiere (
    nombre_piloto VARCHAR(100),
    apellido_piloto VARCHAR(100),
    nombre_escuderia VARCHAR(100),
    salario_propuesto DECIMAL(10, 2),
    PRIMARY KEY (nombre_piloto, apellido_piloto, nombre_escuderia),
    FOREIGN KEY (nombre_piloto, apellido_piloto) REFERENCES Piloto (nombre_piloto, apellido_piloto),
    FOREIGN KEY (nombre_escuderia) REFERENCES Escuderia (nombre_escuderia)
);

-- Tabla Piloto utiliza Coche
CREATE TABLE Utiliza (
    nombre_piloto VARCHAR(100),
    apellido_piloto VARCHAR(100),
    nombre_modelo VARCHAR(100),
    mejor_tiempo TIME,
    PRIMARY KEY (nombre_piloto, apellido_piloto, nombre_modelo),
    FOREIGN KEY (nombre_piloto, apellido_piloto) REFERENCES Piloto (nombre_piloto, apellido_piloto),
    FOREIGN KEY (nombre_modelo) REFERENCES Coche (nombre_modelo)
);

-- Datos para la tabla Coche
INSERT INTO Coche (nombre_modelo, caballos, pais_fabricacion) VALUES
('Red Bull RB20', 1000, 'Reino Unido'),
('Mercedes W15', 1020, 'Alemania'),
('Ferrari SF-24', 1015, 'Italia'),
('Alpine A524', 980, 'Francia'),
('McLaren MCL38', 990, 'Reino Unido');
-- Datos para la tabla Piloto
INSERT INTO Piloto (nombre_piloto, apellido_piloto, nacionalidad, edad) VALUES
('Carlos', 'Serrano', 'España', 24),
('Liam', 'Harper', 'Reino Unido', 22),
('Matteo', 'Rossi', 'Italia', 26),
('Lucas', 'Schneider', 'Alemania', 25),
('Noah', 'Dubois', 'Francia', 23),
('Ethan', 'Bennett', 'Estados Unidos', 21);
-- Datos para la tabla Escudería
INSERT INTO Escuderia (nombre_escuderia, pais_sede) VALUES
('Red Bull Racing', 'Reino Unido'),
('Mercedes-AMG Petronas Motorsport', 'Alemania'),
('Scuderia Ferrari', 'Italia'),
('BWT Alpine F1 Team', 'Francia'),
('McLaren F1 Team', 'Reino Unido'),
('Aston Martin Aramco Cognizant', 'Reino Unido'),
('Visa Cashapp RB', 'Italia'),
('Kick Sauber F1 Team', 'Suiza'),
('MoneyGram Haas F1 Team', 'Estados Unidos'),
('Williams Racing', 'Reino Unido');
-- Datos para la tabla Piloto utiliza Coche
INSERT INTO Utiliza (nombre_piloto, apellido_piloto, nombre_modelo, mejor_tiempo) VALUES
('Carlos', 'Serrano', 'Red Bull RB20', '00:01:32'),
('Liam', 'Harper', 'Mercedes W15', '00:01:30'),
('Matteo', 'Rossi', 'Ferrari SF-24', '00:01:31'),
('Lucas', 'Schneider', 'Alpine A524', '00:01:33'),
('Noah', 'Dubois', 'McLaren MCL38', '00:01:34'),
('Ethan', 'Bennett', 'Mercedes W15', '00:01:35'),
('Carlos', 'Serrano', 'Ferrari SF-24', '00:01:29'),
('Lucas', 'Schneider', 'McLaren MCL38', '00:01:33'),
('Matteo', 'Rossi', 'Red Bull RB20', '00:01:28');
-- Datos para la tabla Piloto prefiere_correr_para Escudería
INSERT INTO Prefiere (nombre_piloto, apellido_piloto, nombre_escuderia, salario_propuesto) VALUES
('Carlos', 'Serrano', 'Red Bull Racing', 1500000.00),
('Liam', 'Harper', 'Mercedes-AMG Petronas Motorsport', 1400000.00),
('Matteo', 'Rossi', 'Scuderia Ferrari', 1450000.00),
('Lucas', 'Schneider', 'McLaren F1 Team', 1350000.00),
('Noah', 'Dubois', 'BWT Alpine F1 Team', 1300000.00),
('Ethan', 'Bennett', 'Red Bull Racing', 1250000.00),
('Carlos', 'Serrano', 'BWT Alpine F1 Team', 1400000.00),
('Matteo', 'Rossi', 'McLaren F1 Team', 1380000.00),
('Matteo', 'Rossi', 'Aston Martin Aramco Cognizant', 1420000.00);