CREATE TABLE ETA(
	stpid CHAR(6) NOT NULL,
    rt CHAR(10) NOT NULL,
    FOREIGN KEY (stpid) REFERENCES Stops(stpid),
    FOREIGN KEY (rt) REFERENCES Routes(rt),
    prdtm TIMESTAMP NOT NULL COMMENT 'Predicted Arrival Timestamp',
    prdctdn CHAR(3) NOT NULL COMMENT 'Predicted Arrival Countdown in Minutes',
    tmstmp TIMESTAMP NOT NULL COMMENT 'Current Timestamp',
    dly BOOLEAN NOT NULL COMMENT 'delay status' 
);