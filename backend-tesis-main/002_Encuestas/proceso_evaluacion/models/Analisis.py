from datetime import datetime
from bson import ObjectId

class Analisis:
    def __init__(self,nombre_analisis, nombre_usuario_creacion,
                 nombre_usuario_modificacion,email_usuario_modificacion, fecha_creacion=None, fecha_modificacion=None, 
                 estado=1, estado_analisis=1,lista_ids=None,
                 # Parámetros Generales
                 precio_soles_min=None, precio_soles_max=None, precio_dolares_min=None, precio_dolares_max=None, 
                 metraje_min=None, metraje_max=None, fecha_entrega=None, antiguedad=None,
                 dormitorios_min=None, dormitorios_max=None, banios=None, flag_duplex=False,
                 flag_inversion=False, flag_estacionamiento=False,
                 # Parámetros de Cálculo
                 conversion_dolar=None, TEA=None, monto_inicial=None, meses_financiamiento=None,
                 plusvalia=None, rp_plusvalia=None, op_plusvalia=None,
                 # Parámetros GPT
                 gpt_activado=False, estacionamientos_min=None, piso_inferior=None, piso_superior=None, 
                 areas_comunes=None, flag_ascensor=False, flag_vista_externa=False, flag_vista_interna=False,
                 # Parámetros Opcionales
                 flag_pm2_min=False, valor_pm2_min=None, flag_filtrar_por_per=False, 
                 valor_filtrar_por_per=None, flag_blacklist=False, flag_eliminar_texto_antiguedad=False,
                 proceso_id=None,nombre_proceso=None):
        
        # Parámetros comunes
        self.nombre_analisis = nombre_analisis
        self.nombre_usuario_creacion = nombre_usuario_creacion
        self.nombre_usuario_modificacion = nombre_usuario_modificacion
        self.email_usuario_modificacion = email_usuario_modificacion
        self.fecha_creacion = fecha_creacion 
        self.fecha_modificacion = fecha_modificacion 
        self.estado = estado
        self.estado_analisis = estado_analisis
        self.lista_ids = lista_ids if lista_ids else []
        self.proceso_id = proceso_id
        self.nombre_proceso = nombre_proceso
        # Parámetros Generales
        self.precio_soles_min = precio_soles_min
        self.precio_soles_max = precio_soles_max
        self.precio_dolares_min = precio_dolares_min
        self.precio_dolares_max = precio_dolares_max
        self.metraje_min = metraje_min
        self.metraje_max = metraje_max
        self.fecha_entrega = fecha_entrega
        self.antiguedad = antiguedad
        self.dormitorios_min = dormitorios_min
        self.dormitorios_max = dormitorios_max
        self.banios = banios
        self.flag_duplex = flag_duplex
        self.flag_inversion = flag_inversion
        self.flag_estacionamiento = flag_estacionamiento
        
        # Parámetros de Cálculo
        self.conversion_dolar = conversion_dolar
        self.TEA = TEA
        self.monto_inicial = monto_inicial
        self.meses_financiamiento = meses_financiamiento
        self.plusvalia = plusvalia
        self.rp_plusvalia = rp_plusvalia
        self.op_plusvalia = op_plusvalia
        
        # Parámetros GPT
        self.gpt_activado = gpt_activado
        self.estacionamientos_min = estacionamientos_min
        self.piso_inferior = piso_inferior
        self.piso_superior = piso_superior
        self.areas_comunes = areas_comunes
        self.flag_ascensor = flag_ascensor
        self.flag_vista_externa = flag_vista_externa
        self.flag_vista_interna = flag_vista_interna
        
        # Parámetros Opcionales
        self.flag_pm2_min = flag_pm2_min
        self.valor_pm2_min = valor_pm2_min
        self.flag_filtrar_por_per = flag_filtrar_por_per
        self.valor_filtrar_por_per = valor_filtrar_por_per
        self.flag_blacklist = flag_blacklist
        self.flag_eliminar_texto_antiguedad = flag_eliminar_texto_antiguedad

    def to_dict(self):
        return {
            # Parámetros comunes
            "nombre_analisis": self.nombre_analisis,
            "nombre_usuario_creacion": self.nombre_usuario_creacion,
            "nombre_usuario_modificacion": self.nombre_usuario_modificacion,
            "email_usuario_modificacion": self.email_usuario_modificacion,
            "fecha_creacion": self.fecha_creacion,
            "fecha_modificacion": self.fecha_modificacion,
            "estado": self.estado,
            "estado_analisis": self.estado_analisis,
            "lista_ids": self.lista_ids,
            "proceso_id": ObjectId(self.proceso_id),
            "nombre_proceso": self.nombre_proceso,
            # Parámetros Generales
            "precio_soles_min": self.precio_soles_min,
            "precio_soles_max": self.precio_soles_max,
            "precio_dolares_min": self.precio_dolares_min,
            "precio_dolares_max": self.precio_dolares_max,
            "metraje_min": self.metraje_min,
            "metraje_max": self.metraje_max,
            "fecha_entrega": self.fecha_entrega,
            "antiguedad": self.antiguedad,
            "dormitorios_min": self.dormitorios_min,
            "dormitorios_max": self.dormitorios_max,
            "banios": self.banios,
            "flag_duplex": self.flag_duplex,
            "flag_inversion": self.flag_inversion,
            "flag_estacionamiento": self.flag_estacionamiento,
            # Parámetros de Cálculo
            "conversion_dolar": self.conversion_dolar,
            "TEA": self.TEA,
            "monto_inicial": self.monto_inicial,
            "meses_financiamiento": self.meses_financiamiento,
            "plusvalia": self.plusvalia,
            "rp_plusvalia": self.rp_plusvalia,
            "op_plusvalia": self.op_plusvalia,
            # Parámetros GPT
            "gpt_activado": self.gpt_activado,
            "estacionamientos_min": self.estacionamientos_min,
            "piso_inferior": self.piso_inferior,
            "piso_superior": self.piso_superior,
            "areas_comunes": self.areas_comunes,
            "flag_ascensor": self.flag_ascensor,
            "flag_vista_externa": self.flag_vista_externa,
            "flag_vista_interna": self.flag_vista_interna,
            # Parámetros Opcionales
            "flag_pm2_min": self.flag_pm2_min,
            "valor_pm2_min": self.valor_pm2_min,
            "flag_filtrar_por_per": self.flag_filtrar_por_per,
            "valor_filtrar_por_per": self.valor_filtrar_por_per,
            "flag_blacklist": self.flag_blacklist,
            "flag_eliminar_texto_antiguedad": self.flag_eliminar_texto_antiguedad
        }