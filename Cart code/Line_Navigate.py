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
        self.LMR=0x00
        if IR01_sensor.value == True:
            self.LMR=(self.LMR | 4)
        if IR02_sensor.value == True:
            self.LMR=(self.LMR | 2)
        if IR03_sensor.value == True:
            self.LMR=(self.LMR | 1)
            
        if self.LMR==2:
            PWM.setMotorModel(600,600,600,600)
        elif self.LMR==4:
            PWM.setMotorModel(-1000,-1000,2000,2000)
        elif self.LMR==6:
            PWM.setMotorModel(-1500,-1500,3500,3500)
        elif self.LMR==1:
            PWM.setMotorModel(2000,2000,-1000,-1000)
        elif self.LMR==3:
            PWM.setMotorModel(3500,3500,-1500,-1500)
        elif self.LMR==7 or self.LMR == 0:
            #pass
            PWM.setMotorModel(0,0,0,0)
    
    def avoid_obstacle(self):
        # Check left and right
        self.pwm_S.setServoPwm('0', 30)
        time.sleep(1)
        left_distance = self.get_distance()
        
        self.pwm_S.setServoPwm('0', 150)
        time.sleep(1)
        right_distance = self.get_distance()
        
        self.pwm_S.setServoPwm('0', 90) #Look straight
        self.PWM.setMotorModel(-500, -500, -500, -500)
        time.sleep(0.8) 
        
        # Turn in the clearer direction
        if left_distance >= right_distance:
            self.PWM.setMotorModel(-500, -500, 1500, 1500)  # Turn left
            time.sleep(0.8)
            self.PWM.setMotorModel(600, 600, 600, 600)
            time.sleep(0.8)
            self.PWM.setMotorModel(4000, 4000, -2000, -2000)
        else:
            self.PWM.setMotorModel(1500, 1500, -500, -500)  # Turn right
            time.sleep(0.8)
            self.PWM.setMotorModel(600, 600, 600, 600)
            time.sleep(0.8)
            self.PWM.setMotorModel(-2000, -2000, 4000, 4000)  # Turn left
        
        time.sleep(0.3)
        
        # Move forward until you reach line
        while not (IR01_sensor.value or IR02_sensor.value or IR03_sensor.value):
            self.PWM.setMotorModel(450, 450, 450, 450)  # Forward
			
            if left_distance >= right_distance:
                self.PWM.setMotorModel(1500, 1500, -500, -500)  # Turn right
            else:
                self.PWM.setMotorModel(-500, -500, 1500, 1500)  # Turn left
		
        self.follow_line()
        
    def test_Ultrasonic(self):
        try:
            print("Program is starting ...")
            while True:
                distance = self.get_distance()  # Get the distance measurement in centimeters
            if distance is not None:
                print(f"Ultrasonic distance: {distance}cm")  # Print the distance measurement
            time.sleep(0.5)  # Wait for 0.5 seconds
        except KeyboardInterrupt:  # Handle keyboard interrupt (Ctrl+C)
            print("\nEnd of program")  # Print an end message
            
    def run(self):
        while True:
            distance = self.get_distance()
            print(f"Ultrasonic distance: {distance}cm")
            
            if distance < 15:  # Obstacle detected
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
        robot.pwm_S.setServoPwm('1', 95) #Look straight
