# Mushroom Monitoring System

A comprehensive IoT-based solution for monitoring and automating mushroom cultivation. This system integrates a mobile application for real-time monitoring and control with custom firmware for ESP32 sensors, robotic arms, and camera modules.

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Mobile Application](#mobile-application)
  - [Features](#features)
  - [Screens](#screens)
  - [Getting Started](#getting-started-mobile)
- [Hardware & Firmware](#hardware--firmware)
  - [Main Controller](#main-controller)
  - [Camera Module](#camera-module)
  - [Robot Arm](#robot-arm)
- [QnA](#qna)

---

## Project Overview

The Mushroom Monitoring System is designed to help farmers optimize their yields by providing:

- Real-time environmental monitoring (Temperature, Humidity, Soil Moisture, etc.)
- Automated control of actuators (Fans, Misting, Pumps)
- Image-based disease detection or growth monitoring via ML
- Remote control of a robotic arm for automated tasks

## Repository Structure

```
├── mobile-app/          # React Native mobile application source code
├── firmware/            # ESP32 and Arduino firmware codes
│   ├── main/            # Primary sensor and actuator controller code
│   ├── camera_module/   # ESP32-CAM firmware
│   └── robotArm/        # Robotic arm control logic
└── README.md            # Project documentation
```

---

## Mobile Application

The frontend is built using **React Native** (Expo), providing a cross-platform interface for users to interact with their farm.

### Features

- **Real-time Dashboard**: View live sensor readings from the ESP32 units.
- **Remote Control**: Toggle fans, lights, and water pumps directly from the app.
- **ML Integration**: Analyze images captured by the camera module.
- **Robotic Control**: Manual or automated control interface for the robotic arm.

### Screens

- **DashboardScreen**: The main landing page displaying key metrics (Temp, Humidity, Light).
- **SensorControlsScreen**: Dedicated interface for managing connected sensors and actuators.
- **RobotArmScreen**: Controls for the robotic arm movements.
- **MLModelScreen**: Interface for viewing camera feeds or running inference on mushroom images.

### Getting Started (Mobile)

1. Navigate to the directory:

    ```bash
    cd mobile-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the app:

    ```bash
    npm start
    ```

    This will launch Metro Bundler. You can scan the QR code with the Expo Go app on your phone.

---

## Hardware & Firmware

The system relies on three main hardware components, all powered by ESP32 microcontrollers.

### 1. Main Controller

Located in `firmware/main`.

- **Purpose**: Central hub for environmental sensors and environment control.
- **Files**:
  - `main.ino`: Entry point. Setup and loop for handling data.
  - `Sensors.cpp`: Logic for reading DHT (Temp/Hum), Soil Moisture, and other sensors.
  - `Actuators.cpp`: Logic for controlling relays (for fans, pumps, etc.).
  - `FirebaseHTTP.cpp`: Handles communication with the Firebase backend to sync data with the mobile app.

### 2. Camera Module

Located in `firmware/camera_module`.

- **Purpose**: Visual monitoring and image data collection for Machine Learning.
- **Hardware**: ESP32-CAM.
- **Functionality**: Captures images and uploads them to the server/storage for processing.

### 3. Robot Arm

Located in `firmware/robotArm`.

- **Purpose**: Physical manipulation (e.g., harvesting or precise watering).
- **Files**: Includes logic for servo motor control to move the arm across multiple axes.
- **Documentation**: See `firmware/robotArm/PINOUT.md` for specific wiring details.

---

## QnA

**Q: How do I connect the hardware?**
A: Refer to the `PINOUT.md` files located in each firmware subdirectory (e.g., `firmware/main/PINOUT.md` is commonly provided, or check the header files like `Sensors.h` and `Actuators.h` for pin definitions).

**Q: How does the app communicate with the hardware?**
A: The system uses Firebase as a realtime database. The ESP32 devices write sensor data to Firebase, and the Mobile App subscribes to these changes to update the UI instantly. Similarly, app actions update database states which the ESP32 listens for.

**Q: I'm getting compilation errors on the firmware. What libraries do I need?**
A: Check the top of the `.ino` and `.h` files. Common requirements include `PubSubClient` (if using MQTT), `FirebaseESP32` (or similar Firebase client), `DHT sensor library`, and `Adafruit Unified Sensor`.

**Q: Can I run the mobile app without the hardware?**
A: Yes. The UI will load, but data fields may be empty or show default values if it cannot connect to the live database backend.
