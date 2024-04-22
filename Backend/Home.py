from flask import Flask,request,jsonify
from bson import ObjectId
from flask_cors import CORS
from User import user


app = Flask(__name__)
CORS(app,origins=['http://localhost:3000'])


obj = user()

today = 0
a = 0
current_Time = 0

# USER

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


#STORE

@app.route("/get_store" , methods = ["POST"])
def getStores():
    if request.method == "POST":
        data = request.json
        return obj.getAllStores(data)
    
@app.route("/add_store", methods =["POST"])
def addStore():
    if request.method == "POST":
        data = request.json
        return obj.addStore(data)



#CUSTOMER

@app.route("/get_customer" , methods = ["POST"])
def getCustomers():
    if request.method == "POST":
        data = request.json
        return obj.getAllCustomers(data)
    
@app.route("/add_customer",methods =["POST"])
def addCustomer():
    if request.method == "POST":
        data = request.json
        return obj.addCustomer(data)


#PAYMENTS
      
@app.route("/get_payments" , methods = ["POST"])
def getPayments():
    if request.method == "POST":
        data = request.json
        return obj.getAllPayments(data)

@app.route("/add_payment", methods = ["POST"])
def createPayment():
    if request.method == "POST":
        data = request.json
        return obj.addPayment(data)

#Products

@app.route("/get_products" , methods = ["POST"])
def getProducts():
    if request.method == "POST":
        data = request.json
        return obj.getAllProducts(data)
    
@app.route("/add_product", methods = ["POST"])
def addProduct():
    if request.method == "POST":
        data = request.json
        return obj.addProduct(data)




#DELETE


@app.route("/get_store/<int:id>",methods = ["POST","DELETE"])
def deleteStore(id):
    if request.method == "DELETE":
        return obj.deleteStore(id)

@app.route("/get_customer/<int:id>",methods = ["POST","DELETE"])
def deleteCustomer(id):
    if request.method == "DELETE":
        return obj.deleteCustomer(id)

@app.route("/get_payments/<int:id>",methods = ["POST","DELETE"])
def deletePayment(id):
    if request.method == "DELETE":
        return obj.deletePayment(id)

@app.route("/get_products/<int:id>",methods = ["POST","DELETE"])
def deleteProducts(id):
    if request.method == "DELETE":
        return obj.deleteProduct(id)
    

if __name__ == "__main__":
  # app.run(host="0.0.0.0", port=5000, debug=True)
   app.run( port=5000, debug=False)






