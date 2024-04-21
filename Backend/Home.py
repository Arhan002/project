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


@app.route("/user/add", methods = ["POST"])
def createUser():
    if request.method == "POST":
        data = request.json
        return obj.createUser(data)
    
@app.route("/user/get", methods=["POST"])
def getUsers():
    if request.method == "POST":
        data = request.json
        return obj.getUser(data)


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
    
    
@app.route("/get_store/<int:id>",methods = ["GET","DELETE"])
def deleteStore(id):
    if request.method == "DELETE":
        return obj.deleteStore(id)

    

if __name__ == "__main__":
  # app.run(host="0.0.0.0", port=5000, debug=True)
   app.run( port=5000, debug=True)






