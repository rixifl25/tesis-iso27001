from datetime import datetime
from bson import ObjectId

def convert_document_List(doc):
    # Conversión de ObjectId a string para _id
    doc['_id'] = str(doc['_id'])

    return doc

def convert_document(doc):
    """Convert ObjectId to string in a document."""
    if '_id' in doc and isinstance(doc['_id'], ObjectId):
        doc['_id'] = str(doc['_id'])
    if 'proceso_id' in doc and isinstance(doc['proceso_id'], ObjectId):
        doc['proceso_id'] = str(doc['proceso_id']) 
    if 'id_historico' in doc and isinstance(doc['id_historico'], ObjectId):
        doc['id_historico'] = str(doc['id_historico']) 
    if 'analisis_id' in doc and isinstance(doc['analisis_id'], ObjectId):
        doc['analisis_id'] = str(doc['analisis_id'])
    if 'id_inmueble' in doc and isinstance(doc['id_inmueble'], ObjectId):
        doc['id_inmueble'] = str(doc['id_inmueble'])
    if 'id_analisis' in doc and isinstance(doc['id_analisis'], ObjectId):
        doc['id_analisis'] = str(doc['id_analisis'])  
    return doc

def convert_document_analysis(doc):
    """Convert ObjectId to string in a document."""
    if '_id' in doc and isinstance(doc['_id'], ObjectId):
        doc['_id'] = str(doc['_id'])
    if 'proceso_id' in doc and isinstance(doc['proceso_id'], ObjectId):
        doc['proceso_id'] = str(doc['proceso_id']) 
    if 'id_historico' in doc and isinstance(doc['id_historico'], ObjectId):
        doc['id_historico'] = str(doc['id_historico']) 
    if 'analisis_id' in doc and isinstance(doc['analisis_id'], ObjectId):
        doc['analisis_id'] = str(doc['analisis_id'])
    if 'id_inmueble' in doc and isinstance(doc['id_inmueble'], ObjectId):
        doc['id_inmueble'] = str(doc['id_inmueble'])
    if 'id_analisis' in doc and isinstance(doc['id_analisis'], ObjectId):
        doc['id_analisis'] = str(doc['id_analisis'])
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()  # Convertir datetime a string en formato ISO
    return doc

def convert_document_time(doc):
        for key, value in doc.items():
            if isinstance(value, datetime):
                # Convertir datetime a formato ISO 8601
                doc[key] = value.isoformat()
        return doc

def convert_datetime(proceso,target_tz):
                if 'fecha_creacion' in proceso and isinstance(proceso['fecha_creacion'], datetime):
                    proceso['fecha_creacion'] = proceso['fecha_creacion'].astimezone(target_tz)
                if 'fecha_modificacion' in proceso and isinstance(proceso['fecha_modificacion'], datetime):
                    proceso['fecha_modificacion'] = proceso['fecha_modificacion'].astimezone(target_tz)
                return proceso
