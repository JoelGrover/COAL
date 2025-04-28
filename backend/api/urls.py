from django.urls import path
from . import views

urlpatterns = [
    path('vessels/', views.get_vessels),
    path('vessel-data/<str:vessel_name>/', views.get_vessel_data),
    path('save-coal1-report/', views.save_coal1_report),
    path('vessel-data/<str:vessel_name>/', views.vessel_data, name='vessel-data'),
    path('api/sections/', views.get_sections),
    path('api/add-row/', views.add_row),
    path('api/update-row/', views.update_row),
    path('api/save-sections/', views.save_sections),
    path('api/delete-row/', views.delete_row,),
    path('register/', views.register),
    path('login/', views.login,),
    

]
