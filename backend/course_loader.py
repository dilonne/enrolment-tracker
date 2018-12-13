from app.models import  Course

course1 = Course(code="PY1",name='Flask Framework',description='A python Micro Framework')
course1.save()

course2 = Course(code="PY2",name='Django Framework', description='A python Macro Framework')
course2.save()

course3 = Course(code="JS1",name='ReactJS',description='A Javascript UI Framework')
course3.save()