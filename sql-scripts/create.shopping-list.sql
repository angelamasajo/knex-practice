--creates a new type called grocery, which is ENUM 
--ENUM - (a list of options that may be used by columns which have this new type in a table)
DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

--creates table , shopping_list with 6 columns
CREATE TABLE IF NOT EXISTS shopping_list (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price decimal(10,2) NOT NULL,
    date_added TIMESTAMPTZ DEFAULT now() NOT NULL,
    checked BOOLEAN DEFAULT false,
    category grocery NOT NULL
);


