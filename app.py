from flask import Flask, render_template, request, jsonify
import os
from os import environ
from twitter import *
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




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
