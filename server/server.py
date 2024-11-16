from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Option 1: Use CSV
df = pd.read_csv('./lib/planning-permission.csv')

# Option 2: Use mock database in JSON
categoriesDf = pd.read_json('./lib/category.json')
restrictionsDf = pd.read_json('./lib/restriction.json')
categoriesRestrictionsDf = pd.read_json('./lib/categoryRestriction.json')


# api/python
@app.route('/api/python', methods=['GET'])
def return_home():
    return jsonify({
        'message': 'Yo ho!',
        'db': df.to_json(orient='records', indent=4),
        'result': 'N/A'
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)