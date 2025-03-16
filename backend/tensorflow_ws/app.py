# 'cd ~/dev/mayonnAIse/backend/tensorflow_ws/app.py' and 'flask run --debug' to start service
from flask import Flask
import tensorflow as tf
from tutorial import tutorial
from imdb import imdb
from train_model import train_model

print("TensorFlow version:", tf.__version__)
app = Flask(__name__)

@app.post('/train_model')
def train_model_():
   return train_model()

@app.post('/tutorial')
def tutorial_():
   return tutorial()

@app.post('/imdb')
def imdb_():
   return imdb()