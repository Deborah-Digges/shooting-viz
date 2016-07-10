# Script to import all the data files into a single Mongo DB collection
for x in 2013 2014 2015 2016
do
    mongoimport --db=shooting-db --collection=shootings --file="data/$x.csv" --headerline --type=csv
done