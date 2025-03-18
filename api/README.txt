1) Installer Python 3.6 Min
2) Installer pip
3) De préférence utiliser un environnement Virtuel
4) pip install -r requirements.txt pour nstaller les dependances

Utilisation de l'application FLASK :
Nous utilisons l'application au travers de l'application PM2 qui est un gestionnaire de process (https://pm2.keymetrics.io/)

le fichier ecosystem.config.js.example est un exemple de fichier de config.

le gestionnaire se lance de la manière suivant : pm2 start ecosystem.config.js 
Pour les options de deploiement, regarde la documentation pm2

Initialisation : 
Une fois le serveur lançé

URL:Port/v1/install via Postman permettra d'installer les bases de données et de créer le premier utilisateur
L'installation generera sur le serveur un fichier lock.lock qui empechera l'ecrasement de la db

La réponse de l'installeur renvoi le premier compte utilisteurs sous forme d'un json contenant les informations du compte admin@internal.local
