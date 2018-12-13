
## Get started:

### Stack Used
* ReactJS + Boostrap
* Flask
* SQlite
* Redis

### Back end:
1. Clone the repo and cd into backend/
2. Create a virtual environment and install requirements
3. Run python run.py to start the flask server
4. [Install](https://redis.io/download) redis and start the redis server in a separate terminal
5. Open another terminal and start a celery worker from the virtual environment.

        celery worker -A app.celery --loglevel=info

### Front end
6. cd into client/
7. Run npm install 
8. Run npm start
9. Visit localhost://3000 and enjoy!
