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
  name character varying NOT NULL,
  data text NOT NULL,
  date timestamp with time zone,
  CONSTRAINT imgs_name_pkey PRIMARY KEY (name),
  CONSTRAINT imgs_data_unique UNIQUE (data)
);