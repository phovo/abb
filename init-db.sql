-- CREATE TABLE technologies (
--   name    VARCHAR(255),
--   details VARCHAR(255)
-- );
-- insert into technologies values (
--   'Go', 'An open source programming language that makes it easy to build simple and efficient software.'
-- );
-- insert into technologies values (
--   'JavaScript', 'A lightweight, interpreted, or just-in-time compiled programming language with first-class functions.'
-- );
-- insert into technologies values (
--   'PostgreSQL', 'A powerful, open source object-relational database system'
-- );
-- CREATE TABLE types (
--   code VARCHAR(255),
--   name VARCHAR(255)
-- );
-- insert into types values (
--   'FE', 'front-end'
-- );
-- insert into types values (
--   'BE', 'back-end'
-- );
--
-- PostgreSQL database dump
--
-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5
SET
  statement_timeout = 0;

SET
  lock_timeout = 0;

SET
  idle_in_transaction_session_timeout = 0;

SET
  client_encoding = 'UTF8';

SET
  standard_conforming_strings = on;

SET
  check_function_bodies = false;

SET
  client_min_messages = warning;

SET
  row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET
  search_path = public,
  pg_catalog;

SET
  default_tablespace = '';

SET
  default_with_oids = false;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres 
--
CREATE TABLE roles (
  id bigint NOT NULL,
  name character varying(20) NOT NULL
);

ALTER TABLE
  roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE roles_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE roles_id_seq OWNED BY roles.id;

--
-- Name: skus; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE skus (
  id bigint NOT NULL,
  name character varying(100) NOT NULL,
  status boolean,
  description character varying(200)
);

ALTER TABLE
  skus OWNER TO postgres;

--
-- Name: skus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE skus_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  skus_id_seq OWNER TO postgres;

--
-- Name: skus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE skus_id_seq OWNED BY skus.id;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE user_role (
  user_id bigint NOT NULL,
  role_id bigint NOT NULL
);

ALTER TABLE
  user_role OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE users (
  id bigint NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(100) NOT NULL,
  password character varying(100) NOT NULL
);

ALTER TABLE
  users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE users_id_seq OWNED BY users.id;

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY roles
ALTER COLUMN
  id
SET
  DEFAULT nextval('roles_id_seq' :: regclass);

--
-- Name: skus id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY skus
ALTER COLUMN
  id
SET
  DEFAULT nextval('skus_id_seq' :: regclass);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ALTER COLUMN
  id
SET
  DEFAULT nextval('users_id_seq' :: regclass);

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY roles (id, name)
FROM
  stdin;

2 ADMIN 3 MANAGER 1 SYSADMIN \.--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('roles_id_seq', 3, true);

--
-- Data for Name: skus; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY skus (id, name, status, description)
FROM
  stdin;

\.--
-- Name: skus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('skus_id_seq', 17, true);

--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY user_role (user_id, role_id)
FROM
  stdin;

1 1 \.--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY users (id, name, email, password)
FROM
  stdin;

1 system system @admin.com sa123456 \.--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('users_id_seq', 1, true);

--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY roles
ADD
  CONSTRAINT roles_pkey PRIMARY KEY (id);

--
-- Name: skus skus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY skus
ADD
  CONSTRAINT skus_pkey PRIMARY KEY (id);

--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY user_role
ADD
  CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id);

--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_email_key UNIQUE (email);

--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_password_key UNIQUE (password);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--
--
-- PostgreSQL database dump
--
-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5
SET
  statement_timeout = 0;

SET
  lock_timeout = 0;

SET
  idle_in_transaction_session_timeout = 0;

SET
  client_encoding = 'UTF8';

SET
  standard_conforming_strings = on;

SET
  check_function_bodies = false;

SET
  client_min_messages = warning;

SET
  row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--
CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET
  search_path = public,
  pg_catalog;

SET
  default_tablespace = '';

SET
  default_with_oids = false;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE roles (
  id bigint NOT NULL,
  name character varying(20) NOT NULL
);

ALTER TABLE
  roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE roles_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE roles_id_seq OWNED BY roles.id;

--
-- Name: skus; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE skus (
  id bigint NOT NULL,
  name character varying(100) NOT NULL,
  status boolean,
  description character varying(200)
);

ALTER TABLE
  skus OWNER TO postgres;

--
-- Name: skus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE skus_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  skus_id_seq OWNER TO postgres;

--
-- Name: skus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE skus_id_seq OWNED BY skus.id;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE user_role (
  user_id bigint NOT NULL,
  role_id bigint NOT NULL
);

ALTER TABLE
  user_role OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE users (
  id bigint NOT NULL,
  name character varying(100) NOT NULL,
  email character varying(100) NOT NULL,
  password character varying(100) NOT NULL
);

ALTER TABLE
  users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
CREATE SEQUENCE users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
  users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--
ALTER SEQUENCE users_id_seq OWNED BY users.id;

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY roles
ALTER COLUMN
  id
SET
  DEFAULT nextval('roles_id_seq' :: regclass);

--
-- Name: skus id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY skus
ALTER COLUMN
  id
SET
  DEFAULT nextval('skus_id_seq' :: regclass);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ALTER COLUMN
  id
SET
  DEFAULT nextval('users_id_seq' :: regclass);

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY roles (id, name)
FROM
  stdin;

2 ADMIN 3 MANAGER 1 SYSADMIN \.--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('roles_id_seq', 3, true);

--
-- Data for Name: skus; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY skus (id, name, status, description)
FROM
  stdin;

\.--
-- Name: skus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('skus_id_seq', 17, true);

--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY user_role (user_id, role_id)
FROM
  stdin;

1 1 \.--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY users (id, name, email, password)
FROM
  stdin;

1 system system @admin.com sa123456 \.--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
SELECT
  pg_catalog.setval('users_id_seq', 1, true);

--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY roles
ADD
  CONSTRAINT roles_pkey PRIMARY KEY (id);

--
-- Name: skus skus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY skus
ADD
  CONSTRAINT skus_pkey PRIMARY KEY (id);

--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY user_role
ADD
  CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id);

--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_email_key UNIQUE (email);

--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_password_key UNIQUE (password);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE
  ONLY users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- PostgreSQL database dump complete
--