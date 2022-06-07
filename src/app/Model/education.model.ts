export class Education {
  idEduc!: number;
  educ_start: Date;
  educ_end: Date;
  img_educ: String;
  educ_description: String;
  educ_title: String;


    constructor(educ_start: Date, educ_end: Date, img_educ: String, educ_description: String, educ_title: String) {
    this.educ_start = educ_start;
    this.educ_end = educ_end;
    this.img_educ = img_educ;
    this.educ_description = educ_description;
    this.educ_title = educ_title;

  }
}
