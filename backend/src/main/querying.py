import requests
from mysql.connector import connect

# Connect to MySQL
conn = connect(
    host="pi.cs.oswego.edu",
    user="CSC380_25S_TeamE",
    password="Bu$Tr@ck3r1000_?",
    database="CSC380_25S_TeamE"
)
c = conn.cursor()

rt = input("Enter route code: ")
stpnm = input("Enter stop name: ")

c.execute("SELECT Stops.", stpnm,
          ",Routes.",rt,",Routes.des,"
          "prdtm,prdctdn,tmstmp,dly,rtdir"
          "FROM ETA INNER JOIN Routes ON ETA.rt=Routes.rt "
          "INNER JOIN Stops ON ETA.stpid=Stops.stupid "
          "LIMIT 1"
          )

print(c.fetchall())