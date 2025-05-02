from flask import Flask, request, jsonify
import pymysql
import pandas as pd
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


# Connect to MySQL
def get_connection():
    return pymysql.connect(
        host="pi.cs.oswego.edu",
        user="CSC380_25S_TeamE",
        password="Bu$Tr@ck3r1000_?",
        database="CSC380_25S_TeamE",
        cursorclass=pymysql.cursors.DictCursor
    )
#PREDICTION ENDPOINT --------------------------------------------------------------------
@app.route('/prediction', methods=['GET'])
def get_prediction():
    rt = request.args.get('route')
    stpid = request.args.get('stop')

    if not rt or not stpid:
        return jsonify({'error': 'Missing route or stop'}), 400

    query = """
        SELECT ETA.rt, ETA.stpid, MIN(ETA.prdtm) AS prdtm, ETA.prdctdn, ETA.tmstmp, ETA.dly,
               Routes.des, ETA.rtdir
        FROM ETA
        INNER JOIN Routes ON ETA.rt = Routes.rt
        INNER JOIN Stops ON ETA.stpid = Stops.stupid
        WHERE ETA.rt = %s AND ETA.stpid = %s
          AND ETA.tmstmp = (
              SELECT MAX(tmstmp)
              FROM ETA
              WHERE rt = %s AND stpid = %s
          )
        GROUP BY ETA.rt, ETA.stpid, ETA.tmstmp, ETA.prdctdn, ETA.dly, Routes.des, ETA.rtdir
        LIMIT 1
    """

    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (rt, stpid, rt, stpid))
                result = cursor.fetchone()

                if result:
                    # Convert times to Eastern and 12-hour format
                    if 'prdtm' in result and result['prdtm']:
                        dt = result['prdtm']
                        result['prdtm'] = dt.strftime("%I:%M %p")  # 12-hour format, no timezone conversion

                    if 'tmstmp' in result and result['tmstmp']:
                        dt = result['tmstmp']
                        result['tmstmp'] = dt.strftime("%I:%M %p")

                    return jsonify(result)

                else:
                    return jsonify({'message': 'No data found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# AVG PREDICTION ENDPOINT ----------------------------------------------------------------------------------------------------
def get_latest_7_avg_prediction(route, stop_id, hour, minute):
    try:
        conn = get_connection()
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
            return None

        df = pd.DataFrame(results)
        df['prdtm'] = pd.to_datetime(df['prdtm'])

        # Convert prdtm to average time
        seconds = df['prdtm'].dt.hour * 3600 + df['prdtm'].dt.minute * 60 + df['prdtm'].dt.second
        avg_seconds = int(seconds.mean())
        avg_time = (datetime.min + timedelta(seconds=avg_seconds)).time()

        return avg_time

    except Exception as e:
        print(f"Error: {e}")
        return None

    finally:
        conn.close()

@app.route('/avgPrediction', methods=['GET'])
def avg_prediction():
    route = request.args.get('route')
    stop = request.args.get('stop')
    hour = request.args.get('hour')
    minute = request.args.get('minute')

    if not all([route, stop, hour, minute]):
        return jsonify({'error': 'Missing route, stop, hour, or minute'}), 400

    try:
        hour = int(hour)
        minute = int(minute)
        avg_time = get_latest_7_avg_prediction(route, stop, hour, minute)

        if avg_time:
            return jsonify({
                'route': route,
                'stop': stop,
                'hour': hour,
                'minute': minute,
                'avg_prediction': avg_time.strftime("%I:%M %p")
            })
        else:
            return jsonify({'message': 'No data found for the given time'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =======================
# Run server
# =======================
if __name__ == '__main__':
    app.run(debug=True)
