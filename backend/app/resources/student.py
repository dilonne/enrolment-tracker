from flask import request
from flask_restful import Api, Resource, reqparse
from ..models import Student, StudentSchema
from ..import db

students_schema = StudentSchema(many=True)
student_schema = StudentSchema()


class StudentAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type = str, location = 'json')
        self.reqparse.add_argument('id', type = str, location = 'json')
        
        super(StudentAPI, self).__init__()


    def get(self, id):
        print('++++++++++ GET ++++++++',id)

        student = Student.find_by_national_id(id)
        if student:
            student = student_schema.dump(student).data
            return {'data': student}, 200
       
        return {'message': 'student not found'}, 404

        



    def put(self, id):
        data = request.get_json(force=True)

        if not id:
               return {'message': 'No input data provided'}, 400
       
        student = Student.find_by_national_id(id)
        if not student:
            return {'message': 'Student does not exist'}, 400
        student.name = data['name']
        student.national_id = data['id']
        db.session.commit()

        return { "message": 'success'}, 200


    def delete(self, id):
        print('++++++++++++++++++',id)
        if not id:
            return {'message': 'No input data provided'}, 400
        student = Student.find_by_national_id(id).delete()
        return {"sucess":1, "message": 'Student successfully deleted'}, 200


    def post(self, id):
        print('+++++++++++++++++++++++++ IN')
        data = request.get_json(force=True)
        if not data:
               return {'message': 'No input data provided'}, 400
      
        student = Student.find_by_national_id(id)
        if student:
            return {'message': 'Student already exists'}, 400
        student = Student(name=data['name'], national_id=data['id'])
        student.save()

        return { "message": 'Student successfully saved'}, 201



class StudentListAPI(Resource):
    def get(self):
        students = Student.get_all()
        students = students_schema.dump(students).data
        return {'data': students}, 200


