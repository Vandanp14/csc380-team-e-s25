from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
from datetime import datetime
import pytz  #

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
if __name__ == '__main__':
    app.run(debug=True)