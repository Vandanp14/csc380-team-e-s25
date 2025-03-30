CREATE TABLE route(
	rt char(10) PRIMARY KEY,
    des varchar(256),
	stop_id char(10),
	timestamp TIMESTAMP,
    is_delayed BOOLEAN DEFAULT false,
    lat char(20),
    lon char(20),
    speed char(3)
);