import { Component, OnInit } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { Post } from '../../interface/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostListComponent, CreatePostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  title = 'full-stack-app';
  postList: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPostListData();
  }
  onPostAdded(post: Post) {
    this.postList.push(post);
  }

  getPostListData() {
    this.postService.getPosts().subscribe({
      next: async (data) => {
        this.postList = data.posts;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
