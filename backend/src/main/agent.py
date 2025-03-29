import requests
import mysql.connector
import schedule
import time

###possible frame for agent 

# Function to fetch data from the API and insert into MySQL
def fetch_and_insert_data():
    # API endpoint
    api_url = "https://api.example.com/data"  # Replace with your API URL

    try:
        # Fetch data from the API
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()  # Assuming the API returns JSON

        # Connect to MySQL
        db = mysql.connector.connect(
            host="localhost",
            user="your_username",  # Replace with your MySQL username
            password="your_password",  # Replace with your MySQL password
            database="your_database"  # Replace with your database name
        )
        cursor = db.cursor()

        # Insert data into MySQL
        for item in data:
            # Replace 'users' with your table name and adjust columns as needed
            sql = "INSERT INTO users (name, email, age) VALUES (%s, %s, %s)"
            values = (item['name'], item['email'], item['age'])  # Adjust keys based on API response
            cursor.execute(sql, values)

        db.commit()  # Commit the transaction
        print("Data inserted successfully at:", time.strftime("%Y-%m-%d %H:%M:%S"))

    except requests.exceptions.RequestException as e:
        print("Error fetching data from API:", e)
    except mysql.connector.Error as err:
        print("MySQL error:", err)
    finally:
        if db.is_connected():
            cursor.close()
            db.close()

# Schedule the task to run every 5 minutes
schedule.every(5).minutes.do(fetch_and_insert_data)

# Keep the script running
print("Scheduler started. Waiting for the next run...")
while True:
    schedule.run_pending()
    time.sleep(1)