const createIOTServices = (httpServer) => {
    const mqtt = require('mqtt');
    const {Server} = require('socket.io');



    const socketIOServer = new Server(
        httpServer, {
            cors: {
                origin: 'http://localhost:5173',
                method: ['GET', 'POST']
            }
        }
    );

    const MQTT_BROKER = 'mqtt://0.tcp.ap.ngrok.io:12978';
    const TOPIC_PROXIM = 'sensor/proxim';
// const TOPIC_LED = 'sensor/led';
    const mqttClient = mqtt.connect(MQTT_BROKER);

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