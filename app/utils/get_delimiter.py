import os 
import sqlite3
import sys

def get_delimiter(): 

    conn = sqlite3.connect(os.path.join("db", "emojireplacer.db"))
    cursor = conn.cursor()
    cursor.execute("SELECT * from Settings WHERE name = 'Delimiter'")
    
    return cursor.fetchone()[1]