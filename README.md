
## Get started:

### Stack Used
* ReactJS + Boostrap
* Flask
* SQlite
* Redis

### Back end:
1. Clone the repo and cd into backend/
2. Create a virtual environment and install requirements
3. Seed the database with

        python course_loader.py
        python student_lader.py
        
4. Run python run.py to start the flask server
5. [Install](https://redis.io/download) redis and start the redis server in a separate terminal
6. Open another terminal and start a celery worker from the virtual environment.

        celery worker -A app.celery --loglevel=info

### Front end
7. cd into client/
8. Run npm install 
9. Run npm start
10. Visit localhost://3000 and enjoy!
