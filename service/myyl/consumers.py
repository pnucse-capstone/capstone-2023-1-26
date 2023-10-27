import json
from random import randint
from datetime import datetime
# from time import sleep
from asyncio import sleep

from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer

from myyl.iot import i, o, i2, o2, add1, add2, dir1, dir2
from myyl.weather import check_weather


class GraphConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        while True:
            total = i[-1] - o[-1]
            total2 = i2[-1] - o2[-1]

            if total < 0:
                total = 0

            if total2 < 0:
                total2 = 0

            congestion = 0
            congestion2 = 0

            # congestion = check_weather(total)
            # congestion2 = check_weather(total2)

            now = datetime.now()
            hour = now.hour
            
            await self.send(json.dumps({'value1': total, 'cong1': congestion, 'hour': hour,
                                        'value2': total2, 'cong2': congestion2, 'add1': add1, 'add2': add2, 'dir1':dir1, 'dir2':dir2}))
            await sleep(2)
