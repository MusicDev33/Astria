import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';
import { AnnouncementService } from '@services/announcement.service';
import { EnrollmentService } from '@services/enrollment.service';
import { AssignmentService } from '@services/assignment.service';
import { LayoutService } from '@services/layout.service';

import { ICourse } from '@models/course.model';
import { IAnnouncement } from '@models/announcement.model';
import { IPerson } from '@models/person.model';
import { IEnrollment } from '@models/enrollment.model';
import { IAssignment } from '@models/assignment.model';
import { ILayoutItem } from '@interfaces/layout-item.interface';
import { IQuizAnswer } from '@interfaces/quiz-answer.interface';
import { ILayout } from '@models/layout.model';

import { IResponse } from '@interfaces/response.interface';

import { shortMonths } from '@globals/time';
import { MONTHS_SHORT, getMeridiemTime } from '@globals/date';

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.scss']
})
export class InstructorCourseComponent implements OnInit, AfterViewChecked {

  @ViewChild('addQuestionBar') QuestionBar: ElementRef;

  sub: any;

  schoolID: string;
  instructorID: string;
  courseCode: string;

  course: ICourse;
  compiledIntroText: string;

  selectedNavIndex = 3;

  topNavOptions = ['Home', 'Announcements', 'Syllabus', 'Assignments', 'Students'];

  keyIsDown = false;

  announcements: IAnnouncement[] = [];
  newAnnouncementHeading = '';
  newAnnouncementDetails = '';

  selectedStudent: IPerson;
  enrollments: IEnrollment[] = [];

  loadingComponent = '';

  assignmentInfoMode = 'Empty';

  assignments: IAssignment[] = [];

  editAssignmentMode = '';
  currentEditAssignment: IAssignment;

  layoutItems: ILayoutItem[] = [];
  currentAssignmentLayout: ILayout = {
    objects: [],
    assignmentID: ''
  };

  layoutTypeMap = {
    shortanswer: '<i class="fas fa-align-left mr-2"></i> Short Answer',
    essay: '<i class="far fa-file-alt mr-2"></i> Essay',
    multichoice: '<i class="far fa-dot-circle mr-2"></i> Multi Choice',
    checkbox: '<i class="far fa-check-square mr-2"></i> Checkbox'
  };

  newLayoutItem = false;

  constructor(
    private jwtService: JwtService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private enrollmentService: EnrollmentService,
    private assignmentService: AssignmentService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    const person = this.jwtService.decodeCookieByName('jwt');

    if (person && person.personType === 'instructor') {
      this.sub = this.route.params.subscribe(params => {
         this.schoolID = params['schoolID'];
         this.instructorID = params['instructorID'];
         this.courseCode = params['courseCode'];

         this.courseService.getOneCourseForInstructor(this.schoolID, this.instructorID, this.courseCode)
          .subscribe((res: IResponse<ICourse>) => {
            if (res.success) {
              this.course = res.payload;
              this.getAnnouncements();
              this.topNavOptions[0] = this.course.name;

              this.enrollmentService.getCourseEnrollments(this.course._id).subscribe((enrollRes: IResponse<IEnrollment[]>) => {
                if (res.success) {
                  this.enrollments = enrollRes.payload;
                }
              });

              this.assignmentService.getAssignmentsForCourse(this.course._id).subscribe((assignRes: IResponse<IAssignment[]>) => {
                if (res.success) {
                  this.assignments = assignRes.payload.reverse();
                  console.log(assignRes);
                }
              });
            }
          });
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.newLayoutItem) {
      this.QuestionBar.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
      this.newLayoutItem = false;
    }
  }

  // Function is a little messy
  getInstructors(): string {
    const instructors = this.course.instructors;
    if (this.course.instructors.length === 1) {
      return `Taught by ${instructors[0]}`;
    } else if (instructors.length > 1) {
      let returnString = `Taught by ${instructors[0]}`;
      for (let i = 1; i < instructors.length; i++) {
        if (i === instructors.length - 1) {
          returnString += `, and ${instructors[i]}`;
          continue;
        }
        returnString += `, ${instructors[i]}`;
      }
      return returnString;
    }

    return 'This course seems to have no instructors. That shouldn\'t be possible. Darn.';
  }

  changeCourseIntroText(text: string) {
    this.course.introText = text;
  }

  saveCourseIntroText(text: string) {
    this.loadingComponent = this.course.name;
    this.courseService.saveCourseParam(this.schoolID, this.instructorID, this.courseCode, 'introText', text)
      .subscribe((res: any) => {
        this.loadingComponent = '';
      });
  }

  changeCourseSyllabus(text: string) {
    this.course.syllabus = text;
  }

  saveCourseSyllabus(text: string) {
    this.loadingComponent = 'Syllabus';
    this.courseService.saveCourseParam(this.schoolID, this.instructorID, this.courseCode, 'syllabus', text)
      .subscribe((res: any) => {
        this.loadingComponent = '';
      });
  }

  changeAnnouncementHeaderText(text: string) {
    this.newAnnouncementHeading = text;
  }

  changeAnnouncementDescText(text: string) {
    this.newAnnouncementDetails = text;
  }

  sendNewAnnouncement(data: string[]) {
    const user = this.jwtService.decodeCookieByName('jwt');
    this.loadingComponent = 'Announcements';
    const newAnnouncement: IAnnouncement = {
      header: data[0],
      description: data[1],
      author: user.name,
      authorID: user._id,
      courseID: this.course._id,
      time: new Date(),
      icon: this.course.icon,
      iconColor: this.course.iconColor,
      iconBgColor: this.course.iconBgColor
    };

    this.announcementService.createCourseAnnouncement(newAnnouncement).subscribe((res: any) => {
      this.loadingComponent = '';
      if (res.success) {
        this.announcements.unshift(res.announcement);
        this.newAnnouncementDetails = '';
        this.newAnnouncementHeading = '';
        return;
      }
    });
  }

  getAnnouncements() {
    this.announcementService.getCourseAnnouncements(this.course._id).subscribe((res: any) => {
      if (res.success) {
        this.announcements = res.announcements;
      }
    });
  }

  getAnnouncementDate(passedDate: Date) {
    const date = new Date(passedDate);
    let dateString = 'On ';
    dateString += `${shortMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    // dateString += ` at ${date.get}`;
    return dateString;
  }

  enrollStudent(studentID: string) {
    const newEnrollment: IEnrollment = {
      studentID: studentID,
      courseID: this.course._id,
      schoolID: this.schoolID,
      active: true,
      studentName: ''
    };

    this.enrollmentService.createCourseEnrollment(newEnrollment).subscribe((res: IResponse<IEnrollment>) => {
      if (res.success) {
        this.enrollments.unshift(res.payload);
      }
    });
  }

  createAssignment(assignment: IAssignment) {
    assignment.courseID = this.course._id;
    this.loadingComponent = 'Assignments';
    this.assignmentService.createCourseAssignment(assignment).subscribe((res: IResponse<IAssignment>) => {
      if (res.success) {
        this.assignments.unshift(res.payload);
        console.log(res);
      }
      this.loadingComponent = '';
    });
  }

  getAssignmentDueDate(date: Date) {
    const jsDate = new Date(date);
    let assignDueDate = `${MONTHS_SHORT[jsDate.getMonth()]} ${jsDate.getDate()}, ${jsDate.getFullYear()} `;

    assignDueDate += `at ${getMeridiemTime(jsDate)}`;
    return assignDueDate;
  }

  setEditAssignment(assignment: IAssignment, mode: string) {
    this.currentEditAssignment = assignment;
    this.editAssignmentMode = mode;
    this.currentAssignmentLayout.assignmentID = assignment._id;

    this.layoutService.getAssignmentLayout(assignment._id).subscribe((res: IResponse<ILayout>) => {
      if (res.success) {
        this.currentAssignmentLayout = res.payload;
        this.layoutItems = res.payload.objects;
      }
    });
  }

  resetEditAssignment() {
    this.currentEditAssignment = null;
    this.editAssignmentMode = '';
  }

  addLayoutItem() {
    const newItem: ILayoutItem = {
      type: 'shortanswer',
      question: '',
      answers: [],
      assignmentID: this.currentEditAssignment._id
    };

    this.layoutItems.push(newItem);
    this.currentAssignmentLayout.objects = this.layoutItems;
    this.newLayoutItem = true;

    const id = this.currentEditAssignment._id;
    const currentLayout = this.currentAssignmentLayout;

    this.layoutService.autosaveAssignmentLayout(currentLayout, id).subscribe((res: IResponse<ILayout>) => {
      console.log(res);
      if (res.success) {
        this.currentAssignmentLayout._id = res.payload._id;
      }
    });
  }

  addAnswerToQuestion(index: number, assignmentID: string) {
    const numAnswers = this.layoutItems[index].answers.length + 1;
    const answerText = `Choice ${numAnswers}`;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const newAnswer: IQuizAnswer = {
      answerID: alphabet[numAnswers - 1],
      text: answerText,
      isCorrect: numAnswers === 1 ? true : false,
      quizID: assignmentID,
      quizQuestionNumber: index
    };

    this.layoutItems[index].answers.push(newAnswer);
  }

  multiChoiceClicked(layoutItem: ILayoutItem) {
    layoutItem.type = 'multichoice';
    if (layoutItem.answers.length) {
      layoutItem.answers[0].isCorrect = true;
    }
  }

  removeChoice(layoutIndex: number, answerIndex: number, mode: string) {
    let changeAnswer = false;
    if (this.layoutItems[layoutIndex].answers[answerIndex].isCorrect && mode === 'multichoice') {
      changeAnswer = true;
    }
    this.layoutItems[layoutIndex].answers.splice(answerIndex, 1);

    if (changeAnswer && this.layoutItems[layoutIndex].answers.length) {
      this.layoutItems[layoutIndex].answers[0].isCorrect = true;
    }
  }

  setCorrectAnswer(layoutIndex: number, answerIndex: number, mode: string) {
    if (mode === 'multichoice') {
      for (const answer of this.layoutItems[layoutIndex].answers) {
        answer.isCorrect = false;
      }
      this.layoutItems[layoutIndex].answers[answerIndex].isCorrect = true;
    } else if (mode === 'checkbox') {
      this.layoutItems[layoutIndex].answers[answerIndex].isCorrect = true;
    }
  }

  unsetCorrectAnswer(layoutIndex: number, answerIndex: number) {
    this.layoutItems[layoutIndex].answers[answerIndex].isCorrect = false;
  }
}
