import mysql.connector
from datetime import date
from flask import jsonify

today = date.today()


class payment():
    def __init__(self):
 
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True,buffered=True)
            self.cur.allow_multi = True
            print("connection successful")
       
            
    
    
        
    #PAYMENTS
    
    
    def getAllPayments(self,data):
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"SELECT * FROM payment where customer_id = {data['customer_id']}")
            result = self.cur.fetchall()
            if len(result)>0:
                return result
            else:
                return "No data found"
        
       
        
    def addPayment(self,data):
        try:
            self.cur.close()
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"insert into payment(customer_id,payment_date,payment_method,amount) values({data['customer_id']},'{today}','{data['payment_method']}',0)")
            return "OK"
        except:
            return "ERROR"
        
    def deletePayment(self,id):
        self.cur.close()
        self.cur = self.con.cursor(dictionary=True,buffered=True)
        self.con.autocommit = True
        self.cur.allow_multi = True
        self.cur.execute(f"DELETE from payment where payment_id={id}")
        return "User Deleted Successfully"
    
    