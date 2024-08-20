INSERT INTO departments (name)
VALUES 
  ('WarioWare Inc.'),
  ('Waluigis Mansion'),
  ('Diamond City'),
  ('Wario Stadium');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('CEO', 200000, 1),                
  ('Mischief Maker', 150000, 2),     
  ('Engineer', 120000, 1),           
  ('Gold Hoarder', 180000, 3),       
  ('Tennis Pro', 90000, 2),          
  ('Mechanic', 80000, 4),           
  ('DJ', 85000, 3);                  
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Wario', 'Ware', 1, NULL),              
  ('Waluigi', 'Wario', 2, NULL),           
  ('Jimmy', 'T.', 3, 1),                   
  ('Wario', 'Greed', 4, NULL),             
  ('Waluigi', 'Tennis', 5, NULL),          
  ('Dribble', 'Dog', 6, 1),                
  ('Spitz', 'Cat', 6, 1),                  
  ('Mona', 'Pizza', 7, 4);                 
