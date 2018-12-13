import csv
import celery
from flask import request, make_response,send_file, jsonify

from . import app, api
from .resources import *
from .models import Enrolment,EnrolmentSchema


api.add_resource(CourseAPI, '/api/v1/course/<id>')
api.add_resource(CourseListAPI, '/api/v1/courses')
api.add_resource(StudentAPI, '/api/v1/student/<id>')
api.add_resource(StudentListAPI, '/api/v1/students')
api.add_resource(EnrolmentAPI, '/api/v1/enrolment')
api.add_resource(EnrolmentListAPI, '/api/v1/enrolments')


from .models import StudentSchema

import os

basedir = os.path.abspath(os.path.dirname(__file__))

@celery.task
def create_csv():
    enrolments = Enrolment.get_all()
    enrolments_schema = EnrolmentSchema(many=True)
    enrolments = enrolments_schema.dump(enrolments).data

    myFile = open('enrolments.csv', 'w')  
    with csv_file:  
        fields = ['student_name', 'course_name','year']
        writer = csv.DictWriter(csv_file, fieldnames=fields)    
        writer.writeheader()

        for entry in enrolments:
            writer.writerow(entry)
    
            
 

@app.route('/enrolments_csv', methods=['POST']) 
def generate_csv():
    create_csv.delay()

    basedir = os.path.abspath(os.path.dirname(__file__))
    file_path=os.path.join(basedir[:-3], 'enrolments.csv')

    return jsonify({'message':'File generated at '+file_path})

  


