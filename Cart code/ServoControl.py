from gpiozero import AngularServo
import time

class ServoControl:
    def __init__(self, pin):
        self.servo = AngularServo(
            pin,
            min_angle=0,
            max_angle=180,
            min_pulse_width=0.5/1000,
            max_pulse_width=2.5/1000
        )

    def set_position(self, direction):
        if direction == "left":
            self.servo.angle = 30   # 0 extrême gauche
        elif direction == "center":
            self.servo.angle = 90
        elif direction == "right":
            self.servo.angle = 150  # 180 pour extrême droite
        else:
            return
        time.sleep(0.4)  # laisser le temps au servo de se stabiliser
