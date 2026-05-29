import logging
import os
from bson import ObjectId
from proceso_evaluacion.utils.MongoConnection import MongoConnection
from django.http import JsonResponse,HttpResponse
import boto3
from botocore.exceptions import ClientError
# Configurar el logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class generalDataRepository:   
    @staticmethod
    def get_principal_user_data(filter_criteria):
        try:
            # Crear cliente de MongoDB
            mongo_conn = MongoConnection()
            logger.info(f"Filter criteria: {filter_criteria}")
            user_data=mongo_conn.db.usuarios.find_one(filter_criteria)
            if not user_data:
                logger.warning(f"No user found with criteria: {filter_criteria}")
                return None

            # Convertir el documento del usuario para JSON
            user_data = convert_document(user_data)

            
            # Estructurar la respuesta
            result = {
                "user": user_data
            }

            return result

        except Exception as e:
            logger.error(f'Error occurred while getting principal user data: {e}')
            return None
        
    @staticmethod
    def get_table_general_data():
        try:
            mongo_conn = MongoConnection()
            
            # Obtener y convertir las colecciones en listas usando compresiones de listas
            categorias_list = [convert_document(c) for c in mongo_conn.db.categorias.find({'estado': 1})]
            controles_list = [convert_document(c) for c in mongo_conn.db.controles.find({'estado': 1})]
            alternativas_list = [convert_document(a) for a in mongo_conn.db.alternativas.find({'estado': 1})]
            propuestas_list = [convert_document(p) for p in mongo_conn.db.propuestas.find({'estado': 1})]
            
            # Mapeo de datos en `data_mapeada`
            data_mapeada = []
            
            for categoria in categorias_list:
                categoria_data = {
                    "codigo": categoria.get("codigo"),
                    "nombre": categoria.get("nombre"),
                    "controles": []
                }
                # Relacionar controles con la categoría
                for control in controles_list:
                    if control.get("codigo_seccion") == categoria["codigo"]:
                        control_data = {
                            "codigo_control": control.get("codigo_control"),
                            "titulo": control.get("titulo"),
                            "descripcion": control.get("descripcion"),
                            "preguntas": control.get("preguntas"),
                            "multiselect": control.get("multiselect"),
                            "alternativas": []
                        }
                        # Relacionar alternativas con el control
                        for alternativa in alternativas_list:
                            if alternativa.get("codigo_control") == control["codigo_control"]:
                                control_data["alternativas"].append(alternativa)
                        categoria_data["controles"].append(control_data)
                data_mapeada.append(categoria_data)
            
            # Resultado final estructurado
            result = {
                "categorias": data_mapeada,
                "propuestas": propuestas_list
            }
            
            return JsonResponse(result, status=200)

        except Exception as e:
            logger.error(f'Error occurred while getting general data: {e}', exc_info=True)
            return JsonResponse({"error": "An error occurred while getting general data", 
                                "error_usuario": "No se pudo obtener los datos generales"}, status=400)
    
    @staticmethod
    def create_user(body):
        try:
            # Crear cliente de MongoDB
            mongo_conn = MongoConnection()
            
            # Definir el body
            formatted_body = {
                "nombre_encargado": body.get("nombre_encargado"),
                "apellido_encargado": body.get("apellido_encargado"),
                "usuario": body.get("usuario"),
                "nombre_empresa": body.get("nombre_empresa"),
                "ruc_empresa": body.get("ruc_empresa"),
                "email": body.get("email"),
            }

            

            # Configurar cliente de Cognito
            cognito_client = boto3.client('cognito-idp')
            user_pool_id =  os.getenv('COGNITO_USER_POOL_ID') # Reemplaza con el ID de tu User Pool
            temporary_password = body.get("password")  # Contraseña temporal que puede ser configurada
            # Crear usuario en Cognito
            cognito_client.admin_create_user(
                UserPoolId=user_pool_id,
                Username=body.get("usuario"),
                TemporaryPassword=temporary_password,
                UserAttributes=[
                    {'Name': 'email', 'Value': body.get("email")},
                    {'Name': 'email_verified', 'Value': 'true'},
                ],
            )
            # Crear un nuevo usuario en MongoDB
            mongo_conn.db.usuarios.insert_one(formatted_body)
            # Respuesta exitosa
            result = {
                "message": "Usuario creado exitosamente en MongoDB y Cognito",
            }
            return JsonResponse(result, status=200)

        except ClientError as e:
            # Manejar error de Cognito
            logger.error(f'Error al crear el usuario en Cognito: {e}')
            if e.response['Error']['Code'] == 'UsernameExistsException':
                return JsonResponse({'error': 'Error al crear el usuario, el nombre de usuario ya se encuentra registrado','error_usuario':"El nombre de usuario ya se encuentra registrado"}, status=500)
            return JsonResponse({'error': 'Error al crear el usuario, el email ya se encuentra registrado','error_usuario':"El email ya se encuentra registrado"}, status=500)

        except Exception as e:
            # Manejar error general
            logger.error(f'Error al crear el usuario: {e}')
            return JsonResponse({'error': 'Error al crear el usuario, el email ya se encuentra registrado','error_usuario':"El email ya se encuentra registrado"}, status=500)
def convert_document(doc):
    """Convert ObjectId to string in a document."""
    if '_id' in doc and isinstance(doc['_id'], ObjectId):
        doc['_id'] = str(doc['_id'])
    return doc