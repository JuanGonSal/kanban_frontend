import { Component, Input } from '@angular/core';
import { Column } from '../column';
import { Task } from 'src/app/task/task';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() column!: Column;

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

}
