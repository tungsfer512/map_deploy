import requests
import json
import time

with open("./paths.json") as json_file:
    data = json.load(json_file)

x = 3
bins = [0, 1, 8, 10, 2, 6, 3, 9, 4]
data_x = data[f"{x}"]


def update_vehicle():
    for i, data_xx in enumerate(data_x):
        req = requests.put(
            url="http://localhost:9998/vehicle",
            json={"lat": data_xx["lat"], "lng": data_xx["lng"]},
            headers={"Content-Type": "application/json"},
        )
        print(req, i)
        time.sleep(10)
    time.sleep(30)
    req = requests.put(
        url=f"http://localhost:9998/bins/{bins[x]}",
        json={"weight": 0},
        headers={"Content-Type": "application/json"},
    )


update_vehicle()
