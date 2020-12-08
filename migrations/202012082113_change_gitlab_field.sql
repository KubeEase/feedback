ALTER TABLE integration_gitlab drop application_id ;
ALTER TABLE integration_gitlab add username varchar(300) NOT null default '';
ALTER TABLE integration_gitlab drop application_secret ;
ALTER TABLE integration_gitlab add token varchar(300) NOT null default '';