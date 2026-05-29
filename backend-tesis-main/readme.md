# Tesis Backend

Este proyecto es un backend para la aplicación **Tesis Backend**, que utiliza Serverless Framework para facilitar el desarrollo y despliegue de funciones en la nube. Este README te guiará a través de la instalación y el despliegue del proyecto.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (con npm)
- **Serverless Framework** (puedes instalarlo globalmente usando `npm install -g serverless`)
- **Conda** (para gestionar entornos de Python)

## Crear el Entorno de Conda

Este proyecto requiere un entorno de Python para funcionar adecuadamente. Utiliza el archivo `requirements.yml` para crear un entorno llamado `tesis_backend`. Ejecuta los siguientes comandos:

```bash
# Crear el entorno conda
conda env create -f requirements.yml

# Activar el entorno
conda activate tesis_backend
```

## Instalación de Plugins

Para que el proyecto funcione correctamente, se deben instalar algunos plugins de Serverless. Asegúrate de estar ubicado en la carpeta de cada función Lambda antes de ejecutar los siguientes comandos en tu terminal:

```bash
serverless plugin install -n serverless-python-requirements
serverless plugin install -n serverless-wsgi
npm install serverless-deployment-bucket --save-dev
```

## Despliegue

El proyecto está configurado para poder ser desplegado en diferentes etapas (stages). A continuación, se describen los comandos para desplegar en los entornos de desarrollo y producción.

### Despliegue en Desarrollo

Para desplegar la aplicación en el entorno de desarrollo (`dev`), ejecuta el siguiente comando:

```bash
serverless deploy --stage dev
```

### Despliegue en Producción

Para desplegar la aplicación en el entorno de producción (`prod`), utiliza el siguiente comando:

```bash
serverless deploy --stage prod
```

## Estructura del Proyecto

A continuación se describe brevemente la estructura del proyecto:

```
decateca-busqueda-backend/
│
├── serverless.yml        # Archivo de configuración de Serverless
├── requirements.yml      # Dependencias de Python
├── handler.py            # Funciones de backend
└── ...                   # Otras carpetas y archivos según sea necesario
```

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Haz un push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.

## Licencia

Este proyecto no tiene Licencia

## Contacto

Si tienes alguna pregunta o necesitas ayuda, no dudes en abrir un issue en el repositorio o contactarme directamente.

¡Gracias por tu interés en **Tesis Backend**!