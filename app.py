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



# create route that renders index.html template

@app.route("/")
def index():
    return render_template("index.html")

# Shannon - Query to get sorted data
@app.route("/michelin-data")
def getMichelinData():

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

    return jsonify(cuisineList[:10])

if __name__ == "__main__":
    app.run()
