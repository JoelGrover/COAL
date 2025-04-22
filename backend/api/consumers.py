# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ConstraintsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("constraints_group", self.channel_name)
        await self.accept()

        # Send initial data
        initial_data = [
            { id: 1, parameter: "C", type: "Hard", basis: "ARB", UB: 100.0, LB: 40.0 },
            { id: 2, parameter: "H", type: "Hard", basis: "ARB", UB: 100.0, LB: 3.0 },
            { id: 3, parameter: "N", type: "Hard", basis: "ARB", UB: 2.5, LB: 0.0 },
            { id: 4, parameter: "O", type: "Hard", basis: "ARB", UB: 40.0, LB: 0.0 },
            { id: 5, parameter: "HGI", type: "Hard", basis: "ARB", UB: 80.0, LB: 45.0 },
            { id: 6, parameter: "IDT", type: "Hard", basis: "ARB", UB: 100000000000.0, LB: 1100.0 },
            { id: 7, parameter: "TM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
            { id: 8, parameter: "IM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
            { id: 9, parameter: "Ash", type: "Hard", basis: "ARB", UB: 25.0, LB: 0.0 },
            { id: 10, parameter: "VM", type: "Hard", basis: "ARB", UB: 45.0, LB: 18.0 },
            { id: 11, parameter: "FC", type: "Hard", basis: "ARB", UB: 58.2, LB: 4.25 },
            { id: 12, parameter: "GCV", type: "Hard", basis: "ARB", UB: 6615.0, LB: 4150.0 },
            { id: 13, parameter: "Sulphur", type: "Hard", basis: "ARB", UB: 1.0, LB: 0.0 },
            { id: 14, parameter: "SiO2", type: "Hard", basis: "ARB", UB: 70.0, LB: 0.0 },
            { id: 15, parameter: "Base-acid ratio", type: "Hard", basis: "ARB", UB: 0.7, LB: 0.4 },
            { id: 16, parameter: "Slagging Factor", type: "Hard", basis: "ARB", UB: 2.0, LB: 0.0 },
            { id: 17, parameter: "Slagging Index", type: "Hard", basis: "ARB", UB: 10000000000.0, LB: 1125.0 },
            { id: 18, parameter: "SO3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 19, parameter: "Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 20, parameter: "Fe2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 21, parameter: "CaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 22, parameter: "MgO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 23, parameter: "K2O", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 24, parameter: "TiO2", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 25, parameter: "P2O5", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 26, parameter: "HDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 27, parameter: "SDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 28, parameter: "Ash Fusion", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 29, parameter: "T2O5 Temperature", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 30, parameter: "Iron Calcium Ratio", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 31, parameter: "Iron Plus Calcium", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 32, parameter: "Silica Per", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 33, parameter: "Base", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 34, parameter: "Acid", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 35, parameter: "M Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 36, parameter: "C Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 37, parameter: "SiO2 Plus Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 38, parameter: "Net Calorific VAlue", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 39, parameter: "Mn3O4", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 40, parameter: "BaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 41, parameter: "ZnO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 42, parameter: "SrO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 43, parameter: "Mercury", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 44, parameter: "Arsenic", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 45, parameter: "Fluorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 46, parameter: "Phosphorus", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 47, parameter: "Chlorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 48, parameter: "Boron", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 49, parameter: "Total Reactives", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 50, parameter: "Total Inerts", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 51, parameter: "Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 52, parameter: "Semi Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 53, parameter: "Oxivitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 54, parameter: "Liptinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 55, parameter: "Macrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 56, parameter: "Micrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 57, parameter: "Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 58, parameter: "Semi Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 59, parameter: "Mineral Matter", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
            { id: 60, parameter: "Mean Maximum Reflectance", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
        ]

        await self.send(text_data=json.dumps({
            "type": "initial_data",
            "data": initial_data
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("constraints_group", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data["type"] == "update_constraints":
            await self.channel_layer.group_send(
                "constraints_group",
                {
                    "type": "broadcast_constraints",
                    "data": data["data"],
                },
            )

    async def broadcast_constraints(self, event):
        await self.send(text_data=json.dumps({
            "type": "update_constraints",
            "data": event["data"]
        }))


import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("data_updates", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("data_updates", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        
        # You can handle client messages here if needed.
        # For now, we're only broadcasting from server side.

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))

