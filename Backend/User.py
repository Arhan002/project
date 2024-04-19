import mysql.connector

class user():
    def __init__(self):
        try:
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True)
            print("connection successful")
        except:
            print("Some Error")
            
    def getAllStores(self):
        self.cur.execute("SELECT * FROM store")
        result = self.cur.fetchall()
        return result
    
    def getAllCustomers(self):
        self.cur.execute("SELECT * FROM customer")
        result = self.cur.fetchall()
        return result
    
    def getAllPayments(self):
        self.cur.execute("SELECT * FROM payment")
        result = self.cur.fetchall()
        return result
    
    def getAllProducts(self):
        self.cur.execute("SELECT * FROM products")
        result = self.cur.fetchall()
        return result