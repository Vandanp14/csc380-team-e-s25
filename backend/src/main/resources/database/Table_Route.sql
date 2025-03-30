CREATE TABLE route(
	rt_id varchar(256) PRIMARY KEY,
    route varchar(256),
	timestamp TIMESTAMP,
    is_delayed BOOLEAN DEFAULT false,
    lat char(20),
    lon char(20),
    speed char(3)
);