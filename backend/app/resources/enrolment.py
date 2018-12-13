from flask import request
from flask_restful import Api, Resource,reqparse

from ..models import Enrolment, EnrolmentSchema

enrolments_schema = EnrolmentSchema(many=True)
enrolment_schema = EnrolmentSchema()


class EnrolmentAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('student', type = str,required=True, location = 'json')
        self.reqparse.add_argument('course', type = str,required=True, location = 'json')
        self.reqparse.add_argument('year', type = str,required=True, location = 'json')
        super(EnrolmentAPI, self).__init__()


    def post(self):
        data = request.get_json(force=True)
        enrolment = Enrolment(student_name=data['student'],
                                course_name= data['course'], year=data['year'])

        try:
            enrolment.save()
        except:
            return {'message': " An error occured enrolling a student"}, 500

        return { "message": 'Student successfully enrolled'}, 201

    def get(self):
        return {'message':'not yet supported'}

    def put(self):
        return {'message':'not yet supported'}

    def delete(self):
        return {'message':'not yet supported'}



class EnrolmentListAPI(Resource):
    def get(self):
        enrolments = Enrolment.get_all()
        enrolments = enrolments_schema.dump(enrolments).data
        return {'data': enrolments}, 200