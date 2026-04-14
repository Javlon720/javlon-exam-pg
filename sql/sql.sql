CREATE table users(
    id serial primary key,
    email text not null,
    password text not null,
    age int ,
    name text not null,
    is_admin BOOLEAN,
    gender text
);