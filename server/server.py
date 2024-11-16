from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import json
from lib.utils import remove_duplicates

app = Flask(__name__)
CORS(app)

# Option 1: Use CSV
df = pd.read_csv('./lib/planning-permission.csv')

# Option 2: Use mock database in JSON
with open('./lib/db.json', 'r') as file:
    data = json.load(file)

# Get mock db tables as dataframes
categoriesDf = pd.DataFrame(data['categories'])
restrictionsDf = pd.DataFrame(data['restrictions'])
categoriesRestrictionsDf = pd.DataFrame(data['categoriesRestrictions'])

def find_if_permission_required(form_data):
    category = form_data['category']
    restrictionType = form_data['restrictionType']
    restrictionDetails = form_data['restrictionDetails']

    permissionRequiredForWholeCategory = categoriesDf.loc[categoriesDf['name'] == category]['permissionRequired'].iloc[0]
    if permissionRequiredForWholeCategory:
        return 'Yes' if permissionRequiredForWholeCategory else 'No'

    if restrictionDetails == '':
        return ''
    categoryId = categoriesDf.loc[categoriesDf['name'] == category]['id'].iloc[0]
    restrictionId = restrictionsDf.loc[restrictionsDf['details'] == restrictionDetails]['id'].iloc[0]
    permissionRequired = categoriesRestrictionsDf.loc[(categoriesRestrictionsDf['categoryId'] == categoryId) & (categoriesRestrictionsDf['restrictionId'] == restrictionId)]['permissionRequired'].iloc[0]
    
    return 'Yes' if permissionRequired else 'No' if permissionRequired == False else None

# api routes
@app.route('/get-categories', methods=['GET'])
def get_categories():
    return jsonify({
        'message': 'Sending categories list',
        'body': [el['name'] for el in data['categories']],
    })

@app.route('/get-restrictionTypes', methods=['GET'])
def get_restriction_types():
    restrictionTypes = remove_duplicates([el['type'] for el in data['restrictions']])
    return jsonify({
        'message': 'Sending restriction types',
        'body': restrictionTypes,
    })

@app.route('/get-restrictionDetailsList', methods=['GET'])
def return_home():
    restrictionType = request.args.get('filter')
    print('restrictionType from next', restrictionType)
    restrictionDetailsList = [
        el['details'] for el in data['restrictions']
        if el['type'] == restrictionType
    ] if data and 'restrictions' in data else []
    print('detailsList', restrictionDetailsList)

    return jsonify({
        'message': 'Sending restriction details list',
        'body': restrictionDetailsList,
    })

@app.route('/submit-form', methods=['POST'])
def submit_form():
    form_data = request.json  # Get JSON payload
    result = find_if_permission_required(form_data)

    return jsonify({
        'message': 'Form data processed successfully',
        'result': result
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)