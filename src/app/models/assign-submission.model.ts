export interface IAssignSubmission {
  objects: any;
  assignmentID: string;
  nonStrict?: boolean;
  userID: string;
  timeSubmitted: Date;
}
