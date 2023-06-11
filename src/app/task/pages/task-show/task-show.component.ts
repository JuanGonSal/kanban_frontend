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
    description: ''
  });

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  createTask(): void {
    const newTask: Task = {
      id: -1,
      title: this.form.value.title,
      description: this.form.value.description,
      order: 0,
      column_id: 1
    }

    this.taskService.create(newTask).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      window.location.reload();
    });
  };


}