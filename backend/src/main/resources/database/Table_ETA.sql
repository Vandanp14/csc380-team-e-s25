CREATE TABLE ETA(
	stpid CHAR(6),
    rt CHAR(10),
    prdtm TIMESTAMP COMMENT 'Predicted Arrival Timestamp',
    prdctdn INT COMMENT 'Predicted Arrival Countdown in Minutes',
    tmstmp TIMESTAMP COMMENT 'Current Timestamp',
    dly BOOLEAN COMMENT 'delay status' 
);