create database weather with owner postgres template template0 encoding 'UTF-8' tablespace pg_default lc_collate 'C' lc_type 'C' connection limit -1;

\c weather;

create table if not exists public.cities
(
    id   bigserial,
    name varchar(255)
);

create table if not exists public.forecast
(
    id          bigserial,
    "cityId"    bigint,
    "dateTime"  bigint,
    temperature integer,
    summary     text
);