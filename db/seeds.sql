INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Richard', 'Hendricks', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bertram', 'Gilfoyle', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dinesh', 'Chugtai', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nelson', 'Bighetti', 3, 1);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Network Engineers');
INSERT INTO department (department_name)
VALUES ('Programmers');

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Network Engineer', 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Programmer', 45000, 3);