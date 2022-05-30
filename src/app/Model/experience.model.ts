export class Experience {
  idExper!: number;
  exper_start: Date;
  exper_end: Date;
  img_exper: String;
  exper_description: String;
  exper_title: String;


   constructor(exper_start: Date, exper_end: Date, img_exper: String, exper_description: String, exper_title: String) {
    this.exper_start = exper_start;
    this.exper_end = exper_end;
    this.img_exper = img_exper;
    this.exper_description = exper_description;
    this.exper_title = exper_title;

  }
}
