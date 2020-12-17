# Raspberry Pi Client for Device Kiosk


Client-side code built in Angular for a Raspberry Pi Startec REGISTRO Device Kiosk. 

A REGISTRO Kiosk is a QR ID data parser (scanner) and storage server for the contact tracing system. The QR scanner retrieves customer information by scanning a QR code customers provide. This information is then stored by the device server into a database in memory. Data can be easily accessed and downloaded (remotely) from the device through the data administration portal (included in this codebase) for use in contact tracing.

## STARTEC REGISTRO

Startec REGISTRO is an open-source COVID case contact tracing system for small and medium sized establishments and organizations, created by Startec Innovations, a technology adoption and innovation consultancy firm based in the Philippines. 

Learn more about Startec and REGISTRO [here](https://www.facebook.com/startec.ideators).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

Device Fabrication Instructions
-------
A full guide in how to build this device can be found [here](https://hackaday.io/project/176352/instructions)

Follow us on [Hackaday](https://hackaday.io/StartecInnovations) and [Facebook](https://www.facebook.com/startec.ideators) for Updates and Important Info

Development
-------
This build was developed for a *Raspberry Pi 3 B+* on *Raspbian Buster*. It will also work for the Raspberry Pi Zero W and Raspberry Pi 4 boards.

This code requires a functional device server. To learn more how to setup the server and the Raspberry Pi environment, please check out the README for the server code repository [here](https://github.com/startec-official/registro-raspi-server).

### Device Deployment
Once server and environment is set up. You can deploy to device by running ng `build --prod` inside the folder from the terminal, and copying the content of the generated project folder (usually `dist/<project-name>`) to `/var/www/html` in the Raspberry Pi.

Contributions
-------
Please feel free to drop as an email for potential contributions.
Contact Us through [startec.innovations@gmail.com](mailto:startec.innovations@gmail.com)

LICENSE and Use
-------
Please refer to the `LICENSE.md` file for more information.

This project is covered by the MIT License. © 2020 | Startec Innovations
