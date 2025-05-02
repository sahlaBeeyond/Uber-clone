import { kafka } from "../utils/kafka";
const consumer=kafka.consumer({ groupId: 'captain' });

export const consumeToRideEvent=async() => {
    try {
        console.log("Starting Kafka consumer for ride events...");
        await consumer.connect();
        console.log("Connected to Kafka broker.");
        await consumer.subscribe({ topic: 'ride-created', fromBeginning: false });
        console.log("Subscribed to topic ride-created.");
        await consumer.run({
            eachMessage: async ({ message }) => {
                const rideData = JSON.parse(message.value.toString());
                console.log(`Event consumed from topic ${'ride-created'}:`, rideData);
                console.log("New ride created!", rideData);
                // Process the event as needed
            },
        });
        console.log("Kafka consumer is running and listening for messages...");
    } catch (error) {
        console.error(`Error consuming event from topic ride-created:`, error);
    }
}