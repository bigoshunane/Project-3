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


conn = 'mongodb://mongodb+srv://Project-3-Team-1:password_qW1@cluster0.oqnln.mongodb.net/michelin?retryWrites=true&w=majority'
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

#################################################
# Data APIs
#################################################

# get continents geoJson


@app.route("/continents")
def download():
    with open('data/countriesTile.geojson') as f:
        data = json.load(f)
        return data

# get michelin data


@app.route("/michelin")
def getMichelinData():

    data = collection.find()
    michelin_data = []
    for d in data:
        buffer = {
            "restaurant": d['Restaurant'],
            "address": d['Address'],
            "city": d['City'],
            "country": d['Country'],
            "continent": d['Continent'],
            "cuisine": d['Cuisine'],
            "longitude": d['Longitude'],
            "latitude": d['Latitude'],
            "website": d['WebsiteUrl'],
            "award": d['Award'],
            "price": d['Price'],
        }
        michelin_data.append(buffer)
    return jsonify(michelin_data)

# get top 10 cuisines


@app.route("/Top10Cuisines")
def getTop10Cuisines():

    with open('data/2021CountryContinent.json') as f:
        data = json.load(f)

    cuisines = {}

    for d in data:
        if not d["Cuisine"] in cuisines:
            cuisines[d["Cuisine"]] = 0
        cuisines[d["Cuisine"]] += 1

    cuisineList = []
    for k in cuisines.keys():
        cuisineList.append((k, cuisines[k]))

    def sortFunc(e):
        return e[1]

    cuisineList.sort(key=sortFunc, reverse=True)
    print(cuisineList[:10])

    return jsonify(cuisineList[:10])


#################################################
# Template Setup
#################################################

# create route that renders templates

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/map")
def map():
    return render_template('mapColor.html')


if __name__ == "__main__":
    app.run()
