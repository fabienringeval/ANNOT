ng build -c recette
ssh root@10.140.0.174 -p22 "rm -rf /var/www/vianote/*"
scp -r dist/annot-frontend/* root@10.140.0.174:/var/www/vianote
