import mysql.connector
from datetime import date
from flask import jsonify

today = date.today()


class store():
    def __init__(self):
 
            self.con=mysql.connector.connect(host="localhost",user="root",password="1234",database="grocery")
            self.con.autocommit = True
            self.cur= self.con.cursor(dictionary=True,buffered=True)
            self.cur.allow_multi = True
            print("connection successful")


    #STORE
    
    
    def getAllStores(self,data):
            
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"SELECT * FROM store where user_id = {data['user_id']}")
            result = self.cur.fetchall()
            self.cur.close()
            if len(result)>0:
                return result
            else:
                return "No data found"
        
    
    def deleteStore(self,id):

        self.cur = self.con.cursor(dictionary=True,buffered=True)
        self.con.autocommit = True
        self.cur.allow_multi = True
        self.cur.execute(f"DELETE from store where store_id={id}")
        self.cur.close()
        return "User Deleted Successfully"
    
    def addStore(self,data):
        try:
            self.cur = self.con.cursor(dictionary=True,buffered=True)
            self.con.autocommit = True
            self.cur.allow_multi = True
            self.cur.execute(f"INSERT into store(user_id,store_name,location,contact_number) values({data['user_id']},'{data['store_name']}','{data['location']}','{data['contact']}') ")
            self.cur.close()
            return "OK"
        except:
            return "ERROR"
    
   
        