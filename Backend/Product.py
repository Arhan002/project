import mysql.connector
from datetime import date
from flask import jsonify

today = date.today()


class product():
    def __init__(self):
 
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True,buffered=True)
            self.cur.allow_multi = True
            print("connection successful")
       
    
    #PRODUCTS
    
    def getAllProducts(self,data):
            
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"SELECT * FROM products where payment_id = {data['payment_id']}")
            result = self.cur.fetchall()
            self.cur.close()
            if len(result)>0:
                return result
            else:
                return "No data found"
        
    def deleteProduct(self,id):
        
        self.cur = self.con.cursor(dictionary=True,buffered=True)
        self.con.autocommit = True
        self.cur.allow_multi = True
        self.cur.execute(f"DELETE from products where product_id={id}")
        self.cur.close()
        return "User Deleted Successfully"
        
    def addProduct(self,data):
            
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"insert into products(product_name,category,price,quantity_available,payment_id) values('{data['product_name']}','{data['category']}',{data['price']},{data['quantity']},{data['payment_id']}) ")
            self.cur.close()
            return "OK"
        