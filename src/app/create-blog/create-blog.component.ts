// create-blog.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/Blog';
import { CanActivate, Router } from '@angular/router';

class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      postTitle: ['', Validators.required],
      content: ['', Validators.required],
      blogId: ['', Validators.required],
    });
  }

  // create-blog.component.ts
// create-blog.component.ts
onSubmit() {
  if (this.blogForm.valid) {
    const formData = this.blogForm.value;

    const blogIdValue = parseInt(formData.blogId, 10);

    if (isNaN(blogIdValue)) {
      console.error('Invalid value for blogId:', formData.blogId);
      return; // Stop further execution
    }

    const newBlog: Blog = {
      title: formData.title,
      posts: [
        {
          id: 0, // Set to 0 for a new post
          PostTitle: formData.postTitle,
          content: formData.content,
          blogId: blogIdValue
        }
      ]
    };

    this.blogService.createBlog(newBlog).subscribe(
      (response: any) => {
        console.log('Blog created successfully', response);
        // Optionally, navigate to another page or perform additional actions after successful creation
      },
      (error: any) => {
        console.error('Error creating blog', error);
      }
    );
  }
}
}