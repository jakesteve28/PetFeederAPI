import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PythonShell, Options } from 'python-shell'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postStart(token: string, speed: string): string  {
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
        pythonPath: '/usr/bin/python',
        pythonOptions: ['-u'],
        scriptPath: './scripts',
        args: [`${speedNum}`]
    }; 
    let res: any[] = [];
    let index = 0;
    PythonShell.run('servo-script.py', options, function(error, results){
	if(error){
		console.log(error)
	}
	console.log(results)
    })
   /* let pyshell = new PythonShell('servo-script.py', options);
    pyshell.on('message', (message) => {
	res[index] = message 
    	index++
	console.log(message)
    })*/
    return "Pet Feeder Servo Started at Speed: " + speed + " and with script results: " + res;
  }
  postStop(token: string) : string {
    return 'Pet Feeder Servo Stopped';
  }
}
