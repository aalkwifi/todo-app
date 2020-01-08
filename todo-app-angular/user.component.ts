import {Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    email: new FormControl(null),
    age: new FormControl(null)
  });
  private stars = [1, 2, 3, 4, 5, 6];
  private rating: number ;
  private hoverState = 0;
  private  editMode = false;
  private  name: string;
  private age: number;
  private email: string;
  private  adderss: {
    street: string,
    city: string,
    postcode: number
    };
  private skills: any[];
  public ROOT_URL = 'http://localhost:3000';
  public posts: Posts[]; // TODO replace any with correct type
  private idElement: number;




  constructor( public todoservice: TodoService, private http: HttpClient) {
  }
  ngOnInit() {
    this.rating = 0;
    this.name = 'Ahmad';
    this.age = 42;
    this.email = 'ahmadalkwifi1976@gmail.com';
    this.adderss = {
      street: 'langwa',
      city: 'Greven',
      postcode: 41516
    };
    this.skills = ['ahmad', 1 , 4 ];
  }

  getPosts() {
    this.http.get(this.ROOT_URL).subscribe((posts: Posts[]) => {console.log('in subscribe'); console.log(posts); this.posts = posts; });
    console.log('Get  Posts');
    // setTimeout( ()  => {
    //   this.getPosts();
    // }, 200);
    console.log(this.posts);
  }
  addPost() {
    if (this.editMode ) {
      this.editMode = false;
      const updatePost = this.http.put(`${this.ROOT_URL}/${this.form.controls.id.value}`, {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        age: this.form.controls.age.value
      }).subscribe(res => console.log(res));
      console.log(updatePost);
    } else {
    this.idElement = Date.now();
    const newPost =  this.http.post(this.ROOT_URL, {
      id: this.idElement,
      name: this.form.controls.name.value,
      age: this.form.controls.age.value,
      email: this.form.controls.email.value
    }).subscribe(res => console.log(res));
    console.log(newPost + 'Post Posts');
    }
    this.form.reset();
    this.getPosts();
  }

  deletePost(event, index: number, post) {
    const deletePost = this.http.delete(`${this.ROOT_URL}/${post.id}`).subscribe(res => console.log(res));
    console.log(index);
    console.log(deletePost ,  ' delete Post !!!');
    // this.posts = this.posts.splice(index, 1);
    // console.log(this.posts);
    this.posts.splice(index, 1);
    this.posts = this.posts.filter(mypost => post.name !== mypost.name);
  }

  updatePost(event, index: number, oldObject) {
    console.log(event.target);
    this.editMode = true;
    this.form.setValue(oldObject);
    this.form.setValue(oldObject);
    console.log(oldObject);
  }
  enter(i) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i, star) {
    this.rating = i;
    const idStar = this.stars.indexOf( i + 1 );
    alert(idStar);
  }
}

interface Posts {
  id: number;
  name: string;
  email: string;
  age: string;
}

