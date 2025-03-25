import amqp from "amqplib";
import BachelorService from './services/bachelorService'

let channel: amqp.Channel | null = null

export const connectToRabbitMQ = async () => {
    try {
        console.log("Подключение к RabbitMQ...");
        const amqpServer = "amqp://rabbitmq:5672";
        const connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();

        await channel.assertQueue('bachelor_created');
        await channel.consume('bachelor_created', (data) => {
            console.log(`Сервис project получил информацию о пользователе ${Buffer.from(data!.content)}`)
            if (data) {
                const bachelorData = JSON.parse(data.content.toString());
                console.log('Данные о магистранте: ', bachelorData)
                new BachelorService().create(bachelorData);
                channel.ack(data!);
            }
        });

        console.log("RabbitMQ подключен и очередь 'bachelor_created' создана.");
    } catch (error) {
        console.error("Ошибка подключения к RabbitMQ:", error);
    }
};