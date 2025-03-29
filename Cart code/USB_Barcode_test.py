import keyboard
import requests

def scan_barcode():
    print("Scan a barcode...")
    barcode = keyboard.read_event(suppress=True).name  # Read one keystroke
    scanned_code = ""
    
    while barcode != "enter":  # Most scanners send an "Enter" after scanning
        scanned_code += barcode
        barcode = keyboard.read_event(suppress=True).name
    
    print(f"Scanned Barcode: {scanned_code}")
    return scanned_code

def lookup_product(barcode):
    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    response = requests.get(url).json()

    if response.get("status") == 1:
        product_name = response["product"].get("product_name", "Unknown Product")
        print(f"Product: {product_name}")
        return product_name
    else:
        print("Product not found!")
        return None

if __name__ == '__main__':
    while True:
        barcode = print(input("Scan a barcode right now:"))

        lookup_product(barcode)
