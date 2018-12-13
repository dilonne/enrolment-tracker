import datetime
from datetime import date

from . import db, ma


class Enrolment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String(200))
    student_name = db.Column(db.Integer, db.ForeignKey('student.name'))
    course_name = db.Column(db.String(200), db.ForeignKey('course.name'))

    
    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Enrolment.query.all()

    def __repr__(self):
        return "<Enrolment: {} {} >".format(self.student_name, self.year)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    national_id = db.Column(db.String(15))

    enrolled_courses = db.relationship('Enrolment', backref='student', lazy='dynamic')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_national_id(self, id):
        return self.query.filter_by(national_id=id).first()

        

    @staticmethod
    def get_all():
        return Student.query.all()

    def __repr__(self):
        return "<Student: {}>".format(self.name)



class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    description = db.Column(db.String(200))
    code = db.Column(db.String(10))

    enrolled_students = db.relationship('Enrolment', backref='course', lazy='dynamic')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_code(self, code):
        return self.query.filter_by(code=code).first()

    @staticmethod
    def get_all():
        return Course.query.all()

    def __repr__(self):
        return "<Course: {} {}>".format(self.id, self.name)


    
    
class StudentSchema(ma.ModelSchema):
    class Meta:
        fields = ('id','name','national_id')
        model = Student


class CourseSchema(ma.ModelSchema):
    class Meta:
        fields = ('id','code','name','description')
        model = Course

class EnrolmentSchema(ma.ModelSchema):
    class Meta:
        fields = ('id','student_name','course_name','year')
        model = Enrolment
