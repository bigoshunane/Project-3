# import necessary libraries

import pandas as pd
import pymongo
import json
from pymongo import MongoClient

import os
import re
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client["michelin"]
collection = db["restaurants"]

# update the data base
@app.route("/postData")
def runData():
    with open('data/2021CountryContinent.json') as f:
      data = json.load(f)

    x = collection.insert_many(data)

    return render_template("index.html")

# create routes that call data

@app.route("/continents")
def download():
    with open('data/countriesTile.geojson') as f:
        data = json.load(f)
        return data

@app.route("/michelin")
def getMichelinData():

    data = collection.find_one()
    michelin_data = {}
    for d in data:
        michelin_data[d] = {
            "restaurant": michelin_data['Restaurant Name'],
            "address": michelin_data['Address'],
            "city": michelin_data['City'],
            "country": michelin_data['Country'],
            "continent": michelin_data['Continent'],
            "cuisine": michelin_data['Cuisine'],
            "longitude": michelin_data['Longitude'],
            "latitude": michelin_data['Latitude'],
            "website": michelin_data['WebsiteUrl'],
            "award": michelin_data['Award'],
            "price": michelin_data['price'],
        },
    return jsonify(michelin_data)



# @app.route("/michelin")
# def restaurantsDownload():
#    with open("data/2021CountryContinent.json") as f:
#        data = json.load(f)
#        return michelinRestaurants


#################################################
# Template Setup
#################################################

# create route that renders templates

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template('mapColor.html', data=michelin_data)






if __name__ == "__main__":
    app.run()
