CREATE TABLE ETA(
	stpid CHAR(6) NOT NULL,
    rt CHAR(10) NOT NULL,
    FOREIGN KEY (stpid) REFERENCES Stops(stupid),
    FOREIGN KEY (rt) REFERENCES Routes(rt),
    prdtm TIMESTAMP NOT NULL COMMENT 'Predicted Arrival Timestamp',
    prdctdn INT NOT NULL COMMENT 'Predicted Arrival Countdown in Minutes. DUE = 0',
    tmstmp TIMESTAMP NOT NULL COMMENT 'Current Timestamp',
    dly BOOLEAN NOT NULL COMMENT 'delay status',
    rtdir VARCHAR(50) COMMENT 'route direction'
);