from flask import request
from flask_restful import Api, Resource, reqparse
from ..models import Course, CourseSchema
from ..import db


courses_schema = CourseSchema(many=True)
course_schema = CourseSchema()


class CourseAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('name', type = str, location = 'json')
        self.reqparse.add_argument('description', type = str, location = 'json')
        self.reqparse.add_argument('code', type = str, location = 'json')

        super(CourseAPI, self).__init__()


    def get(self, id):
        print('++++++++++ GET ++++++++',id)

        course = Course.find_by_code(id)
        if course:
            course = course_schema.dump(course).data
            return {'data': course}, 200
       
        return {'message': 'course not found'}, 404

        

    def put(self, id):
        data = request.get_json(force=True)

        if not id:
               return {'message': 'No input data provided'}, 400
       
        course = Course.find_by_code(id)

        if not id:
            return {'message': 'Course does not exist'}, 400
        course.name = data['name']
        course.description = data['description']
        db.session.commit()
        return { "message": 'success'}, 200


    def delete(self, id):
        print('++++++++++++++++++',id)
        if not id:
            return {'message': 'No input data provided'}, 400
        course = Course.find_by_code(id).delete()
        return {"sucess":1, "message": 'Course successfully deleted'}, 200


    def post(self, id):
        data = request.get_json(force=True)
        if not data:
               return {'message': 'No input data provided'}, 400
      
        course = Course.find_by_code(id)
        if course:
            return {'message': 'Course already exists'}, 400
        course = Course(name=data['name'], description=data['description'],
                                code=data['code'])
        course.save()

        return { "message": 'Course successfully saved'}, 201



class CourseListAPI(Resource):
    def get(self):
        courses = Course.get_all()
        courses = courses_schema.dump(courses).data
        return {'data': courses}, 200


