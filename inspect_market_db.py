import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('market.db')
cursor = conn.cursor()

# List all tables
print('Tables:')
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
for table in cursor.fetchall():
    print(table[0])

# Example: Show first 5 rows from each table
for table in [row[0] for row in cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")]:
    print(f'\nTable: {table}')
    cursor.execute(f'SELECT * FROM {table} LIMIT 5;')
    rows = cursor.fetchall()
    for row in rows:
        print(row)

conn.close()
