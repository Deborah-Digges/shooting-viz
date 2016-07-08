from pymongo import MongoClient
from stateToCodeMapping import statesMapping

## Importing into the DB

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

for oldCol, newCol in renameMapping.iteritems():
    collection.update_many({}, {'$rename': {oldCol: newCol}})

# 5. Get latitude and long


# Rename state name by code
results = [res for res in cursor]

for doc in results:    
    stateCode = statesMapping[doc["location"]]
    if stateCode:
        doc["location"] = stateCode
    else:
        print doc
    collection.save(doc)