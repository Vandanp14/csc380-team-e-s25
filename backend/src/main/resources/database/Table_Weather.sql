CREATE TABLE weather(
    timestamp TIMESTAMP PRIMARY KEY,
	precip DECIMAL(10,3),
    preciptype varchar(256),
    windgust DECIMAL(10,3),
    windspeed DECIMAL(10,3),
    visibility DECIMAL(10,3)
);
-- categories based on data pulled from Visual Crossing API for Oswego, NY