import Kafka  from 'kafkajs';

export const kafka = new Kafka.Kafka({
    clientId: 'ride',
    brokers: ['kafka:9092'], // internal Docker hostname
  });