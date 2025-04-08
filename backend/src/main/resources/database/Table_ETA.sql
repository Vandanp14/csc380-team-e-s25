CREATE TABLE ETA(
	stpid CHAR(6),
    rt CHAR(10),
    FOREIGN KEY (stpid) REFERENCES Stops(stpid),
    FOREIGN KEY (rt) REFERENCES Routes(rt),
    prdtm TIMESTAMP COMMENT 'Predicted Arrival Timestamp',
    prdctdn CHAR(3) COMMENT 'Predicted Arrival Countdown in Minutes',
    tmstmp TIMESTAMP COMMENT 'Current Timestamp',
    dly BOOLEAN COMMENT 'delay status' 
);