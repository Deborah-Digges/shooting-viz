From pymongo import MongoClient

states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
                  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
                            "LS", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
                                      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                                                "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

client = MongoClient()
db = client["shootings"]
collection = db.shootingdata
cursor = collection.find()
count = cursor.count()
results = [res for res in cursor]


for doc in results:    
    location = doc["location"].split(",")[1].strip().upper()
    doc["location"] = location
    collection.save(doc)
