from datetime import datetime
import logging
from bson import ObjectId
from proceso_evaluacion.utils.MongoConnection import MongoConnection
from django.http import JsonResponse,HttpResponse
import pytz


# Configurar el logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
utc = pytz.UTC
class EvaluacionRepository:   

    @staticmethod
    def get_all_assements(usuario):
        try:
            # Crear cliente de MongoDB
            mongo_conn = MongoConnection()
            assesments = mongo_conn.db.assessments.find({"usuario": usuario, "estado": 1})
            
            result = []
            for assesment in assesments:
                assesment = convert_document(assesment)
                result.append(assesment)
            result = {
                "assesments": result
            }

            return result
        except Exception as e:
            logger.error(f'Error occurred while getting assesments: {e}')
            return JsonResponse({'error': 'An error occurred',"error_usuario":"Ocurrio un error"}, status=500) 
    
    @staticmethod
    def get_assessment_by_id(assessment_id):
        try:
            mongo_conn = MongoConnection()
            assessment = mongo_conn.db.assessments.find_one({"_id": ObjectId(assessment_id)})
            if assessment:
                assessment = convert_document(assessment)
                return assessment
            else:
                return JsonResponse({'error': 'No se encontró la evaluación',"error_usuario":"No se encontro la evaluacion"}, status=404)
        except Exception as e:
            logger.error(f'Error occurred while getting assessment by ID: {e}')
            return JsonResponse({'error': 'An error occurred',"error_usuario":"Ocurrio un error"}, status=500)
        
    @staticmethod
    def save_initial_assessment(data, username):
        try:
            mongo_conn = MongoConnection()
            alternativas_marcadas_codigos = data["alternativas_marcadas"]
            utc = pytz.utc
            now = datetime.now(utc)

            control_scores = {}
            category_scores = {}

            # Obtener todas las alternativas de la base de datos
            todas_alternativas = mongo_conn.db.alternativas.find({})

            # Procesar alternativas y marcar si están en alternativas_marcadas_codigos
            alternativas_marcadas = []
            for alternativa in todas_alternativas:
                is_checked = "true" if alternativa["codigo_alternativa"] in alternativas_marcadas_codigos else "false"
                alternativa_data = {
                    "codigo_control": alternativa["codigo_control"],
                    "codigo_alternativa": alternativa["codigo_alternativa"],
                    "alternativa": alternativa["alternativas"],
                    "puntaje": float(alternativa["puntaje"]) if is_checked == "true" else 0,
                    "is_checked": is_checked
                }
                alternativas_marcadas.append(alternativa_data)

                # Acumular puntajes por control
                codigo_control = alternativa["codigo_control"]
                if codigo_control not in control_scores:
                    control_scores[codigo_control] = {"alternativas": [], "total_puntaje": 0}

                control_scores[codigo_control]["alternativas"].append([
                    alternativa["codigo_alternativa"],
                    alternativa["puntaje"],
                    is_checked
                ])
                control_scores[codigo_control]["total_puntaje"] += alternativa_data["puntaje"]

            # Crear `alternativas_marcadas` como array de objetos {fecha, alternativas_marcadas_codigos}
            alternativas_marcadas_array = {
                "fecha": now,
                "alternativas_marcadas": alternativas_marcadas_codigos
            }

            # Calcular el puntaje total para cada control y acumular puntajes para categorías
            for control, data in control_scores.items():
                total_control_score = round(data["total_puntaje"], 2)

                control_doc = mongo_conn.db.controles.find_one({"codigo_control": control})
                if control_doc:
                    codigo_categoria = control_doc["codigo_seccion"]

                    if codigo_categoria not in category_scores:
                        category_scores[codigo_categoria] = {"controles": [], "total_puntaje": 0, "contador": 0}
                    if total_control_score >= 0.99:
                        total_control_score = 1.00
                    category_scores[codigo_categoria]["controles"].append({
                        "codigo_control": control,
                        "puntaje": total_control_score
                    })
                    category_scores[codigo_categoria]["total_puntaje"] += total_control_score
                    category_scores[codigo_categoria]["contador"] += 1

            # Crear `resultados` como array de objetos {codigo_categoria, puntaje, controles: [array de los controles con su puntaje], fecha}
            resultados = []
            for categoria, data in category_scores.items():
                puntaje_categoria = data["total_puntaje"] / data["contador"] if data["contador"] > 0 else 0
                if puntaje_categoria >= 0.99:
                    puntaje_categoria = 1.00
                puntaje_categoria=round(puntaje_categoria, 2)
                resultados.append({
                    "codigo_categoria": categoria,
                    "puntaje": puntaje_categoria,
                    "controles": data["controles"],
                })
            #sumar puntaje de resultados y dividir por la cantidad de resultados
            puntaje_total = 0
            for resultado in resultados:
                puntaje_total += resultado["puntaje"]
            puntaje_total = puntaje_total / len(resultados)
        
            resultados_final = {
                "fecha": now,
                "resultados": resultados,
                "puntaje_total": puntaje_total
            }

            # Crear el documento de evaluación para guardar
            assessment = {
                "usuario": username,
                "alternativas_marcadas": alternativas_marcadas_array,
                "estado": 1,
                "fecha_creacion": now,
                "fecha_modificacion": now,
                "resultados": resultados_final
            }

            result = mongo_conn.db.assessments.insert_one(assessment)
            
            return JsonResponse({"message": "Evaluación guardada correctamente", "assessment_id": str(result.inserted_id)}, status=200)

        except Exception as e:
            logger.error(f'Error occurred while saving initial assessment: {e}', exc_info=True)
            return JsonResponse({'error': 'An error occurred', "error_usuario": "Ocurrió un error al guardar la evaluación"}, status=500)
    @staticmethod
    def save_assessment(data, assessment_id):
        try:
            mongo_conn = MongoConnection()
            alternativas_marcadas_codigos = data["alternativas_marcadas"]
            utc = pytz.utc
            now = datetime.now(utc)

            control_scores = {}
            category_scores = {}

            # Obtener todas las alternativas de la base de datos
            todas_alternativas = mongo_conn.db.alternativas.find({})

            # Procesar alternativas y marcar si están en alternativas_marcadas_codigos
            alternativas_marcadas = []
            for alternativa in todas_alternativas:
                is_checked = "true" if alternativa["codigo_alternativa"] in alternativas_marcadas_codigos else "false"
                alternativa_data = {
                    "codigo_control": alternativa["codigo_control"],
                    "codigo_alternativa": alternativa["codigo_alternativa"],
                    "alternativa": alternativa["alternativas"],
                    "puntaje": float(alternativa["puntaje"]) if is_checked == "true" else 0,
                    "is_checked": is_checked
                }
                alternativas_marcadas.append(alternativa_data)

                # Acumular puntajes por control
                codigo_control = alternativa["codigo_control"]
                if codigo_control not in control_scores:
                    control_scores[codigo_control] = {"alternativas": [], "total_puntaje": 0, "contador": 0}

                control_scores[codigo_control]["alternativas"].append([
                    alternativa["codigo_alternativa"],
                    alternativa["puntaje"],
                    is_checked
                ])
                control_scores[codigo_control]["total_puntaje"] += alternativa_data["puntaje"]
                control_scores[codigo_control]["contador"] += 1

            # Crear `alternativas_marcadas` como array de objetos {fecha, alternativas_marcadas_codigos}
            alternativas_marcadas_array = [{
                "fecha": now,
                "alternativas_marcadas": alternativas_marcadas_codigos,
                "numero_evaluacion":0
            }]

            # Calcular el puntaje promedio para cada control y categoría
            for control, data in control_scores.items():
                promedio_control = data["total_puntaje"] / data["contador"] if data["contador"] > 0 else 0

                control_doc = mongo_conn.db.controles.find_one({"codigo_control": control})
                if control_doc:
                    codigo_categoria = control_doc["codigo_seccion"]

                    if codigo_categoria not in category_scores:
                        category_scores[codigo_categoria] = {"controles": [], "total_puntaje": 0, "contador": 0}

                    category_scores[codigo_categoria]["controles"].append({
                        "codigo_control": control,
                        "puntaje": promedio_control
                    })
                    category_scores[codigo_categoria]["total_puntaje"] += promedio_control
                    category_scores[codigo_categoria]["contador"] += 1

            # Crear `resultados` como array de objetos {codigo_categoria, puntaje, controles: [array de los controles con su puntaje], fecha}
            resultados = []
            for categoria, data in category_scores.items():
                puntaje_categoria = data["total_puntaje"] / data["contador"] if data["contador"] > 0 else 0
                resultados.append({
                    "codigo_categoria": categoria,
                    "puntaje": puntaje_categoria,
                    "controles": data["controles"],
                })

            resultados_final = [{
                "fecha": now,
                "resultados": resultados,
                "numero_evaluacion":0
            }]

            # Si se proporciona un ID de evaluación, actualizar el documento existente
            if assessment_id:
                existing_assessment = mongo_conn.db.assessments.find_one({"_id": ObjectId(assessment_id)})
                if existing_assessment:
                    numero_evaluacion_inicial = len(existing_assessment.get("alternativas_marcadas", [])) + 1
                    alternativas_marcadas_array[0]["numero_evaluacion"] = numero_evaluacion_inicial
                    resultados_final[0]["numero_evaluacion"] = numero_evaluacion_inicial
                    # Actualizar alternativas marcadas y resultados
                    alternativas_marcadas_bd = existing_assessment.get("alternativas_marcadas", [])
                    resultados_bd = existing_assessment.get("resultados", [])
                    #a;adir los resultados anteriores
                    alternativas_marcadas_bd.extend(alternativas_marcadas_array)
                    resultados_bd.extend(resultados_final)
                    # Crear el documento de evaluación actualizado
                    updated_assessment = {
                        "alternativas_marcadas": alternativas_marcadas_bd,
                        "estado": 1,
                        "fecha_creacion": existing_assessment["fecha_creacion"],  # Mantener la fecha de creación original
                        "fecha_modificacion": now,
                        "resultados": resultados_bd
                    }

                    # Guardar los cambios en el documento
                    mongo_conn.db.assessments.update_one({"_id": ObjectId(assessment_id)}, {"$set": updated_assessment})
                    
                    return JsonResponse({"message": "Evaluación actualizada correctamente", "assessment_id": assessment_id}, status=200)

        except Exception as e:
            logger.error(f'Error occurred while saving initial assessment: {e}', exc_info=True)
            return JsonResponse({'error': 'An error occurred', "error_usuario": "Ocurrió un error al guardar la evaluación"}, status=500)

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