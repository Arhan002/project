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



@app.route("/get_data" , methods = ["GET"])
def home_page():
    if request.method == "GET":
        return obj.getAllStores()
    
if __name__ == "__main__":
  # app.run(host="0.0.0.0", port=5000, debug=True)
   app.run( port=5000, debug=True)






