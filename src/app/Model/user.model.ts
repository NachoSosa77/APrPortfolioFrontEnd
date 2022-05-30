 export class User {
  idUser!: number;
  user_name: String;
  user_surname: String;
  user_img: String;
  user_description: String;
  user_title: String;


  constructor(user_name: String, user_surname: String, user_img: String, user_description: String, user_title: String) {
    this.user_name = user_name;
    this.user_surname = user_surname;
    this.user_img = user_img;
    this.user_description = user_description;
    this.user_title = user_title;

  }
}

