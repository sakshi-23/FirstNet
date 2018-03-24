from flask import Flask, render_template, request, jsonify
import os
from os import environ
import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
from p2p import *



db_name = 'heroku_z9q1btk4'
app = Flask(__name__)



# Setup MongoDB
uri = ''
if "MONGODB_URI" in os.environ:
    uri = environ.get('MONGODB_URI')
else:
    with open('mongo-cred.json') as f:
        uri = json.load(f)['uri']
client = MongoClient(uri)
db = client[db_name]
feed_collection = db['feed_new']
#------------------------------

port = int(os.getenv('PORT', 8000))





@app.route('/')
def dashboard():
    return render_template('dashboard.html')


@app.route('/issue1')
def issue1():
    import os.path
    return json.dumps({"present":os.path.exists('alert_sakshi.txt')})

@app.route('/issue2')
def issue2():
    import os.path
    return json.dumps({"present":os.path.exists('alert2.txt') or os.path.exists('fall_satya.txt')})


@app.route('/person1')
def location1():
    import os.path
    return json.dumps({"present":os.path.exists('location_sakshi.txt')})

@app.route('/person2')
def location2():
    import os.path
    return json.dumps({"present":os.path.exists('location_satya.txt')})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
