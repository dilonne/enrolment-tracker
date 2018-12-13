import Dashboard from "views/Dashboard/Dashboard";
import Student from "views/Student/Student";
import StudentList from "views/StudentList/StudentList";
import CourseList from "views/CourseList/CourseList";
import Enrolment from "views/Enrolment/Enrolment";
import EnrolmentList from "views/EnrolmentList/EnrolmentList";

import Course from "views/Course/Course";


const dashboardRoutes = [

  { path: "/enrolments", 
  name: "Enrolments", 
  icon: "pe-7s-note2",
  component: EnrolmentList
    },

  {
    path: "/student",
    name: "New Student",
    icon: "pe-7s-user",
    component: Student
  },

  {
    path: "/course",
    name: "New Course",
    component: Course
  },
  
  { path: "/enrolment", 
    name: "Enrolment", 
    icon: "pe-7s-note2",
    component: Enrolment
  },


  {
    path: "/students",
    name: "Manage Students",
    icon: "pe-7s-user",
    component: StudentList
  },
  {
    path: "/courses",
    name: "Manage Courses",
    icon: "pe-7s-news-paper",
    component: CourseList
  },





  { redirect: true, path: "/", to: "/enrolments", name: "Enrolments" }
];

export default dashboardRoutes;
