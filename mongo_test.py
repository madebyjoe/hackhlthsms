from pymongo import MongoClient
from random import randint

#Step 1: Connect to MongoDB - Note: Change connection string as needed
client = MongoClient(port=27017)
db=client.business

#result=db.table.insert_one({})