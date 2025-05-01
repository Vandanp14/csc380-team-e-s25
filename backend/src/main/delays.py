import pymysql
import pandas as pd
from datetime import datetime, timedelta

def get_latest_7_avg_prediction(route, stop_id, hour, minute):
    try:
        conn = pymysql.connect(
            host="pi.cs.oswego.edu",
            user="CSC380_25S_TeamE",
            password="Bu$Tr@ck3r1000_?",
            database="CSC380_25S_TeamE",
            cursorclass=pymysql.cursors.DictCursor
        )

        exact_time = f"{hour:02d}:{minute:02d}:00"

        with conn.cursor() as cursor:
            query = """
                SELECT t1.tmstmp, t1.prdtm, t1.rt, t1.stpid
                FROM ETA t1
                INNER JOIN (
                    SELECT tmstmp, MIN(prdtm) AS earliest_prdtm
                    FROM ETA
                    WHERE rt = %s AND stpid = %s AND TIME(tmstmp) = %s
                    GROUP BY tmstmp
                ) t2 ON t1.tmstmp = t2.tmstmp AND t1.prdtm = t2.earliest_prdtm
                WHERE t1.rt = %s AND t1.stpid = %s
                ORDER BY t1.tmstmp DESC
                LIMIT 7;
            """
            cursor.execute(query, (route, stop_id, exact_time, route, stop_id))
            results = cursor.fetchall()

        if not results:
            print(f"No first predictions found at {exact_time} for route {route}, stop {stop_id}")
            return None

        df = pd.DataFrame(results)
        df['prdtm'] = pd.to_datetime(df['prdtm'])
        df['tmstmp'] = pd.to_datetime(df['tmstmp'])

        print(f"\n✅ Last 5 *soonest* predictions at {exact_time} for route {route}, stop {stop_id}:")
        print(df[['tmstmp', 'prdtm']])

        # Average only the time of day
        seconds = df['prdtm'].dt.hour * 3600 + df['prdtm'].dt.minute * 60 + df['prdtm'].dt.second
        avg_seconds = int(seconds.mean())
        avg_time = (datetime.min + timedelta(seconds=avg_seconds)).time()

        print(f"\n🎯 Average predicted arrival time (last 5 earliest): {avg_time.strftime('%I:%M %p')}")
        return avg_time

    except Exception as e:
        print(f"Error: {e}")
        return None

    finally:
        conn.close()



# Example usage — only include exact matches of 7:40 AM
get_latest_7_avg_prediction("OSW10", 17969, 8, 8)
