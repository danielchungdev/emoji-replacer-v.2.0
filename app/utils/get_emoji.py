import os 
import sqlite3

def get_emoji(keyword):
    emojis = {} 
    # file = open('./config/emojis.config', encoding="utf8") #Only if running from python
    conn = sqlite3.connect(os.path.join("db", "emojireplacer.db"))
    cursor = conn.cursor()
    cursor.execute("SELECT * from Emojis WHERE keyword = '{}'".format(keyword))

    res = cursor.fetchone()
    if res:
        return res[1]
    else:
        return None