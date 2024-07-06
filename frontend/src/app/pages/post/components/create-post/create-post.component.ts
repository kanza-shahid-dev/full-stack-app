import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../../../interface/post';
import { PostService } from '../../../post.service';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardContent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  formSubmitAttempt = false;
  imagePreview!: string;
  postForm: FormGroup = this.formBuilder.group({});
  @Output() postCreated = new EventEmitter<Post>();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {
    this.formSubmitAttempt = false;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      image: [null, []],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.postForm?.get(field)?.valid &&
        this.postForm?.get(field)?.touched) ||
      (!this.postForm?.get(field)?.valid && this.formSubmitAttempt)
    );
  }

  OnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.postForm.setValue({ image: reader.result });
    };

    reader.readAsDataURL(file as Blob);
  }

  onSavePost() {
    this.formSubmitAttempt = true;
    if (this.postForm.invalid) return;

    this.postService.addPost(this.postForm.value).subscribe({
      next: (data) => {
        let resData = data.post;
        let newPost: Post = {
          _id: resData.id,
          title: resData.title,
          content: resData.content,
          imagePath: resData.imagePath,
        };
        this.postForm.reset();
        this.imagePreview = '';
        this.postCreated.emit(newPost);
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        this.formSubmitAttempt = false;
        console.log('complete');
      },
    });
  }
}
