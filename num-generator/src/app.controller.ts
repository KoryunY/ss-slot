import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {

  @MessagePattern({ cmd: 'num' })
  generate(): number {
    return Math.floor(Math.random() * 10000000);
  }
}
