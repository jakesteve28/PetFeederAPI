import { Controller, Get, Post, Param, Req, Headers, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('servo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post(":speed")
  @Header('Access-Control-Allow-Origin', '*')  
  startFeeder(@Param('speed') speed: string, @Headers('token') token : string) : string {
    return this.appService.postStart(token, speed)
  }

  @Post()
  stopFeeder(@Headers('token') token : string) : string {
    return this.appService.postStop(token)
  }

}
