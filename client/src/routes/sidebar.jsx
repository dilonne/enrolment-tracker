import Dashboard from "views/Dashboard/Dashboard";
import Student from "views/Student/Student";
import StudentList from "views/StudentList/StudentList";
import CourseList from "views/CourseList/CourseList";
import Enrolment from "views/Enrolment/Enrolment";
import Course from "views/Course/Course";


const sidebBarRoutes = [

  
  { path: "/enrolments", 
    name: "Enrolments", 
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
];

export default sidebBarRoutes;
