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
            
            
    def getUser(self,data):
        try:
            self.cur.execute(f"SELECT * FROM user_account where user_name='{data['username']}' AND password='{data['password']}'")
            result = self.cur.fetchall()
            return result
        except:
            return "ERROR"
    
    def createUser(self,data):
        try:
            self.cur.execute(f"INSERT into user_account(user_name,password) values('{data['username']}','{data['password']}')")
            return "OK"
        except:
            return "ERROR"

    def getAllStores(self):
        self.cur.execute("SELECT * FROM store")
        result = self.cur.fetchall()
        return result
    
    def deleteStore(self,id):
        self.cur.execute(f"DELETE from store where store_id={id}")
        return "User Deleted Successfully"
    
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