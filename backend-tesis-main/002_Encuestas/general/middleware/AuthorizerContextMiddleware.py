class AuthorizerContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Agregar el contexto del authorizer al `request`
        authorizer_context = request.META.get('authorizer_context', {})
        request.authorizer_context = authorizer_context

        # Llamar al siguiente middleware o vista
        response = self.get_response(request)
        return response
