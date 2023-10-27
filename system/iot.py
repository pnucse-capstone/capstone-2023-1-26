import time, json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

i = [0]
o = [0]

i2 = [0]
o2 = [0]

add1 = [0]
add2 = [0]

dir1 = ["101/0"]
dir2 = ["111/0"]

def helloword1(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    i.append(value['count'])
    print(i)


def helloword2(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    o.append(value['count'])
    print(o)


def helloword3(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    i2.append(value['count'])
    print(i2)
    add2.pop()
    add2.append(value['address'])


def helloword4(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    o2.append(value['count'])
    print(o2)

def helloword5(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    dir1.pop()
    dir1.append("101/" + str(value['accidentNum']))
    add1.pop()
    add1.append(value['address'])


def helloword6(self, params, packet):
    print('Received Message from AWS IoT Core')
    print('Topic: ' + packet.topic)
    value = json.loads(packet.payload.decode('utf-8'))
    print("Payload: ", value)
    dir2.pop()
    dir2.append("111/" + str(value['accidentNum']))
    add2.pop()
    add2.append(value['address'])


myMQTTClinet = AWSIoTMQTTClient("MyTest")
myMQTTClinet.configureEndpoint("a34lkk6u0zedod-ats.iot.ap-northeast-2.amazonaws.com", 8883)
myMQTTClinet.configureCredentials("C:/Users/jeongho/certs/Amazon-root-CA-1.pem", "C:/Users/jeongho/certs/private.pem.key", "C:/Users/jeongho/certs/device.pem.crt")
myMQTTClinet.configureOfflinePublishQueueing(-1)
myMQTTClinet.configureDrainingFrequency(2)
myMQTTClinet.configureConnectDisconnectTimeout(10)
myMQTTClinet.configureMQTTOperationTimeout(5)
print("Initiating IoT Core Topic ...")

myMQTTClinet.subscribe("test1", 1, helloword1)
myMQTTClinet.subscribe("test2", 1, helloword2)
myMQTTClinet.subscribe("test3", 1, helloword3)
myMQTTClinet.subscribe("test4", 1, helloword4)
myMQTTClinet.subscribe("test5", 1, helloword5)
myMQTTClinet.subscribe("test6", 1, helloword6)
myMQTTClinet.connect()



















