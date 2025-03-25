import amqp from "amqplib";

let channel: amqp.Channel | null = null

export const connectToRabbitMQ = async () => {
    try {
        console.log("Подключение к RabbitMQ...");
        const amqpServer = "amqp://rabbitmq:5672";
        const connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        
        await channel.assertQueue('master_created');
        await channel.assertQueue('bachelor_created');        
    } catch (error) {
        console.error("Ошибка подключения к RabbitMQ:", error);
    }
};

export const sendToQueue = (queue: string, data: any) => {
    if (!channel) {
        console.error("Ошибка: Канал RabbitMQ не инициализирован.");
        return;
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(`Сообщение отправлено в очередь ${queue}:`, data);
};
