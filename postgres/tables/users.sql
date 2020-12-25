BEGIN TRANSACTION;

-- Table: public.users

-- DROP TABLE public.users;



CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    joined timestamp with time zone NOT NULL,
    entries bigint NOT NULL DEFAULT 0
)

TABLESPACE pg_default;

--ALTER TABLE public.users
 --   OWNER to postgres;

COMMIT;