import amqp from "amqplib";
import MasterService from './services/masterService'

let channel: amqp.Channel | null = null

export const connectToRabbitMQ = async () => {
    try {
        console.log("Подключение к RabbitMQ...");
        const amqpServer = "amqp://rabbitmq:5672";
        const connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();

        await channel.assertQueue('master_created');
        await channel.consume('master_created', (data) => {
            console.log(`Сервис project получил информацию о пользователе ${Buffer.from(data!.content)}`)
            if (data) {
                const masterData = JSON.parse(data.content.toString());
                console.log('Данные о магистранте: ', masterData)
                new MasterService().create(masterData);
                channel.ack(data!);
            }
        });

        console.log("RabbitMQ подключен и очередь 'master_created' создана.");
    } catch (error) {
        console.error("Ошибка подключения к RabbitMQ:", error);
    }
};