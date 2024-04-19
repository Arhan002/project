from flask import Flask,request,jsonify
from datetime import date
import json
from bson import ObjectId
import bson.json_util
import uuid
from flask_cors import CORS
from datetime import date,datetime,time
from User import user


app = Flask(__name__)
CORS(app)


obj = user()

today = 0
a = 0
current_Time = 0



@app.route("/get_store" , methods = ["GET"])
def getStores():
    if request.method == "GET":
        return obj.getAllStores()
      
@app.route("/get_customer" , methods = ["GET"])
def getCustomers():
    if request.method == "GET":
        return obj.getAllCustomers()
      
@app.route("/get_payments" , methods = ["GET"])
def getPayments():
    if request.method == "GET":
        return obj.getAllPayments()
      
@app.route("/get_products" , methods = ["GET"])
def getProducts():
    if request.method == "GET":
        return obj.getAllProducts()
    
if __name__ == "__main__":
  # app.run(host="0.0.0.0", port=5000, debug=True)
   app.run( port=5000, debug=True)






