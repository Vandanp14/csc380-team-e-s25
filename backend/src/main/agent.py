# import requests
# import mysql.connector
# from datetime import datetime
#
# # Connect to MySQL
# conn = mysql.connector.connect(
#         host="pi.cs.oswego.edu",
#         user="CSC380_25S_TeamE",
#         password="Bu$Tr@ck3r1000_?",
#         database="CSC380_25S_TeamE"
#     )
#
# # API configuration
# url = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=15521,15527,15529,16164,16168,16169,16170,16182,16183,16184&format=json"
#
# # Fetch data from API
# response = requests.get(url)
#
# if response.status_code == 200:
#     json_data = response.json()  # Get JSON data
#     #print("API Response:", json_data)  # Print to check structure
# else:
#     print("Error:", response.status_code)
#     exit()
#
# try:
#     cursor = conn.cursor()
#     # Check if API returned vehicles
#     if 'bustime-response' in json_data and 'vehicle' in json_data['bustime-response']:
#         vehicles = json_data['bustime-response']['vehicle']
#
#         for vehicle in vehicles:
#             # Extract data from JSON response
#             des = vehicle.get('des', '')  # Bus description
#             rt = vehicle.get('rt', '')  # Route number
#             timestamp = vehicle.get('tmstmp', '')  # Timestamp
#             is_delayed = vehicle.get('dly', False)  # Delay status (true/false)
#             vid = vehicle.get('vid', 0)  # VechicleID
#             stpid=vehicle.get('stpid',0)
#             stpnm = vehicle.get('stpnm', 0)  # Stopname
#             prdctdn = vehicle.get('prdctdn', 0)  # predictedtime
#
#
#             # Convert timestamp to MySQL datetime format if needed
#             try:
#                 timestamp = datetime.strptime(timestamp, '%Y%m%d %H:%M:%S')
#             except (ValueError, TypeError):
#                 timestamp = None
#
#             # SQL Insert Statement (matches your table structure)
#             sql = """INSERT INTO route
#                      (rt, des, stop_id, timestamp, is_delayed, lat, lon, spd)
#                      VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
#             values = (rt, des, stpid, timestamp, is_delayed, vid, stpnm, prdctdn)
#
#             cursor.execute(sql, values)
#         # Commit changes
#         conn.commit()
#         print(f"Successfully inserted {len(vehicles)} records into MySQL!")
#     else:
#         print("No vehicle data found in API response")
#         if 'error' in json_data.get('bustime-response', {}):
#             error_msg = json_data['bustime-response']['error'][0]['msg']
#             print(f"API Error: {error_msg}")
#
# except mysql.connector.Error as err:
#     print(f"MySQL Error: {err}")
# finally:
#     # Close connections
#     if 'cursor' in locals():
#         cursor.close()
#     if 'conn' in locals() and conn.is_connected():
#         conn.close()
#
# ------------------

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

# API URL
url = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=15521,15527,15529,16164,16168,16169,16170,16182,16183,16184&format=json"

try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    if "bustime-response" not in data:
        print("Unexpected API response format")

    elif "error" in data["bustime-response"]:
        error_msg = data["bustime-response"]["error"][0]["msg"]
        print(f"API Error: {error_msg}")

    elif "prd" in data["bustime-response"]:
        predictions = data["bustime-response"]["prd"]

        for p in predictions:
            try:
                # Convert prediction time to MySQL datetime
                prdtm = datetime.strptime(p["prdtm"], "%Y%m%d %H:%M")
                tmpstmp = datetime.strptime(p["tmstmp"], "%Y%m%d %H:%M")

                # Insert into Routes table
                sql_routes = "INSERT INTO Routes (rt, des) VALUES (%s, %s)"
                cursor.execute(sql_routes, (p.get("rt"), p.get("des")))

                # Insert into Stops table
                sql_stops = "INSERT INTO Stops (stpid, stpnm) VALUES (%s, %s)"
                cursor.execute(sql_stops, (p.get("stpid"), p.get("stpnm")))

                # Insert into ETA table
                sql_eta = """
                    INSERT INTO ETA (stpid, rt, prdtm, prdctdn, tmstmp, dly)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                values_eta = (
                    p.get("stpid"),
                    p.get("rt"),
                    prdtm,
                    int(p.get("prdctdn", -1)),  # handle "DUE" or missing with -1
                    tmpstmp,
                    p.get("dly", False)
                )
                cursor.execute(sql_eta, values_eta)


            except Exception as e:
                print(f"Error inserting prediction: {e}")

        conn.commit()
        print(f"Successfully inserted {len(predictions)} predictions!")

    else:
        print("No predictions available.")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
except ValueError:
    print("Failed to parse JSON.")
except mysql.connector.Error as err:
    print(f"MySQL Error: {err}")
finally:
    if cursor:
        cursor.close()
    if conn and conn.is_connected():
        conn.close()

