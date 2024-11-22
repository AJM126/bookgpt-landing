from flask import Flask, render_template, request, jsonify
import sqlite3
import os
from datetime import datetime
import re

app = Flask(__name__)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('waitlist.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS waitlist
        (email TEXT PRIMARY KEY, timestamp DATETIME)
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/join-waitlist', methods=['POST'])
def join_waitlist():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
            
        # Simple email validation
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({'error': 'Invalid email format'}), 400
            
        # Add email to waitlist.txt
        with open('waitlist.txt', 'a') as f:
            f.write(f'{email}\n')
            
        return jsonify({'message': 'Successfully joined waitlist'}), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=4000)
