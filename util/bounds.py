from pymongo import MongoClient
import pprint

client = MongoClient()
db = client["shooting-db"]
collection = db.shootings

cursor = collection.find()
count = cursor.count()
results = [res for res in cursor]

killed = {}
wounded = {}

pp = pprint.PrettyPrinter(indent=4)


for res in results:
    location = res["location"]

    killed.setdefault(location, 0)
    killed[location] += res["killed"]

    wounded.setdefault(location, 0)
    wounded[location] += res["wounded"]


print "Max killed: {0}".format(killed[max(killed, key=lambda x: killed[x])])
print "Min Killed: {0}".format(killed[min(killed, key=lambda x: killed[x])])
print "Max wounded: {0}".format(wounded[max(wounded, key=lambda x: wounded[x])])
print "Min wounded: {0}".format(wounded[min(wounded, key=lambda x: wounded[x])])


#pp.pprint(killed)
#pp.pprint(wounded)
