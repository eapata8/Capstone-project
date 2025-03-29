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


if __name__ == '__main__':
    SERVO_PIN = 17  
    servo = ServoControl(SERVO_PIN)

    try:
        while True:
            servo.set_position("left")
            print("Servo à gauche")
            time.sleep(1)

            servo.set_position("center")
            print("Servo au centre")
            time.sleep(1)

            servo.set_position("right")
            print("Servo à droite")
            time.sleep(1)

    except KeyboardInterrupt:
        print("\nTest du servo terminé.")