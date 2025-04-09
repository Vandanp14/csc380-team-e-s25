import requests
import mysql.connector
from datetime import datetime

# Connect to MySQL
conn = mysql.connector.connect(
    host="pi.cs.oswego.edu",
    user="CSC380_25S_TeamE",
    password="Bu$Tr@ck3r1000_?",
    database="CSC380_25S_TeamE"
)
cursor = conn.cursor()

cursor.execute(
    """SELECT Stops.stpnm,Routes.des,prdtm,prdctdn,tmstmp,dly,rtdir 
    FROM ETA 
    INNER JOIN Routes ON ETA.rt=Routes.rt 
    INNER JOIN Stops ON ETA.stpid=Stops.stpid 
    LIMIT 1"""
)

print(cursor.fetchall())