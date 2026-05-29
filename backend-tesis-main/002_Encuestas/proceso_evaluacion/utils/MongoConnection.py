import logging
import os
import boto3
import json
import pytz
from pymongo import MongoClient

# Configurar el logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class MongoConnection:
    def __init__(self):
        # Obtener los secretos de MongoDB
        self.MONGO_DB_USER = os.getenv('MONGO_DB_USER')
        self.MONGO_DB_PASS = os.getenv('MONGO_DB_PASS')
        self.MONGO_DB_URL = os.getenv('MONGO_DB_URL')
        self.MONGO_DB_PORT = int(os.getenv('MONGO_DB_PORT'))
        self.MONGO_DB_GENERAL = os.getenv('MONGO_DB_NAME')
        # URL de conexión de MongoDB
        self.MONGO_URI = f"mongodb://{self.MONGO_DB_USER}:{self.MONGO_DB_PASS}@{self.MONGO_DB_URL}:{self.MONGO_DB_PORT}"
        self.utc = pytz.UTC
        
        # Crear cliente de MongoDB
        self.client = MongoClient(self.MONGO_URI)
        
        # Seleccionar bases de datos iniciales
        self.db = self.client[self.MONGO_DB_GENERAL]
        


    # Método para cerrar la conexión a MongoDB
    def close_connection(self):
        self.client.close()
        logger.info("MongoDB connection closed.")
