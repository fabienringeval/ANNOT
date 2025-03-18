1.	Install Python 3.6 minimum.
2.	Install pip.
3.	Preferably use a virtual environment.
4.	Run pip install -r requirements.txt to install dependencies.

Using the FLASK application:
We manage the application using PM2, a process manager (https://pm2.keymetrics.io/).

The file ecosystem.config.js.example is an example configuration file.

Launch the application manager using:

pm2 start ecosystem.config.js

For deployment options, refer to the PM2 documentation.

Initialization:
After starting the server:

Send a request via Postman to URL:Port/v1/install to set up the databases and create the initial user.
The installation will create a lock.lock file on the server to prevent database overwrites.

The installer’s response returns the first user account details as JSON, including information for the account admin@internal.local.
