import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';

import { ICourse } from '@models/course.model';
import { IResponse } from '@interfaces/response.interface';
import { CourseService } from '@services/course.service';
import { AssignmentService } from '@services/assignment.service';
import { AnnouncementService } from '@services/announcement.service';
import { IAssignment } from '@models/assignment.model';
import { IAnnouncement } from '@models/announcement.model';

import { MONTHS_SHORT, getMeridiemTime } from '@globals/date';

import { AnnouncementDialogComponent } from '@dialogs/announcement-dialog/announcement-dialog.component';

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

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private announcementService: AnnouncementService,
    private dialog: MatDialog
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
}
