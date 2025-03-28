import RPi.GPIO as GPIO
from time import sleep

GPIO.setwarnings(False)
print("GPIO Clean up")

# Front Left Motor
F_in1 = 22
F_in2 = 23
F_en_a = 12
# Front Right Motor
F_in3 = 24
F_in4 = 25
F_en_b = 18

# Back Left Motor
B_in1 = 17
B_in2 = 27
B_en_a = 19
# Back Right Motor
B_in3 = 5
B_in4 = 6
B_en_b = 13


GPIO.setmode(GPIO.BCM)
GPIO.setup(F_in1,GPIO.OUT)
GPIO.setup(F_in2,GPIO.OUT)
GPIO.setup(F_en_a,GPIO.OUT)
GPIO.setup(B_in1,GPIO.OUT)
GPIO.setup(B_in2,GPIO.OUT)
GPIO.setup(B_en_a,GPIO.OUT)

GPIO.setup(F_in3,GPIO.OUT)
GPIO.setup(F_in4,GPIO.OUT)
GPIO.setup(F_en_b,GPIO.OUT)
GPIO.setup(B_in3,GPIO.OUT)
GPIO.setup(B_in4,GPIO.OUT)
GPIO.setup(B_en_b,GPIO.OUT)

# Initialize PWM with higher frequency (100Hz is default, try 500-1000Hz)
pwm_freq = 1000  # Increased frequency for smoother control
r = GPIO.PWM(F_en_a, pwm_freq)
s = GPIO.PWM(F_en_b, pwm_freq)
q = GPIO.PWM(B_en_a, pwm_freq)
p = GPIO.PWM(B_en_b, pwm_freq)

# Start PWM at maximum speed (100% duty cycle)
r.start(100)
s.start(100)
p.start(100)
q.start(100)

class Motor_test:
    def __init__(self):
        self.current_speed = 100  # Track current speed
        
    def set_speed(self, speed):
        """Set speed for all motors (0-100)"""
        if 0 <= speed <= 100:
            self.current_speed = speed
            r.ChangeDutyCycle(speed)
            s.ChangeDutyCycle(speed)
            p.ChangeDutyCycle(speed)
            q.ChangeDutyCycle(speed)
    
    def forward(self, sec):
        # Front left and back left motors forward
        GPIO.output(F_in1, GPIO.LOW)
        GPIO.output(F_in2, GPIO.HIGH)
        GPIO.output(B_in1, GPIO.LOW)
        GPIO.output(B_in2, GPIO.HIGH)
        
        # Front right and back right motors forward
        GPIO.output(F_in4, GPIO.HIGH)
        GPIO.output(F_in3, GPIO.LOW)
        GPIO.output(B_in4, GPIO.HIGH)
        GPIO.output(B_in3, GPIO.LOW)
        
        sleep(sec)
    
    def reverse(self, sec):
        # Front left and back left motors reverse
        GPIO.output(F_in1, GPIO.HIGH)
        GPIO.output(F_in2, GPIO.LOW)
        GPIO.output(B_in1, GPIO.HIGH)
        GPIO.output(B_in2, GPIO.LOW)
        
        # Front right and back right motors reverse
        GPIO.output(F_in4, GPIO.LOW)
        GPIO.output(F_in3, GPIO.HIGH)
        GPIO.output(B_in4, GPIO.LOW)
        GPIO.output(B_in3, GPIO.HIGH)
        
        sleep(sec)
    
    def turn_left(self, sec):
        # Left motors reverse
        GPIO.output(F_in1, GPIO.HIGH)
        GPIO.output(F_in2, GPIO.LOW)
        GPIO.output(B_in1, GPIO.HIGH)
        GPIO.output(B_in2, GPIO.LOW)
        
        # Right motors forward
        GPIO.output(F_in4, GPIO.HIGH)
        GPIO.output(F_in3, GPIO.LOW)
        GPIO.output(B_in4, GPIO.HIGH)
        GPIO.output(B_in3, GPIO.LOW)
        
        sleep(sec)
    
    def stop(self, sec=0):
        # Stop all motors
        GPIO.output(F_in1, GPIO.LOW)
        GPIO.output(F_in2, GPIO.LOW)
        GPIO.output(B_in1, GPIO.LOW)
        GPIO.output(B_in2, GPIO.LOW)
        GPIO.output(F_in4, GPIO.LOW)
        GPIO.output(F_in3, GPIO.LOW)
        GPIO.output(B_in4, GPIO.LOW)
        GPIO.output(B_in3, GPIO.LOW)
        
        if sec > 0:
            sleep(sec)

if __name__ == '__main__':
    motor = Motor_test()
    try:
        print('Moving forward at full speed')
        motor.forward(3)
        print('Moving backward at full speed')
        motor.reverse(2)
        print('Sharp left turn')
        motor.turn_left(1)
        print('Moving forward at full speed')
        motor.forward(3)
        print('Stopping')
        motor.stop()
        
    except KeyboardInterrupt:
        GPIO.cleanup()
        print("GPIO Clean up")