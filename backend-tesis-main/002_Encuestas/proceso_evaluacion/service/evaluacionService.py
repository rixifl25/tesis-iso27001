import json
import logging
from django.http import JsonResponse
from proceso_evaluacion.repository.evaluacionRepository import EvaluacionRepository 

# Configurar el logger
logger = logging.getLogger(__name__)

class EvaluacionService:
    
    @staticmethod
    def get_all_assestments(filter):
        try:
            #inicializar repositorio                  
            data = EvaluacionRepository.get_all_assements(filter)
            
            if data is None:
                # Si no se encuentran datos, devolver un error adecuado
                logger.error('No se encontró el usuario para los criterios dados.')
                return JsonResponse({'error': 'No se encontró el usuario'}, status=404)
            
            # Devolver respuesta en formato JSON
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)
    
    @staticmethod
    def save_initial_assetment(body,username):
        try:
            # Obtener los datos generales
            data = EvaluacionRepository.save_initial_assessment(body,username)
            
            if data is None:
                logger.error('No se encontraron datos para los criterios dados.')
                return JsonResponse({'error': 'No se encontraron datos'}, status=404)
            
            # Devolver datos en el formato adecuado
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)
        
    @staticmethod
    def save_new_assestment(body,evaluacion_id):
        try:
            # Obtener los datos generales
            data = EvaluacionRepository.save_assessment(body,evaluacion_id)
            
            if data is None:
                logger.error('No se encontraron datos para los criterios dados.')
                return JsonResponse({'error': 'No se encontraron datos'}, status=404)
            
            # Devolver datos en el formato adecuado
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)

    @staticmethod
    def get_assestment_by_id(evaluacion_id):
        try:
            # Obtener los datos generales
            data = EvaluacionRepository.get_assessment_by_id(evaluacion_id)
            
            if data is None:
                logger.error('No se encontraron datos para los criterios dados.')
                return JsonResponse({'error': 'No se encontraron datos'}, status=404)
            
            # Devolver datos en el formato adecuado
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)