import requests
import mysql.connector
from datetime import datetime
import time
from mysql.connector import Error


def connect_to_db():
    try:
        return mysql.connector.connect(
            host="pi.cs.oswego.edu",
            user="CSC380_25S_TeamE",
            password="Bu$Tr@ck3r1000_?",
            database="CSC380_25S_TeamE"
        )
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


def ensure_stops_exist(predictions, cursor, conn):
    """Ensure all stops exist in the database before processing ETAs"""
    stop_data = set()
    for p in predictions:
        if "stpid" in p and "stpnm" in p:
            stop_data.add((p["stpid"], p["stpnm"]))

    for stpid, stpnm in stop_data:
        try:
            # First check if stop exists
            cursor.execute("SELECT 1 FROM Stops WHERE stupid = %s", (stpid,))
            if not cursor.fetchone():
                # If not, insert it
                sql = """
                    INSERT INTO Stops (stupid, stpnm) 
                    VALUES (%s, %s)
                """
                cursor.execute(sql, (stpid, stpnm))
                conn.commit()
                print(f"Inserted new stop: {stpid} - {stpnm}")
        except Error as e:
            print(f"Error handling stop {stpid}: {e}")
            conn.rollback()


def fetch_and_insert_predictions(url, cursor, conn):
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if "bustime-response" not in data:
            print("Unexpected API response format")
            return 0

        if "error" in data["bustime-response"]:
            error_msg = data["bustime-response"]["error"][0]["msg"]
            print(f"API Error: {error_msg}")

        if "prd" not in data["bustime-response"]:
            print("No predictions available.")
            return 0

        predictions = data["bustime-response"]["prd"]

        # First ensure all stops exist
        ensure_stops_exist(predictions, cursor, conn)

        count = 0
        for p in predictions:
            if p.get("msg") == "No service scheduled":
                print(f"Skipping prediction due to message: {p['msg']}")
                continue

            try:
                # Convert prediction time to MySQL datetime
                prdtm = datetime.strptime(p["prdtm"], "%Y%m%d %H:%M")
                tmpstmp = datetime.strptime(p["tmstmp"], "%Y%m%d %H:%M")

                # Insert route information
                rt = p.get("rt")
                des = p.get("des")
                if rt and des:
                    sql_routes = """
                        INSERT INTO Routes (rt, des) 
                        VALUES (%s, %s)
                        ON DUPLICATE KEY UPDATE des = VALUES(des)
                    """
                    cursor.execute(sql_routes, (rt, des))

                # Get stop ID
                stpid = p.get("stpid")
                if not stpid:
                    print("Missing stpid in prediction - skipping")
                    continue

                # Verify stop exists
                cursor.execute("SELECT 1 FROM Stops WHERE stupid = %s", (stpid,))
                if not cursor.fetchone():
                    print(f"Stop {stpid} does not exist - cannot insert ETA")
                    continue

                # Insert into ETA table
                sql_eta = """
                    INSERT INTO ETA (stpid, rt, prdtm, prdctdn, tmstmp, dly, rtdir)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                # Handle 'prdctdn' and 0 means 'DUE' and -1 means 'MISSING'
                prdctdn_raw = p.get("prdctdn", "-1")
                prdctdn = 0 if prdctdn_raw == "DUE" else -1 if prdctdn_raw == "MISSING" else int(prdctdn_raw)

                values_eta = (
                    stpid,
                    rt,
                    prdtm,
                    prdctdn,
                    tmpstmp,
                    p.get("dly", False),
                    p.get("rtdir")
                )
                cursor.execute(sql_eta, values_eta)
                count += 1
                conn.commit()

            except Exception as e:
                print(f"Error processing prediction: {e}")
                conn.rollback()

        return count

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")#displays because of what cause
        return 0
    except ValueError as e:
        print(f"Failed to parse JSON: {e}")
        return 0


def process_multiple_urls(urls):
    conn = connect_to_db()
    if not conn:
        return
    cursor = None
    try:
        cursor = conn.cursor()
        for url in urls:
            print(f"Processing URL: {url}")
            count = fetch_and_insert_predictions(url, cursor, conn)
            print(f"Successfully processed {count} predictions")

    except Exception as e:
        print(f"Error in process_multiple_urls: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

def is_operating_time(): #ensure that it does not run at 11 PM to 5AM
    current_time = datetime.now().time()
    start_time = datetime.strptime("05:00:00", "%H:%M:%S").time()
    end_time = datetime.strptime("23:00:00", "%H:%M:%S").time()
    return start_time <= current_time <= end_time

def main():

    # List of URLs
    url_osw10_1 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=15521,15527,15529,16164,16168,16169,16170,16182,16183,16184&format=json&rt=OSW10"
    url_osw10_2 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=16185,17539,17968,17969,9679,9682&format=json&rt=OSW10"
    url_osw11_1 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=15521,15534,16086,16160,17941,18368,9679,9682,9684&format=json&rt=OSW11"
    url_osw1A_1 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=16875,3581,9614,9695,9696,9726,9727,9729,9731,9735&format=json&rt=OSW1A"
    url_osw1A_2 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=9736,9737&format=json&rt=OSW1A"
    url_osw2A_1 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=15521,16023,16025,3505,3548,3553,3563,3569,3581,9679&format=json&rt=OSW2A"
    url_osw2A_2 = "https://bus-time.centro.org/bustime/api/v3/getpredictions?key=PUZXP7CxWkPaWnvDWdacgiS4M&stpid=9682,9684,9686&format=json&rt=OSW2A"

    urls = [url_osw10_1, url_osw10_2, url_osw11_1, url_osw1A_1, url_osw1A_2, url_osw2A_1, url_osw2A_2]

    while True:
        if is_operating_time():
            process_multiple_urls(urls)
            current_time=datetime.now().time()
            print(f"Cureent time: {current_time}, Waiting for 1 minute...")
        else:
            print("Bus does not run between 11 PM and 5 AM. Sleeping until 5 AM...")

        # Sleep for 1 min
        time.sleep(60)

if __name__ == "__main__":
    main()