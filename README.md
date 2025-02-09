# React + Vite

# Deployment over AWS

- Create account on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-16-171-172-89.eu-north-1.compute.amazonaws.com
- Install Node (Same version on which your project is running)
- git clone
- Frontend
    - Install dependecies
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build filer) to /var/www/html
        -sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance(in our case it is aws ec2 instances)
        - Instances > Instance ID > Security > Security groups > Edit Inbound Rules > Add rule >Save rules

- Backend
    - create .env file on your instance and set your variables
    - allow ec2 instance's public IP on mongo db server
    - npm install pm2 -g
    - pm2 start npm --name "<customName>" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - sudo nginx -t (If the syntax is ok & test is successfult)
    - sudo systemctl restart nginx
    - modify the base url in frontend to "/api"



# Nginx Config:

    Frontend = http://16.171.172.89/
    Backend = http://16.171.172.89:7777

    Domain name = devtinder.com => 16.171.172.89

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api


    nginx config: 

    server_name 16.171.172.89;

    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
