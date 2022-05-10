-- Appetizers
INSERT INTO menu_items (item_name, description, price, image_url, category_id)
VALUES ('Green Mango Salad', 'Featuring unripe mango, fresh herbs, and spicy seasonings, all tied together by a savory fish sauce. The highlight is the green mango, which gives the overall dish a very unique crunchy and tangy taste.', 899, '/images/green-mango-salad.jpg', 1),
('Fresh Spring Rolls', 'Fresh, veggie-packed spring rolls. Served with a peanut dipping sauce.', 999, '/images/fresh-spring-rolls.jpg', 1),
('Chicken Satay', 'A trendy street food in Thailand. The chicken is marinated for 2 hours, skewered, then grilled to perfection. Served with a homemade peanut sauce and Thai-style cucumber dressing.', 1199, '/images/chicken-satay.jpg', 1),
('Thai Chicken Wings', 'Fried chicken wings topped with crispy shallots, magrud lime leaves, and crispy chillies with a sweet tamarind sauce.', 1099, '/images/chicken-wings.jpg', 1);

-- Mains
INSERT INTO menu_items (item_name, description, price, image_url, category_id)
VALUES ('Pad Thai', 'Stir-fried rice noodles with eggs, vegetables and tofu in a sauce of tamarind, fish, dried shrimp, garlic, red chilli pepper and sugar.', 1299, '/images/pad-thai.jpg', 2),
('Green Curry', 'Chicken, coconut milk, green curry paste, palm sugar, fish sauce, aubergine, pea aubergine, basil leaves.', 1399, '/images/green-curry.jpg', 2),
('Khao Soi', 'Coconut curry noodle soup consisting of noodles in a thick, rich coconut broth with chicken.', 1499, '/images/khao-soi.jpg', 2),
('Pad Gra Prow', 'Rice with chicken holy basil stir-fry and a fried egg.', 1299, '/images/pad-gra-prow.jpg', 2),
('Massaman Curry', 'An aromatic curry with a tangy, thick sauce with a mild sweet flavour. Contains fragrant spice undertones of cumin, cardamom, and cinnamon.', 1399, '/images/massaman-curry.jpg', 2);

-- Sides
INSERT INTO menu_items (item_name, description, price, image_url, category_id)
VALUES ('Jasmine Rice', 'Long grain rice native to Thailand with a delicate floral and buttery scent.', 400, '/images/jasmine-rice.jpg', 3),
('Sticky Rice', 'Tender, chewy, and sweeter than traditional rice.', 450, '/images/sticky-rice.jpg', 3),
('Peanut Sauce', 'Bold peanut flavour that is sweet and salty. Notes of ginger, lime, soy sauce, and garlic.', 350, '/images/peanut-sauce.jpg', 3);

-- Desserts
INSERT INTO menu_items (item_name, description, price, image_url, category_id)
VALUES ('Thai Mango Sticky Rice', 'Sweetened with coconut milk and served with ripe mango cubes.', 799, '/images/mango-sticky-rice.jpg', 4),
('Thai Mango Coconut Pudding', 'A soft, silkly, and jiggly pudding that is rich, creamy, and a bit nutty.', 699, '/images/mango-coconut-pudding.jpg', 4),
('Pandan Coconut Jelly', 'Two layer dessert made of coconut milk, pandan flavor, and agar-agar.', 699, '/images/pandan-jelly.jpg', 4);

-- Beverages
INSERT INTO menu_items (item_name, description, price, image_url, category_id)
VALUES ('Thai Iced Tea', 'Strongly brewed black tea, spiced with star anise, crushed tamarind, and cardamom.', 599, '/images/thai-iced-tea.jpg', 5),
('Pot of Tea', 'Green Tea.', 399, '/images/tea.jpg', 5),
('Pop', 'Coke, Gingerale, Root Beer.', 250, '/images/pop.jpg', 5);
