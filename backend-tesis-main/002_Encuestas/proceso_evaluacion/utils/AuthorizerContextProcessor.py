import json

class AuthorizerContextProcessor:
    def __init__(self, body):
        self.body = body
        self.authorizer_context = self._extract_authorizer_context()
    
    def _extract_authorizer_context(self):
        """ Extrae el contexto del authorizer del body """
        authorizer_context = self.body.get('authorizer_context', {})
        return {
            "email": authorizer_context.get("email"),
            "nombre_usuario": authorizer_context.get("nombre_usuario")
        }
    
    def get_username(self):
        """ Retorna el nombre de usuario del authorizer_context """
        return self.authorizer_context.get("nombre_usuario")
    def get_email(self):
        """ Retorna el email del authorizer_context """
        return self.authorizer_context.get("email")
    
    def complete_data(self):
        """ Completa los datos basados en el contexto del authorizer """
        return {
            "email": self.get_email(),
            "nombre_usuario": self.get_username()
        }
