import json
import logging
from django.http import JsonResponse
from proceso_evaluacion.repository.generalDataRepository import generalDataRepository

# Configurar el logger
logger = logging.getLogger(__name__)

class GeneralDataService:
    
    @staticmethod
    def get_user_data(filter):
        try:
            #inicializar repositorio                  
            data = generalDataRepository.get_principal_user_data(filter)
            
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
    def get_general_data():
        try:
            # Obtener los datos generales
            data = generalDataRepository.get_table_general_data()
            
            if data is None:
                logger.error('No se encontraron datos para los criterios dados.')
                return JsonResponse({'error': 'No se encontraron datos'}, status=404)
            
            # Devolver datos en el formato adecuado
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)
        
    @staticmethod
    def create_user(body):
        try:
            # Obtener los datos generales
            data = generalDataRepository.create_user(body)
            
            if data is None:
                logger.error('No se encontraron datos para los criterios dados.')
                return JsonResponse({'error': 'No se encontraron datos'}, status=404)
            
            # Devolver datos en el formato adecuado
            return data
        except Exception as e:
            logger.error(f'Ocurrió un error: {e}')
            return JsonResponse({'error': 'Ocurrió un error'}, status=500)
