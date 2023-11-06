import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../column';
import { Task } from '../../task/task';
import { ColumnService } from '../column.service';
import { TaskService } from '../../task/task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() column!: Column;

  @Output()  columnDeleted: EventEmitter<Column> = new EventEmitter<Column>();

  constructor(
    private columnService: ColumnService,
    private taskService: TaskService
  ) { }

  deleteColumn(){
    this.columnService.delete(this.column.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });

    // Emitir evento de actualización hacia el componente padre
    this.columnDeleted.emit(this.column);
  }

  onTaskDragStart(event: DragEvent, task: Task, column: Column): void {
    event.dataTransfer?.setData('text/plain', task.id.toString());
    event.dataTransfer?.setData('application/json', column.id.toString());
  }

  onTaskDeleted(task: Task): void {
    const index = this.column.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      this.column.tasks.splice(index, 1);
    }
  }

  createTask(){
    const newTask: Task = {
      id: 0,
      title: prompt('Ingrese el título de la nueva tarea'),
      description: prompt('Ingrese la descripción de la nueva tarea'),
      column_id: this.column.id,
      order: 0
    };
    // Lógica para actualizar la tarea
    this.taskService.create(newTask).subscribe((result) => {
      // Lógica adicional después de crear la tarea, si es necesario
        newTask.id = result.id;
        this.column.tasks.push(newTask);
    });
  }
}
