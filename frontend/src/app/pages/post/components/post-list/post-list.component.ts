import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../../../interface/post';
import { PostService } from '../../../post.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  constructor(private postService: PostService) {}

  onEdit(id: string) {
    this.postService.editPost(id).subscribe({
      next: (data) => {
        console.log('data', data);
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  onDelete(id: string) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post._id !== id);
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
