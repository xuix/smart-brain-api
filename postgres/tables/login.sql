BEGIN TRANSACTION;

-- Table: public.login

-- DROP TABLE public.login;

CREATE SEQUENCE login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE public.login
(
    id integer NOT NULL DEFAULT nextval('login_id_seq'::regclass),
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    hash character varying(200) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

--ALTER TABLE public.login
  --  OWNER to postgres;

COMMIT;