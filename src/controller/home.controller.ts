import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/http.exception.filter';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class HomeController {

  @Get()
  getHello(): object {
    // return this.appService.getHello();
    return { message: 'Hello World!' };
  }
}

