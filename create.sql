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

CREATE TABLE msg
(
  id serial NOT NULL,
  publisher character varying(32) NOT NULL,
  title character varying(64) NOT NULL,
  text character varying NOT NULL,
  date timestamp with time zone,
  CONSTRAINT msg_pkey PRIMARY KEY (id),
  CONSTRAINT users_fkey FOREIGN KEY (publisher)
      REFERENCES users (username) MATCH FULL
      ON UPDATE RESTRICT ON DELETE NO ACTION,
  CONSTRAINT msg_text_not_empty CHECK (text::text <> ''::text),
  CONSTRAINT msg_title_not_empty CHECK (title::text <> ''::text)
);