from __future__ import division
from pymongo import MongoClient
from stateToCodeMapping import statesMapping
from population import statePopulation

client = MongoClient()
db = client["shooting-db"]
collection = db.shootings
cursor = collection.find()
count = cursor.count()

renameMapping = {
    "# Injured": "wounded",
    "# Killed": "killed",
    "Incident Date": "date",
    "State": "location"
}

# Rename columns
for oldCol, newCol in renameMapping.iteritems():
    collection.update_many({}, {'$rename': {oldCol: newCol}})


results = [res for res in cursor]

# replace state name with state code
for doc in results:   
    stateCode = statesMapping[doc["location"]]
    if stateCode:
        doc["location"] = stateCode
    else:
        print doc
    collection.save(doc)