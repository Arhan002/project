import mysql.connector
from datetime import date
from flask import jsonify

today = date.today()


class user():
    def __init__(self):
        try:
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True,buffered=True)
            self.cur.allow_multi = True
            print("connection successful")
        except:
            print("Some Error")
            
    
    
    #USER
    
    def getUser(self,data):
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.cur.execute(f"SELECT * FROM user_account where user_name='{data['username']}' AND password='{data['password']}'")
            result = self.cur.fetchall()
            return result
        
    
    def createUser(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"INSERT into user_account(user_name,password) values('{data['username']}','{data['password']}')")
            return "OK"
        except:
            return "ERROR"


    #STORE
    
    
    def getAllStores(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.cur.execute(f"SELECT * FROM store where user_id = {data['user_id']}")
            result = self.cur.fetchall()
            return jsonify(result)
        except:
            return "ERROR"
        
    
    def deleteStore(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True)
        self.cur.execute(f"DELETE from store where store_id={id}")
        return "User Deleted Successfully"
    
    def addStore(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"INSERT into store(user_id,store_name,location,contact_number) values({data['user_id']},'{data['store_name']}','{data['location']}','{data['contact']}') ")
            return "OK"
        except:
            return "ERROR"
    
    #CUSTOMERS
    
    
    def getAllCustomers(self,data):
        
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.cur.execute(f"SELECT * FROM customer where store_id = {data['store_id']}")
            result = self.cur.fetchall()
            return result
        
        
        
        
    def deleteCustomer(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True)
        self.cur.execute(f"DELETE from customer where customer_id={id}")
        return "User Deleted Successfully"
    
    def addCustomer(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"INSERT into customer(store_id,customer_name,email,phone_number,address) values({data['store_id']},'{data['customer_name']}','{data['email']}','{data['contact']}','{data['address']}')")
            return "OK"
        except:
            return "ERROR"
        
    #PAYMENTS
    
    
    def getAllPayments(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.cur.execute(f"SELECT * FROM payment where customer_id = {data['customer_id']}")
            result = self.cur.fetchall()
            return result
        except:
            return "error"
        
       
        
    def addPayment(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"insert into payment(customer_id,payment_date,payment_method,amount) values({data['customer_id']},'{today}','{data['payment_method']}',0)")
            return "OK"
        except:
            return "ERROR"
        
    def deletePayment(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True)
        self.cur.execute(f"DELETE from payment where payment_id={id}")
        return "User Deleted Successfully"
    
    #PRODUCTS
    
    def getAllProducts(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"SELECT * FROM products where payment_id = {data['payment_id']}")
            result = self.cur.fetchall()
            return result
        except:
            return "Error"
        
    def deleteProduct(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True)
        self.cur.execute(f"DELETE from products where product_id={id}")
        return "User Deleted Successfully"
        
    def addProduct(self,data):
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True)
            self.cur.execute(f"insert into products(product_name,category,price,quantity_available,payment_id) values('{data['product_name']}','{data['category']}',{data['price']},{data['quantity']},{data['payment_id']}) ")
            return "OK"
        