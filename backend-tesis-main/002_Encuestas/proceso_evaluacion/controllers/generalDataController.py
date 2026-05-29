from django.http import JsonResponse

from proceso_evaluacion.utils.AuthorizerContextProcessor import AuthorizerContextProcessor
from proceso_evaluacion.service.generalDataService import GeneralDataService
import json
import logging
from django.views.decorators.csrf import csrf_exempt


# Configurar el logger
logger = logging.getLogger(__name__)

@csrf_exempt
def get_user_data_controller(request):
    if request.method == 'GET':
        try:
            body = json.loads(request.body.decode('utf-8'))
            logger.info(f"Body recibido: {body}")
            context_processor = AuthorizerContextProcessor(body)
            context_processor.complete_data()
            # Obtener los datos del usuario
            data = GeneralDataService.get_user_data( {"email": context_processor.get_email()} )
            
            if data is None:
                # Si no se encuentran datos, devolver un error adecuado
                logger.error('No data found for the given criteria.')
                return JsonResponse({'error': 'No se encontro el usuario'}, status=404)
            
            # Devolver respuesta en formato JSON
            return JsonResponse({'data': data}, status=200)
        
        except json.JSONDecodeError as e:
            logger.error(f'Error decoding JSON: {e}')
            return JsonResponse({'error': 'Invalid JSON body'}, status=400)
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({'error': 'An error occurred'}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def get_general_data_controller(request):
    if request.method == 'GET':
        try:
            
            data = GeneralDataService.get_general_data()
            
            if data is None:
                # Si no se encuentran datos, devolver un error adecuado
                logger.error('No data found for the given criteria.')
                return JsonResponse({'error': 'No data found for the given criteria'}, status=404)
            
            # Devolver respuesta en formato JSON
            return data
        
        except json.JSONDecodeError as e:
            logger.error(f'Error decoding JSON: {e}')
            return JsonResponse({'error': 'Invalid JSON body'}, status=400)
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({'error': 'An error occurred'}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def create_user_controller(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))

            data = GeneralDataService.create_user(body)
            
            if data is None:
                # Si no se encuentran datos, devolver un error adecuado
                logger.error('No data found for the given criteria.')
                return JsonResponse({'error': 'No data found for the given criteria'}, status=404)
            
            # Devolver respuesta en formato JSON
            return data
        
        except json.JSONDecodeError as e:
            logger.error(f'Error decoding JSON: {e}')
            return JsonResponse({'error': 'Invalid JSON body'}, status=400)
        except Exception as e:
            logger.error(f'Error occurred: {e}')
            return JsonResponse({'error': 'An error occurred'}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
