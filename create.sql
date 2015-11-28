CREATE TABLE users
(
  id serial NOT NULL,
  username character varying(32),
  salt character varying(256),
  hash character varying(256),
  date timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_username_key UNIQUE (username)
);

CREATE TABLE imgs
(
  name character varying(256) NOT NULL,
  data json NOT NULL,
  date timestamp with time zone,
  hash character varying(256) NOT NULL,
  salt character varying(256) NOT NULL,
  ext character varying(8) NOT NULL,
  CONSTRAINT imgs_name_pkey PRIMARY KEY (name)
);