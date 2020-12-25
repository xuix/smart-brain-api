BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) values ('x','x@x.com',5,'2020-12-20');
-- user x password x
INSERT INTO login (email,hash) values ('x@x.com','$2b$10$QgSpTsSqbxF5oBPnl1u/uu6qanXS6ldxMFTmMS82h4QYzucDaIe32');

COMMIT;