CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    emp_role VARCHAR(255) NOT NULL,
    manager VARCHAR(255) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emp_role VARCHAR(255) NOT NULL,
    salary INT(10) NOT NULL,
    department VARCHAR(255)
);

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);