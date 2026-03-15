CREATE DATABASE storeperu;

USE storeperu;


CREATE TABLE marcas
(
  id        INT AUTO_INCREMENT PRIMARY KEY,
  marca     VARCHAR(30) NOT NULL
)ENGINE = INNODB;


CREATE TABLE  productos
(
  id            INT AUTO_INCREMENT PRIMARY KEY,
  idmarca       INT NOT NULL, 
  descripcion   VARCHAR(50),
  precio        DECIMAL(7,2),
  stock         INT,
  garantia      TINYINT,

  CONSTRAINT fk_marca FOREIGN KEY (idmarca) REFERENCES marcas(id)
)ENGINE = INNODB;



INSERT INTO marcas(marca) VALUES
('Nike'),
('Adidas'),
('Jordan'),
('Puma'),
('New Balance');


INSERT INTO productos(idmarca, descripcion, precio, stock, garantia) VALUES
(1, 'Zapatillas deportivas Nike Air Max', 120.00, 25, '6'),
(1, 'Zapatillas Nike Revolution para running', 85.50, 40, '6'),
(1, 'Polo deportivo Nike Dri-FIT', 35.90, 60, '3 '),
(1, 'Short deportivo Nike entrenamiento', 29.90, 50, '3 '),
(1, 'Casaca deportiva Nike con capucha', 79.90, 20, '6 '),
(1, 'Mochila deportiva Nike training', 45.00, 30, '3 '),
(1, 'Gorra Nike deportiva ajustable', 22.50, 70, '3 ');




SELECT * FROM productos;

SELECT * FROM marcas;



