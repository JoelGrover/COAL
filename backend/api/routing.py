from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws://localhost:8000/ws/constraints/', consumers.ConstraintConsumer.as_asgi()),
    re_path(r"ws://localhost:8000/ws/data/$", consumers.DataConsumer.as_asgi()),
]
