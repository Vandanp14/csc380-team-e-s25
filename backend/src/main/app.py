from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
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
        SELECT Stops.stupid, Routes.rt, Routes.des,
               prdtm, prdctdn, tmstmp, dly, rtdir
        FROM ETA
        INNER JOIN Routes ON ETA.rt = Routes.rt
        INNER JOIN Stops ON ETA.stpid = Stops.stupid
        WHERE Routes.rt = %s AND Stops.stupid = %s
        ORDER BY tmstmp DESC
        LIMIT 1
    """

    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (rt, stpid))
                result = cursor.fetchall()
                if result:
                    return jsonify(result)
                else:
                    return jsonify({'message': 'No data found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)