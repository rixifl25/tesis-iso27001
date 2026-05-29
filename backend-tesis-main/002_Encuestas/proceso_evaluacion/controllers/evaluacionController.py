from django.http import JsonResponse

from proceso_evaluacion.utils.AuthorizerContextProcessor import AuthorizerContextProcessor
from proceso_evaluacion.service.evaluacionService import EvaluacionService
import json
import logging
from django.views.decorators.csrf import csrf_exempt


# Configurar el logger
logger = logging.getLogger(__name__)

@csrf_exempt
def get_all_assestments(request):
    if request.method == 'GET':
        try:
            body = json.loads(request.body.decode('utf-8'))
            logger.info(f"Body recibido: {body}")
            context_processor = AuthorizerContextProcessor(body)
            context_processor.complete_data()
            # Obtener los datos del usuario
            username = context_processor.get_username()
            data = EvaluacionService.get_all_assestments(username)
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
def get_assestment_by_id(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))
            logger.info(f"Body recibido: {body}")
            context_processor = AuthorizerContextProcessor(body)
            context_processor.complete_data()
            # Obtener los datos del usuario
            username = context_processor.get_username()
            evaluacion_id = body.get('evaluacion_id')
            data = EvaluacionService.get_assestment_by_id(evaluacion_id)
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
def save_initial_assestment(request):
    if request.method == 'POST':
        try:    
            body = json.loads(request.body.decode('utf-8'))
            context_processor = AuthorizerContextProcessor(body)
            context_processor.complete_data()
            # Obtener los datos del usuario
            username = context_processor.get_username()

            data = EvaluacionService.save_initial_assetment(body,username)

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
def save_assestment(request):
    if request.method == 'POST':
        try:    
            body = json.loads(request.body.decode('utf-8'))
            context_processor = AuthorizerContextProcessor(body)
            context_processor.complete_data()
            # Obtener los datos del usuario
            username = context_processor.get_username()
            evaluacion_id = body.get('evaluacion_id')
            data = EvaluacionService.save_new_assestment(body,evaluacion_id)

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