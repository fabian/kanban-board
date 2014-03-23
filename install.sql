CREATE DATABASE kanban;

CREATE TABLE cards
(
  id serial NOT NULL,
  title text,
  description text,
  person character varying(255),
  status character varying(255),
  estimate integer,
  board character varying(255),
  CONSTRAINT id PRIMARY KEY (id)
);
