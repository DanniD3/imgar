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
  CONSTRAINT imgs_name_hash_pkey PRIMARY KEY (name, hash)
);

CREATE TABLE cmts
(
  username character varying(32) NOT NULL,
  text character varying NOT NULL,
  hash character varying(256) NOT NULL,
  date timestamp with time zone,
  id serial NOT NULL,
  CONSTRAINT cmts_id_pkey PRIMARY KEY (id),
  CONSTRAINT cmts_user_fkey FOREIGN KEY (username)
      REFERENCES users (username) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE NO ACTION
);