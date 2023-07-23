import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output()  taskDeleted: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()  taskUpdated: EventEmitter<Task> = new EventEmitter<Task>();

  form = this.formBuilder.group({
    title: '',
    description: ''
  });
  public edit = false;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  editTask(){
    this.edit = true;
    this.form.value.title = this.task.title;
    this.form.value.description = this.task.description;
  }

  cancel(){
    this.edit = false;
  }

  updateTask(): void {
    const updateTask: Task = {
      id: this.task.id,
      title: this.form.value.title,
      description: this.form.value.description,
      order: this.task.order,
      column_id: this.task.column_id
    }

    // Lógica para actualizar la tarea
    this.taskService.update(this.task.id,updateTask).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.edit = false;
    });
  }

  deleteTask(): void {
    this.taskService.delete(this.task.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });

    // Emitir evento de actualización hacia el componente padre
    this.taskDeleted.emit(this.task);
  }
}
