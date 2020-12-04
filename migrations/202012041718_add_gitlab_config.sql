CREATE TABLE integration_gitlab (
	id serial NOT NULL,
	url varchar(500) NOT NULL,
	"path" varchar(300) NOT NULL,
	ssl bool NOT NULL,
	application_id varchar(300) NOT NULL,
	application_secret varchar(300) NOT NULL,
	tenant_id int4 NOT NULL,
	create_at timestamptz NOT NULL  DEFAULT now(),
	CONSTRAINT integration_gitlab_pkey PRIMARY KEY (id)
);
CREATE INDEX index_tenant_id ON integration_gitlab USING btree (tenant_id);