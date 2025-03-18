ng build -c development
ssh root@10.140.0.37 -p22 "rm -rf /var/www/ano-aca/*"
scp -r dist/annot-frontend/* root@10.140.0.37:/var/www/ano-aca
