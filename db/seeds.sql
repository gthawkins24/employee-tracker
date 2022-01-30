INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Richard', 'Hendricks', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Bertram', 'Gilfoyle', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Dinesh', 'Chugtai', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Nelson', 'Bighetti', 3, 1);

INSERT INTO department(department_name)
VALUES ('Management');
INSERT INTO department(department_name)
VALUES ('Network Engineers');
INSERT INTO department(department_name)
VALUES ('Programmers');

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Network Engineer', 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Programmer', 45000, 3);