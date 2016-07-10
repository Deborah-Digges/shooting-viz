from __future__ import division
from pymongo import MongoClient
from stateToCodeMapping import statesMapping
from population import statePopulation

client = MongoClient()
db = client["shooting-db"]
collection = db.shootings
cursor = collection.find()
count = cursor.count()

results = [res for res in cursor]

