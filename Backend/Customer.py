import mysql.connector
from datetime import date
from flask import jsonify

today = date.today()


class customer():
    def __init__(self):
 
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True,buffered=True)
            self.cur.allow_multi = True
            print("connection successful")
    
    

    
    #CUSTOMERS
    
    
    def getAllCustomers(self,data):
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"SELECT * FROM customer where store_id = {data['store_id']}")
            result = self.cur.fetchall()
            if len(result)>0:
                return result
            else:
                return "No data found"
        
        
        
        
    def deleteCustomer(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True,buffered=True)
        self.con.autocommit = True
        self.cur.allow_multi = True
        self.cur.execute(f"DELETE from customer where customer_id={id}")
        return "User Deleted Successfully"
    
    def addCustomer(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"INSERT into customer(store_id,customer_name,email,phone_number,address) values({data['store_id']},'{data['customer_name']}','{data['email']}','{data['contact']}','{data['address']}')")
            return "OK"
        except:
            return "ERROR"
        
   