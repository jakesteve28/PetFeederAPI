import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PythonShell, Options } from 'python-shell'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postStart(token: string, speed: string): string {
    let speedNum = -1
    if(token && speed) {
      speedNum = parseInt(speed)
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Token or speed error',
      }, HttpStatus.BAD_REQUEST);
    } 
    if(speedNum >= 8 || speedNum <= 0) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Speed error; speed cannot be less than zero or more than 8',
      }, HttpStatus.BAD_REQUEST);
    }
    console.log(speedNum)
    var options : Options = {
        mode: "text",
        pythonPath: 'C:/Python/Python38/python.exe',
        pythonOptions: ['-u'],
        scriptPath: './scripts',
        args: [`${speedNum}`]
    }; 
    PythonShell.run('servo-script.py', options, (err, results) => {
      if(err) {
        console.log(err, results)
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Python shell execution error',
          }, HttpStatus.BAD_REQUEST);
      }
      console.log('results: %j', results);
    })
    return 'Pet Feeder Servo Started at speed :' + speed;
  }
  postStop(token: string) : string {
    return 'Pet Feeder Servo Stopped';
  }
}
