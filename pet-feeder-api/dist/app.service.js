"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const python_shell_1 = require("python-shell");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    postStart(token, speed) {
        let speedNum = -1;
        if (token && speed) {
            speedNum = parseInt(speed);
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Token or speed error',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (speedNum >= 8 || speedNum <= 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Speed error; speed cannot be less than zero or more than 8',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        console.log(speedNum);
        var options = {
            mode: "text",
            pythonPath: 'C:/Python/Python38/python.exe',
            pythonOptions: ['-u'],
            scriptPath: './scripts',
            args: [`${speedNum}`]
        };
        python_shell_1.PythonShell.run('servo-script.py', options, (err, results) => {
            if (err) {
                console.log(err, results);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'Python shell execution error',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            console.log('results: %j', results);
        });
        return 'Pet Feeder Servo Started at speed :' + speed;
    }
    postStop(token) {
        return 'Pet Feeder Servo Stopped';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map