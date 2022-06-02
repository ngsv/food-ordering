-- Users table seeds

-- Admin
INSERT INTO users (username, password, first_name, last_name, phone_number, email, is_admin)
VALUES ('user1', 'password', 'Steven', 'Ngov', '647-718-1094', 'gl.steven.ngov@gmail.com', TRUE);

-- Customers
INSERT INTO users (username, password, first_name, last_name, phone_number, email)
VALUES ('user2', 'password', 'George', 'Massow', '647-718-1094', 'georgemassow@email.com'),
('user3', 'password', 'Yassine', 'Kifuat', '647-718-1094', 'yassinekifuat@email.com'),
('user4', 'password', 'Carmen', 'Tu', '647-718-1094', 'carmen.tu@outlook.com');
