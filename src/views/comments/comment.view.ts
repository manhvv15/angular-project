import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  commentForm: FormGroup;
  isEditing: boolean = false;
  isCreating: boolean = false;
  currentCommentId: string | null = null;

  constructor() {
    this.commentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.comments = [
      { id: '1', title: 'Bình luận 1', content: 'Nội dung bình luận 1' },
      { id: '2', title: 'Bình luận 2', content: 'Nội dung bình luận 2' },
    ];
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const formValues = this.commentForm.value;

      if (this.isEditing && this.currentCommentId) {
        const comment = this.comments.find(
          (c) => c.id === this.currentCommentId
        );
        if (comment) {
          comment.title = formValues.title;
          comment.content = formValues.content;
          console.log('Bình luận đã được cập nhật', comment);
        }
        this.isEditing = false;
      } else {
        const newComment = {
          id: String(this.comments.length + 1),
          ...formValues,
        };
        this.comments.push(newComment);
        console.log('Bình luận đã được tạo mới', newComment);
        this.isCreating = false;
      }
    }
  }

  onEdit(id: string) {
    this.isEditing = true;
    this.isCreating = false;
    this.currentCommentId = id;
    const comment = this.comments.find((c) => c.id === id);
    if (comment) {
      this.commentForm.setValue({
        title: comment.title,
        content: comment.content,
      });
    }
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.comments = this.comments.filter((c) => c.id !== id);
      console.log('Bình luận đã được xóa');
    }
  }

  onCreate() {
    this.isCreating = true;
    this.isEditing = false;
  }

  onCancel() {
    this.isCreating = false;
    this.isEditing = false;
  }
}
