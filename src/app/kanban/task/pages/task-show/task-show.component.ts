import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../../task.service';
import { Task } from '../../task';


@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
})
export class TaskShowComponent {

  form = this.formBuilder.group({
    title: '',
    description: '',
    limit: null
  });

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  createTask(): void {
/*     const newTask: Task = {
      id: -1,
      title: this.form.value.title,
      description: this.form.value.description,
      limit: this.form.value.limit,
      order: 0,
      column_id: 1,
      created_at: null,
      created_by: null,
      assigned_to: null,
      assigned_user_id: null
    }

    this.taskService.create(newTask).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      window.location.reload();
    }); */
  };


}