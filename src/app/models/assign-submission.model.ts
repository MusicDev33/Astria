export interface IAssignSubmission {
  _id?: string;
  objects: any;
  assignmentID: string;
  nonStrict?: boolean;
  userID: string;
  timeSubmitted: Date;
  autosaved: boolean;
}
