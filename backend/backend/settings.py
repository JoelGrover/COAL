import environ
from pathlib import Path

import environ


env = environ.Env()
environ.Env.read_env()  # reads the .env file

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG', default=False)

# Initialize environment variables
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = environ.Env().str('SECRET_KEY')
DEBUG = environ.Env().bool('DEBUG', default=False)
ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = [
    "https://localhost:5173",  # React frontend
    "https://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'django_extensions',
    'rest_framework',
    'corsheaders',
    'channels',
    'rest_framework_simplejwt',
]

ASGI_APPLICATION = 'backend.asgi.application'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',  # You can change this to DEBUG if you want more detailed output
            'propagate': True,
        },
        # Logger for your specific app
        'api': {
            'handlers': ['console'],
            'level': 'INFO',  # Adjust as needed
            'propagate': True,
        },
    },
}

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
DATABASES = {
    'default': environ.Env().db('DATABASE_URL', default='mysql://root:password@localhost:3306/dbname')
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# HTTPS-related settings
# Redirect HTTP to HTTPS
SECURE_SSL_REDIRECT = True

# Enable HTTP Strict Transport Security (HSTS)
SECURE_HSTS_SECONDS = 31536000  # Enforces HTTPS in browsers for a year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True


# Use secure cookies
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Set the path to your SSL certificates
SSL_CERTIFICATE_PATH = BASE_DIR / 'cert.pem'  # Replace with the path to your SSL certificate
SSL_KEY_PATH = BASE_DIR / 'privkey.pem'  # Replace with the path to your SSL private key

# Run the server with SSL locally (for development use)
if DEBUG:
    # Ensure that the SSL certificate and key exist for local development
    import os
    if not os.path.exists(SSL_CERTIFICATE_PATH) or not os.path.exists(SSL_KEY_PATH):
        raise Exception("SSL certificate and/or key files are missing")

# To run the development server with SSL enabled:
# python manage.py runserver_plus --cert-file cert.pem --key-file privkey.pem

# Channel layer configuration (using Redis)
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [('127.0.0.1', 6379)],  # Redis server configuration
        },
    },
}

# Define ASGI application
ASGI_APPLICATION = 'backend.asgi.application'

# If you're using SSL/HTTPS, ensure WebSocket can be used with secure connection
SECURE_SSL_REDIRECT = True 
# settings.py

# Add this LOGGING configuration at the end of your settings.py file
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,  # Keep existing loggers active
    'handlers': {
        'console': {
            'level': 'DEBUG',  # Adjust the level as necessary (DEBUG, INFO, ERROR, etc.)
            'class': 'logging.StreamHandler',  # Use StreamHandler for console output
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],  # Link the console handler to the django logger
            'level': 'DEBUG',  # Adjust logging level as per your needs
            'propagate': True,  # Allow propagation of the log messages
        },
    },
}


CORS_ALLOW_ALL_ORIGINS = True  # for development only

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
