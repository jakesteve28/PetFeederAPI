import RPi.GPIO as GPIO
import time
import sys 

servoPIN = 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)
argspeed = sys.argv[0]

p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
p.start(10.0) # Initialization
print("Servo Initialized")
try:
  print("Servo Started")
  time.sleep(5.0)
  print("Servo Stopped")
except KeyboardInterrupt:
  p.stop()
  GPIO.cleanup()
