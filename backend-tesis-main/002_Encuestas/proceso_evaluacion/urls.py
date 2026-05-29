from django.urls import path
from .controllers.generalDataController import get_user_data_controller, get_general_data_controller, create_user_controller
from .controllers.evaluacionController import get_all_assestments, save_initial_assestment, save_assestment, get_assestment_by_id

urlpatterns = [
    path('crear-usuario', create_user_controller, name='create_user'),  
    path('user-config-data', get_user_data_controller, name='get_user_data'),
    path('general-data', get_general_data_controller, name='get_general_data'),
    path('evaluaciones', get_all_assestments, name='get_all_assestments'),
    path('guardar-evaluacion', save_initial_assestment, name='finalizar_evaluacion'),
    #path('agregar-resultado-evaluacion', save_assestment, name='agregar_resultado_evaluacion'),
    #path('evaluacion-por-id', get_assestment_by_id, name='get_assestment_by_id'),
]