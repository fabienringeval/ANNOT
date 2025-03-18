
# ANNOT' V1.0

Online tool for annotating affective behaviours from videos collected within the THERADIA project, aimed at supporting individuals experiencing cognitive difficulties during digital therapy sessions with a virtual assistant. The annotated data is intended for training the assistant’s emotion recognition and learning system. This tool was initiated by the company Viadialog for audio data, and was further extended to process video data by the Laboratoire d'Informatique de Grenoble, with the technical support of the company SBT Human Matters. This tool is partially functionnal - buttons are not yet fully operational and data must be written using a mysql connector.

**Table of Contents**

- [ANNOT'](#annot)
- [Backend](#backend)
  - [Installation](#installation)
    - [Database](#database)
  - [Initialisation](#initialisation)
  - [Run](#run)
  - [Deployment](#deployment)
- [Frontend](#frontend)
  - [Installation](#installation-1)
  - [Run](#run-1)
  - [Deployment](#deployment-1)
- [End](#end)
  
## Backend
http://localhost:5000/

### Installation

- Clone project
```
 git clone https://gitlab.com/theradia/video-annotation
```
- Install Python 3.9
```
https://www.python.org/downloads/```
```
- Open your shell and make sure pip is reconized as a command.
```
pip --version
```
- Use virtual environment
```
python3 -m venv /path/to/new/virtual/environment
```
- Go to  /api
```
 pip install -r requirement.txt
 ```

#### Database

- Install docker
```
https://www.docker.com/get-started/
```
- Download the MariaDB docker image from the online repository.
```
docker pull mariadb
```
- Start a new MariaDB container using this Docker image.
```
docker run -d --name yourDbName -p 3306:3306 -e
"MYSQL_ROOT_PASSWORD=yourPassword" mariadb
```
- Execute the following instructions

```bash
docker exec -it yourDbName mariadb bash
mysql -u root -p
CREATE DATABASE yourDbName;
SHOW DATABASES;
USE yourDbName;
SHOW TABLES;
SELECT * FROM users;
```
Once everything is connected, you must send a POST request to install the tables and create the first admin user with email admin@internal.local and password admin. This user will have the rights to create and configure annotation campaigns, users. This installation will then generate a lock.lock file which will prevent the database from being overwritten. If you still want to delete the tables, you will need to delete this file.
```
curl -X POST http://localhost:5000/v1/install
```

### Initialisation

There are two scripts that allow you to insert data into the database:

the `videoInsertPerDir` script will insert the campaigns present in the ‘folder_path’ folder into the database. It will create one campaign per folder if it contains videos in mp4 format. He will also create all the configurations around the campaigns such as the dimensions, the positive and negative categories with their different labels, the time intervals, the slider configurations... He will also assign to these annotation campaigns the administrator who will be able to in turn create users and assign them to campaigns.

The `videosInsert` script inserts all the videos present in a folder into a single campaign named campaignAuto. It will also create the necessary configurations.
The third option is to create everything: dimensions, labels, categories, time configuration, slider… Then create the campaign



### Run

You must configure the environment variables necessary for the proper functioning of the backend
```bash
export DATABASE_PORT=3306
export DATABASE_HOST=localhost
export DATABASE_NAME=yourName
export DATABASE_PASSWORD=yourPassword
export DATABASE_USERNAME=yourUsername
export FLASK_APP=api/run.py
export FLASK_ENV=development
export JWT_SECRET_KEY=mysecret;
export VIDEOS_BASE_PATH=yourPath
export HTTPS=true
```
The videos_path variable is where your videos will be stored. HTTPS must be at 'true'

Finally, you can run with the following command:
```
/usr/local/bin/python3.9 -m flask run
```
### Deployment
- Install pm2
```
https://pm2.keymetrics.io/
```
Configure in pm2 your python path and your environment variables

- start server:
```
 pm2 start ecosystem.config.js --env production
 ```
- stop server
```
 pm2 stop ecosystem.config.js
 ```

## Frontend
http://localhost:4200/

### Installation
- Install Node Js v14.16.1:
```
https://nodejs.org/fr/download/
 ```
- Open your shell and make sure npm is reconized as a command.
- Install Angular CLI version 10.2.4:
```
npm install -g @angular/cli@10.2.4
 ```
- Go to /front and install npm modules
 ```
npm install
 ```

### Run
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Place the contents of /dist in the /www directory of your server

## End
