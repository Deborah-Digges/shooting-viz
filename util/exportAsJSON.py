from __future__ import division
from pymongo import MongoClient
from stateToCodeMapping import statesMapping
from population import statePopulation
import json
import math

client = MongoClient()
db = client["shooting-db"]
collection = db.shootings
cursor = collection.find()
count = cursor.count()

results = [res for res in cursor]
gunStats = {}


# create the structure
# year: { state: {"killed": num, "wounded": num}}
for doc in results:
    year = doc["date"].split(",")[-1].strip()
    gunStats.setdefault(year, {})

    location = doc["location"]
    gunStats[year].setdefault(location, {"killed": 0, "wounded": 0}) 
    gunStats[year][location]["killed"] += doc["killed"]
    gunStats[year][location]["wounded"] += doc["wounded"]
    



for year in gunStats:
    # Make sure states with no data are not left out
    for state in statePopulation:
        gunStats[year].setdefault(state, {"killed": 0, "wounded": 0})

    # find the number of people killed/wounded per 1000
    for state in gunStats[year]:
        populationInMillions = statePopulation[state]/1000000
        gunStats[year][state]["killed"] = math.ceil(gunStats[year][state]["killed"]/populationInMillions)
        gunStats[year][state]["wounded"] = math.ceil(gunStats[year][state]["wounded"]/populationInMillions)



# max value across all state totals
maxKilled = []
maxWounded = []
for year in gunStats:
    maxWounded.append(gunStats[year][max(gunStats[year], key=lambda x: gunStats[year][x]['wounded'])]['wounded'])
    maxKilled.append(gunStats[year][max(gunStats[year], key=lambda x: gunStats[year][x]['killed'])]['killed'])
print "Killed", max(maxKilled)
print "Wounded", max(maxWounded)
 
file = open("out.json", "w")
file.write(json.dumps(gunStats))
file.close()

