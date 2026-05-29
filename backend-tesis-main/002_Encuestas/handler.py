from serverless_wsgi import handle_request
from general.wsgi import application
import logging
import json

logger = logging.getLogger(__name__)

def handler(event, context):
    # Identificar si el evento proviene de SQS o HTTP (API Gateway)
    if 'Records' in event and event['Records'][0].get('eventSource') == 'aws:sqs':
        # Si es un evento de SQS
        return handle_sqs_event(event)
    else:
        # Si es un evento HTTP desde API Gateway
        return handle_http_event(event, context)

def handle_http_event(event, context):
    authorizer_context = event.get('requestContext', {}).get('authorizer', {})
    claims = authorizer_context.get('claims', {})
    logger.info(f"Claims: {claims}")
    # Filtrar los campos deseados desde 'claims'
    filtered_context = {
        "email": claims.get("email"),
        "nombre_usuario": claims.get("cognito:username")
    }
    
    body = event.get('body', {})
    try:
        body_dict = json.loads(body)
    except Exception as e:
        body_dict = {}

    # Añadir el contexto filtrado al diccionario del body
    body_dict['authorizer_context'] = filtered_context

    # Convertir el diccionario actualizado en una cadena JSON
    event['body'] = json.dumps(body_dict)
    
    # Manejar la solicitud HTTP usando serverless_wsgi
    return handle_request(application, event, context)

def handle_sqs_event(event):
    # Procesar cada mensaje recibido desde SQS
    for record in event['Records']:
        try:
            # Extraer el cuerpo del mensaje SQS
            body = record['body']
            # Convertir el cuerpo a JSON
            message = json.loads(body)
            
            # Aquí puedes manejar el mensaje SQS
            process_sqs_message(message)
        
        except Exception as e:
            logger.error(f"Error processing SQS message: {e}")
            return {"statusCode": 500, "body": "Error processing SQS message"}
    
    return {"statusCode": 200, "body": "SQS message processed successfully"}

def process_sqs_message(message):
    logger.info(f"Processing SQS message: {message}")
    # Lógica de procesamiento del mensaje
    message= json.dumps(message)

