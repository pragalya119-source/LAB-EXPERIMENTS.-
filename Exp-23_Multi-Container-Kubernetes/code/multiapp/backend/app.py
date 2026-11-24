from flask import Flask, jsonify
import os, mysql.connector

app = Flask(__name__)

def db():
    return mysql.connector.connect(
        host=os.environ["DB_HOST"], user="root",
        password=os.environ["DB_PASSWORD"], database="college")

@app.route("/api/students")
def students():
    con = db(); cur = con.cursor(dictionary=True)
    cur.execute("SELECT id, name, dept FROM students")
    rows = cur.fetchall(); con.close()
    return jsonify(rows)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
