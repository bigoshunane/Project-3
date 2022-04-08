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

@app.route("/run-data")
def runData():
    with open('data/2021CountryContinent.json') as f:
      data = json.load(f)

    client = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = client["michelin"]
    mycol = mydb["restaurants"]

    x = mycol.insert_many(data)

    return render_template("index.html")

# create route that renders templates

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template("mapColor.html")

@app.route("/continents")
def download():
    with open('data/countriesTile.geojson') as f:
        data = json.load(f)
        return data

@app.route("/michelin")
def restaurantsDownload():
    with open("data/2021CountryContinent.json") as f:
        data = json.load(f)
        return michelinRestaurants




if __name__ == "__main__":
    app.run()
