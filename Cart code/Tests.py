from main_control import main_control
import time

ctrl = main_control()


def test_ultrasonic_servo():
    try:
        while True:
            for direction in ["left", "center", "right"]:
                dist = ctrl.measure_at(direction)
                print(f"{direction.capitalize()} : {dist} cm")
                time.sleep(0.5)
    except KeyboardInterrupt:
        ctrl.cleanup()


def test_follow_line():
    print("Test : Suivi de ligne")
    try:
        while True:
            ctrl.follow_line()
            time.sleep(0.2)
    except KeyboardInterrupt:
        ctrl.cleanup()
        print("Arrêt manuel")


def test_obstacle_avoidance():
    print("Test : Évitement d'obstacles")
    try:
        while True:
            left = ctrl.measure_at("left")
            center = ctrl.measure_at("center")
            right = ctrl.measure_at("right")

            print(f"Gauche: {left} | Centre: {center} | Droite: {right}")

            if center < 20:
                ctrl.avoid_obstacle(left, right)
            else:
                ctrl.follow_line()

            time.sleep(1)
    except KeyboardInterrupt:
        ctrl.cleanup()
        print("Arrêt manuel")


if __name__ == '__main__':
   
    print("1 - Test Ultrason + Servo")
    test_ultrasonic_servo()

    """  print("=== Menu de test ===")
        print("1 - Test Ultrason + Servo")
        print("2 - Test Suivi de ligne")
        print("3 - Test Complet (suivi + obstacle)")
        
        choix = input("Choix : ")

        if choix == "1":
            test_ultrasonic_servo()
        elif choix == "2":
            test_follow_line()
        elif choix == "3":
            test_obstacle_avoidance()
        else:
            print("Choix invalide") """
