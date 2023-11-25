import * as mqtt from 'mqtt';
import {Server} from 'socket.io';
import http from "http";
import myPrismaClient from '../MyPrismaClient';
const createIOTServices = async (httpServer : http.Server) => {
    return new Promise((resolve , _reject) => {
        const socketIOServer = new Server(
            httpServer, {
                cors: {
                    origin: 'http://localhost:5173',
                    methods: ['GET', 'POST']
                }
            }
        );

        const MQTT_BROKER_URL = process.env.MQTT_URL || 'mqtt://127.0.0.1:1883';
        const TOPIC_PROXIM = 'sensor/proxim';

        console.log('Trying to connect to MQTT Broker...');
        const mqttClient = mqtt.connect(MQTT_BROKER_URL);

        mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            mqttClient.subscribe([TOPIC_PROXIM], () => {
                console.log(`Subscribe to ${TOPIC_PROXIM}`);
            });
            mqttClient.on('message', async (_topic, payload) => {
                const namaArduino = payload.toString();

                const prisma = myPrismaClient;
                const arduino = await prisma.arduino.findUnique({
                    where: {
                        nama_arduino: namaArduino,
                    },
                });
                await prisma.transaction.update({
                    data: {
                        actual: {
                            increment: 1
                        }
                    },
                    where: {
                        id: arduino!.assigned_transaction!
                    }
                });

                const updatedArduino = await prisma.arduino.findUnique({
                    where: {
                        nama_arduino : namaArduino
                    },
                    include: {
                        assigned_transactionId: {
                            include: {
                                group_id: true,
                                model_id: true,
                            }
                        }
                    },
                });

                console.log('Received Message from :', namaArduino);
                
                socketIOServer.emit(namaArduino, {arduino: updatedArduino});

            });
            resolve(null);
        });
        // mqttClient.on('offline' , () => reject('Gagal tersambung ke MQTT broker :('));
    });
};

export default createIOTServices;