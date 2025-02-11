import time
from Motor import *
from gpiozero import LineSensor, DistanceSensor
from servo import *
from PCA9685 import PCA9685

# Line sensor pins
IR01 = 14
IR02 = 15
IR03 = 23
IR01_sensor = LineSensor(IR01)
IR02_sensor = LineSensor(IR02)
IR03_sensor = LineSensor(IR03)

# Ultrasonic sensor pins
trigger_pin = 27
echo_pin = 22
sensor = DistanceSensor(echo=echo_pin, trigger=trigger_pin, max_distance=3)

class Line_Navigate:
    def __init__(self):
        self.PWM = Motor()
        self.pwm_S = Servo()
    
    def get_distance(self):
        return int(sensor.distance * 100)
    
    def follow_line(self):
        LMR = 0x00
        if IR01_sensor.value:
            LMR |= 4
        if IR02_sensor.value:
            LMR |= 2
        if IR03_sensor.value:
            LMR |= 1
        
        if LMR == 2:
            self.PWM.setMotorModel(600, 600, 600, 600)  # Move forward
        elif LMR == 4:
            self.PWM.setMotorModel(-1500, -1500, 2500, 2500)  # Turn left
        elif LMR == 6:
            self.PWM.setMotorModel(-2000, -2000, 4000, 4000)  # Sharp left
        elif LMR == 1:
            self.PWM.setMotorModel(2500, 2500, -1500, -1500)  # Turn right
        elif LMR == 3:
            self.PWM.setMotorModel(4000, 4000, -2000, -2000)  # Sharp right
        elif LMR == 7:
            self.PWM.setMotorModel(0, 0, 0, 0)  # Stop (no line detected)
    
    def avoid_obstacle(self):
        self.PWM.setMotorModel(-100, -100, -100, -100)  # Move backward slightly
        time.sleep(0.5)
        
        # Check left and right
        self.pwm_S.setServoPwm('0', 30)
        time.sleep(0.2)
        left_distance = self.get_distance()
        
        self.pwm_S.setServoPwm('0', 150)
        time.sleep(0.2)
        right_distance = self.get_distance()
        
        self.pwm_S.setServoPwm('0', 90) #Look straight
        
        # Turn in the clearer direction
        if left_distance > right_distance:
            self.PWM.setMotorModel(-1500, -1500, 1500, 1500)  # Turn left
        else:
            self.PWM.setMotorModel(1500, 1500, -1500, -1500)  # Turn right
        time.sleep(1)
        
        # Move forward to bypass the obstacle
        self.PWM.setMotorModel(1000, 1000, 1000, 1000)
        time.sleep(2)
        
        # Rotate to find the line again
        while not (IR01_sensor.value or IR02_sensor.value or IR03_sensor.value):
            self.PWM.setMotorModel(1000, -1000, 1000, -1000)  # Rotate
            time.sleep(0.2)
        
    def run(self):
        while True:
            if self.get_distance() < 10:  # Obstacle detected
                self.PWM.setMotorModel(0, 0, 0, 0)
                self.avoid_obstacle()
            else:
                self.follow_line()
            time.sleep(0.1)

if __name__ == '__main__':
    robot = Line_Navigate()
    try:
        robot.run()
    except KeyboardInterrupt:
        robot.PWM.setMotorModel(0, 0, 0, 0) #Stop robot completely
        robot.pwm_S.setServoPwm('0', 90) #Look straight
