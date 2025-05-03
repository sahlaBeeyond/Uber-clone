import Kafka  from 'kafkajs';

export const kafka = new Kafka.Kafka({
    clientId: 'captain',
    brokers: ['kafka:9092'], // internal Docker hostname
  });