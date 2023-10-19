const mqtt = require('mqtt');
const {Server} = require('socket.io');
const createIOTServices = (httpServer) => {
    const socketIOServer = new Server(
        httpServer, {
            cors: {
                origin: 'http://localhost:5173',
                method: ['GET', 'POST']
            }
        }
    );

    const MQTT_BROKER_URL = 'mqtt://192.168.84.248:1883';
    const TOPIC_PROXIM = 'sensor/proxim';

    console.log('Trying to connect to MQTT Broker...');
    const mqttClient = mqtt.connect(MQTT_BROKER_URL);

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe([TOPIC_PROXIM], () => {
            console.log('berhasil subscribe');
        });
        mqttClient.on('message', (topic, payload) => {
            console.log('Received Message:', payload.toString());

            socketIOServer.emit('message', payload.toString());
        });

    });
};

module.exports = createIOTServices;