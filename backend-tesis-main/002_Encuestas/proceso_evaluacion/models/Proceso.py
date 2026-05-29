
class Proceso:
    def __init__(self, nombre_proceso, dni, nombre_usuario_creacion, nombre_cliente,sexo_cliente,antiguedad, 
                 nombre_usuario_modificacion,email_usuario_modificacion,usuario_asignado_id,usuario_asignado, fecha_creacion=None, fecha_modificacion=None, 
                 estado=1, estado_proceso=1, gpt_flag=False,lista_ids=None,ubicaciones=None,inmuebles_procesados=0,inmuebles_finales=0):
        
        self.nombre_proceso = nombre_proceso
        self.dni = dni
        self.nombre_usuario_creacion = nombre_usuario_creacion
        self.nombre_cliente = nombre_cliente
        self.nombre_usuario_modificacion = nombre_usuario_modificacion
        self.email_usuario_modificacion = email_usuario_modificacion
        self.usuario_asignado_id = usuario_asignado_id
        self.usuario_asignado = usuario_asignado
        self.fecha_creacion = fecha_creacion 
        self.sexo_cliente = sexo_cliente
        self.fecha_modificacion = fecha_modificacion
        self.estado = estado
        self.estado_proceso = estado_proceso
        self.gpt_flag = gpt_flag
        self.antiguedad = antiguedad
        self.lista_ids = lista_ids if lista_ids else []
        self.ubicaciones = ubicaciones if ubicaciones else []
        self.inmuebles_procesados = inmuebles_procesados
        self.inmuebles_finales = inmuebles_finales

    def to_dict(self):
        return {
            "nombre_proceso": self.nombre_proceso,
            "dni": self.dni,
            "nombre_usuario_creacion": self.nombre_usuario_creacion,
            "nombre_cliente": self.nombre_cliente,
            "antiguedad": self.antiguedad,
            "nombre_usuario_modificacion": self.nombre_usuario_modificacion,
            "email_usuario_modificacion": self.email_usuario_modificacion,
            "usuario_asignado_id": self.usuario_asignado_id,
            "usuario_asignado": self.usuario_asignado,
            "sexo_cliente": self.sexo_cliente,
            "fecha_creacion": self.fecha_creacion,
            "fecha_modificacion": self.fecha_modificacion,
            "estado": self.estado,
            "estado_proceso": self.estado_proceso,
            "gpt_flag": self.gpt_flag,
            "lista_ids": self.lista_ids,
            "ubicaciones": self.ubicaciones,
            "inmuebles_procesados": self.inmuebles_procesados,
            "inmuebles_finales": self.inmuebles_finales
        }