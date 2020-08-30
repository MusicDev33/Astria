import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { ViewportScroller } from '@angular/common';

import { ICourse } from '@models/course.model';
import { IResponse } from '@interfaces/response.interface';
import { CourseService } from '@services/course.service';
import { AssignmentService } from '@services/assignment.service';
import { AnnouncementService } from '@services/announcement.service';
import { JwtService } from '@services/jwt.service';
import { IAssignment } from '@models/assignment.model';
import { IAnnouncement } from '@models/announcement.model';
import { ILayout } from '@models/layout.model';
import { IAssignSubmission } from '@models/assign-submission.model';

import { MONTHS_SHORT, getMeridiemTime } from '@globals/date';

import { AnnouncementDialogComponent } from '@dialogs/announcement-dialog/announcement-dialog.component';
import { ConfirmationDialogComponent } from '@dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit {

  sub: any;

  selectedNavIndex = 0;
  topNavOptions = ['Home', 'Announcements', 'Syllabus', 'Assignments'];

  course: ICourse;

  schoolID: string;
  instructorID: string;
  courseID: string;

  assignments: IAssignment[] = [];
  announcements: IAnnouncement[] = [];

  openAssignmentID = '';
  openedAssignment: IAssignment;
  openedLayout: ILayout;
  assignmentStarted = false;

  layoutLoading = true;
  startButtonText = 'Loading';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private announcementService: AnnouncementService,
    private dialog: MatDialog,
    private viewScroller: ViewportScroller,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.schoolID = params['schoolID'];
      this.instructorID = params['instructorID'];
      this.courseID = params['courseCode'];

      this.courseService.getOneCourseForStudent(this.schoolID, this.instructorID, this.courseID)
        .subscribe((res: IResponse<ICourse>) => {
          if (res.success) {
            this.course = res.payload;
            this.topNavOptions[0] = this.course.name;
            this.getAssignments(this.course._id);
            this.getAnnouncements(this.course._id);
          }
        });
    });
  }

  getAssignments(courseID: string) {
    this.assignmentService.getAssignmentsForCourse(courseID).subscribe((res: IResponse<IAssignment[]>) => {
      if (res.success) {
        this.assignments = res.payload;
      }
    });
  }

  getAnnouncements(courseID: string) {
    this.announcementService.getCourseAnnouncements(courseID).subscribe((res: IResponse<IAnnouncement[]>) => {
      if (res.success) {
        console.log(res);
        this.announcements = res.payload;
      }
    });
  }

  getAssignmentDueDate(date: Date) {
    const jsDate = new Date(date);
    let assignDueDate = `${MONTHS_SHORT[jsDate.getMonth()]} ${jsDate.getDate()}, ${jsDate.getFullYear()} `;

    assignDueDate += `at ${getMeridiemTime(jsDate)}`;
    return assignDueDate;
  }

  openAnnouncement(announcement: IAnnouncement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = announcement;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'mt-dialog';

    const position: DialogPosition = {top: '200px'};
    dialogConfig.position = position;
    this.dialog.open(AnnouncementDialogComponent, dialogConfig);
  }

  selectAssignment(assignment: IAssignment) {
    this.openedAssignment = assignment;
    this.assignmentService.getAssignmentLayout(assignment._id).subscribe((res: IResponse<ILayout>) => {
      this.layoutLoading = false;
      if (res.success) {
        this.startButtonText = 'Start Assignment';
        this.openedLayout = res.payload;
      } else {
        this.startButtonText = 'Error';
      }
    });
  }

  closeAssignment() {
    this.openedAssignment = null;
    this.openedLayout = null;
    this.assignmentStarted = false;
  }

  startAssignment(assignment: IAssignment) {
    this.selectAssignment(assignment);
    this.assignmentStarted = true;
  }

  scrollToID(elementID: string): void {
      this.viewScroller.scrollToAnchor(elementID);
  }

  get getAnswersCompleted(): number {
    if (!this.openedLayout) {
      return 0;
    }

    const answeredQuestions = this.openedLayout.objects.filter((question: any) => {
      return question.answered;
    });

    return (answeredQuestions.length / this.openedLayout.objects.length) * 100;
  }

  submitAssignment() {
    const answeredQuestions = this.openedLayout.objects.filter((question: any) => {
      return question.answered;
    });

    const dialogConfig = new MatDialogConfig();

    if (answeredQuestions.length === this.openedLayout.objects.length) {
      dialogConfig.data = {
        title: 'Hey!',
        description: `
          Don't worry, nothing bad happened. It looks like you answered every question! Are you ready to submit?
        `,
        submitText: `Oh yeah. Submit it.`,
        cancelText: `Not quite yet!`
      };
    } else {
      dialogConfig.data = {
        title: 'Submit Assignment?',
        description: 'You haven\'t answered all the questions, are you sure you want to submit the assignment?',
        submitText: `Oh yeah. Submit it.`,
        cancelText: `Nah`
      };
    }

    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'mt-dialog';

    const position: DialogPosition = {top: '200px'};
    dialogConfig.position = position;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((submitted: boolean) => {
      const reqBody: any = this.openedLayout;
      const idData = this.jwtService.getIDToken();

      reqBody['userID'] = idData._id;
      reqBody['timeSubmitted'] = new Date();

      const assignmentID = reqBody['assignmentID'];

      this.assignmentService.sendAssignmentSubmission(assignmentID, idData._id, reqBody).subscribe((res: IResponse<IAssignSubmission>) => {
        console.log(res);
      });
    });
  }
}
