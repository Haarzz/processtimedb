import * as mqtt from 'mqtt';
import {Server} from 'socket.io';
import http from "http";
const createIOTServices = async (httpServer : http.Server) => {
    return new Promise((resolve , reject) => {
        const socketIOServer = new Server(
            httpServer, {
                cors: {
                    origin: 'http://localhost:5173',
                    methods: ['GET', 'POST']
                }
            }
        );

        const MQTT_BROKER_URL = process.env.MQTT_URL || 'mqtt://192.168.11.248:1883';
        const TOPIC_PROXIM = 'sensor/proxim';

        console.log('Trying to connect to MQTT Broker...');
        const mqttClient = mqtt.connect(MQTT_BROKER_URL);

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttClient.subscribe([TOPIC_PROXIM], () => {
                console.log(`Subscribe to ${TOPIC_PROXIM}`);
            });
            mqttClient.on('message', (topic, payload) => {
                console.log('Received Message:', payload.toString());

                socketIOServer.emit("message", payload.toString());

            });
            resolve(null);
        });
        // mqttClient.on('offline' , () => reject('Gagal tersambung ke MQTT broker :('));
    });
};

export default createIOTServices;