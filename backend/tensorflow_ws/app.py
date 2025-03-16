# 'cd ~/dev/mayonnAIse/backend/tensorflow_ws/app.py' and 'flask run' to start service
from flask import Flask
import tensorflow as tf

print("TensorFlow version:", tf.__version__)
app = Flask(__name__)

in_memory_datastore = {
   "COBOL" : {"name": "COBOL", "publication_year": 1960, "contribution": "record data"},
   "ALGOL" : {"name": "ALGOL", "publication_year": 1958, "contribution": "scoping and nested functions"},
   "APL" : {"name": "APL", "publication_year": 1962, "contribution": "array processing"},
}

@app.post('/train_model')
def train_model():
   return {"programming_languages":list(in_memory_datastore.values())}