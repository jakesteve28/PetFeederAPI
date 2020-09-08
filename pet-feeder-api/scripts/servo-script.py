import RPi.GPIO as GPIO
import time
import sys 

servoPIN = 17

openHz = 50 
openTime = 0.8
closeHz = 50
closeTime = 0.7

GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)
argspeed = sys.argv[0]
print(float(sys.argv[1]))
duration_arg = float(sys.argv[1])
#p = GPIO.PWM(servoPIN, closeHz) # GPIO 17 for PWM with Hz
#//p.start(8.0) # Initialization
def openServo():
  p = GPIO.PWM(servoPIN, openHz)
  p.start(8.0)
  time.sleep(openTime)
  p.stop()
def closeServo(): 
  p = GPIO.PWM(servoPIN, closeHz) 
  p.start(4.0) 
  time.sleep(closeTime) 
  p.stop()

print("Servo Initialized")
try:
  print("Servo Started")
  closeServo()
  time.sleep(1.0) 
  openServo()
  print("Servo Stopped")
except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()

