import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'eureka-js-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
  const client = new Eureka({
    instance: {
      app: 'driver-microservice',

      instanceId: `driver-microservice-${port}`,

      hostName: process.env.HOST_NAME,
      ipAddr: process.env.IP_ADDRESS,

      port: {
        $: port,
        '@enabled': true,
      },

      vipAddress: 'node-service',

      // Data center info
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: process.env.EUREKA_HOSTNAME,
      port: process.env.EUREKA_PORT,
      servicePath: '/eureka/apps/',
      maxRetries: 5,
      requestRetryDelay: 2000,
      useDns: false,
    },
  });

  // Start the Eureka client
  client.start((error) => {
    if (error) {
      console.error('Eureka registration failed:', error);
    } else {
      console.log('Eureka registration successful');
    }
  });
}
bootstrap();
