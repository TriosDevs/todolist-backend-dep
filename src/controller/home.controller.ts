import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {

  @Get()
  getHello(): object {
    // return this.appService.getHello();
    return { message: 'Hello World!' };
  }
}

