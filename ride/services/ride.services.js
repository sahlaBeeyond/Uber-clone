import { kafka } from "../utils/kafka";
const producer = kafka.producer();

export const publishRideEvent=async (topic, payload) => {
    try {
        console.log(`Publishing event to topic ${topic}:`, payload);
        await producer.connect();
        await producer.send({
            topic,
            messages: [
                { value: JSON.stringify(payload) },
            ],
        });
        console.log(`Event published to topic ${topic}:`, payload);
        await producer.disconnect();
    } catch (error) {
        console.error(`Error publishing event to topic ${'ride-created'}:`, error);
    }
}