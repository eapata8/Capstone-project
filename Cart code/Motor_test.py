import RPi.GPIO as GPIO
from time import sleep

GPIO.setwarnings(False)
GPIO.cleanup()
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
        
    def setMotorModel(self, fl_speed, fr_speed, bl_speed, br_speed):
        # Front Left Motor
        if fl_speed > 0:
            GPIO.output(F_in1, GPIO.LOW)
            GPIO.output(F_in2, GPIO.HIGH)
            r.ChangeDutyCycle(abs(fl_speed) if abs(fl_speed) <= 100 else 100)
        elif fl_speed < 0:
            GPIO.output(F_in1, GPIO.HIGH)
            GPIO.output(F_in2, GPIO.LOW)
            r.ChangeDutyCycle(abs(fl_speed) if abs(fl_speed) <= 100 else 100)
        else:
            GPIO.output(F_in1, GPIO.LOW)
            GPIO.output(F_in2, GPIO.LOW)
            r.ChangeDutyCycle(0)

        # Front Right Motor
        if fr_speed > 0:
            GPIO.output(F_in3, GPIO.LOW)
            GPIO.output(F_in4, GPIO.HIGH)
            s.ChangeDutyCycle(abs(fr_speed) if abs(fr_speed) <= 100 else 100)
        elif fr_speed < 0:
            GPIO.output(F_in3, GPIO.HIGH)
            GPIO.output(F_in4, GPIO.LOW)
            s.ChangeDutyCycle(abs(fr_speed) if abs(fr_speed) <= 100 else 100)
        else:
            GPIO.output(F_in3, GPIO.LOW)
            GPIO.output(F_in4, GPIO.LOW)
            s.ChangeDutyCycle(0)

        # Back Left Motor
        if bl_speed > 0:
            GPIO.output(B_in1, GPIO.LOW)
            GPIO.output(B_in2, GPIO.HIGH)
            q.ChangeDutyCycle(abs(bl_speed) if abs(bl_speed) <= 100 else 100)
        elif bl_speed < 0:
            GPIO.output(B_in1, GPIO.HIGH)
            GPIO.output(B_in2, GPIO.LOW)
            q.ChangeDutyCycle(abs(bl_speed) if abs(bl_speed) <= 100 else 100)
        else:
            GPIO.output(B_in1, GPIO.LOW)
            GPIO.output(B_in2, GPIO.LOW)
            q.ChangeDutyCycle(0)

        # Back Right Motor
        if br_speed > 0:
            GPIO.output(B_in3, GPIO.LOW)
            GPIO.output(B_in4, GPIO.HIGH)
            p.ChangeDutyCycle(abs(br_speed) if abs(br_speed) <= 100 else 100)
        elif br_speed < 0:
            GPIO.output(B_in3, GPIO.HIGH)
            GPIO.output(B_in4, GPIO.LOW)
            p.ChangeDutyCycle(abs(br_speed) if abs(br_speed) <= 100 else 100)
        else:
            GPIO.output(B_in3, GPIO.LOW)
            GPIO.output(B_in4, GPIO.LOW)
            p.ChangeDutyCycle(0)
    
    def forward(self, speed=100):
        self.setMotorModel(speed, speed, speed, speed)

    def reverse(self, speed=100):
        self.setMotorModel(-speed, -speed, -speed, -speed)

    def turn_left(self, speed=100):
        self.setMotorModel(-speed, speed, -speed, speed)

    def turn_right(self, speed=100):
        self.setMotorModel(speed, -speed, speed, -speed)

    def sharp_left(self, speed=100):
        self.setMotorModel(-speed * 2, speed * 2, -speed * 2, speed * 2)

    def sharp_right(self, speed=100):
        self.setMotorModel(speed * 2, -speed * 2, speed * 2, -speed * 2)

    def stop(self):
        self.setMotorModel(0, 0, 0, 0)

if __name__ == '__main__':
    motor = Motor_test()
    try:
        # Forward at moderate speed (60% power)
        print("Moving forward (60% speed)")
        motor.setMotorModel(60, 60, 60, 60)  # All wheels forward
        sleep(2)

        # Sharp reverse (full speed)
        print("Reversing fast (100% speed)")
        motor.setMotorModel(-100, -100, -100, -100)  # All wheels backward
        sleep(1.5)

        # Pivot turn left (left wheels back, right wheels forward)
        print("Pivot turning left")
        motor.setMotorModel(-80, 80, -80, 80)  # Left wheels reverse, right wheels forward
        sleep(1)

        # Smooth right curve (left wheels faster forward)
        print("Gentle right curve")
        motor.setMotorModel(70, 30, 70, 30)  # Left wheels faster
        sleep(2)

        # Emergency stop
        print("Full stop")
        motor.stop()
        
    except KeyboardInterrupt:
        GPIO.cleanup()
        print("GPIO Clean up")