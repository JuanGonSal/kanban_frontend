import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { ColumnService } from '../../column/column.service';
import { TaskService } from '../../task/task.service';
import { Column } from '../../column/column';
import { Task } from '../../task/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  columns: Column[] = [];
  name: String = '';

  constructor(private boardService: BoardService, private columnService: ColumnService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.boardService.getById(1).subscribe((board: any) => {
      this.name = board.name;
    });

    this.columnService.getColumnsByBoard(1).subscribe(columns => {
      this.columns = columns;
      for (const column of columns) {
        this.taskService.getTasksByColumn(column.id).subscribe(tasks => {
          column.tasks = tasks;
        });
      }
    });
  }

  onTaskDragStart(event: DragEvent, task: Task, column: Column): void {
    event.dataTransfer?.setData('text/plain', task.id.toString());
    event.dataTransfer?.setData('application/json', column.id.toString());
  }

  onTaskDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onTaskDrop(event: DragEvent, targetColumn: Column): void {
    event.preventDefault();
    const draggedTaskId = event.dataTransfer?.getData('text/plain');
    const sourceColumnId = event.dataTransfer?.getData('application/json');

    if (draggedTaskId && sourceColumnId) {
      const sourceColumn = this.columns.find((column) => column.id === +sourceColumnId);
      const draggedTaskIndex = sourceColumn?.tasks.findIndex((task) => task.id === +draggedTaskId);

      if (sourceColumn && draggedTaskIndex !== undefined && draggedTaskIndex > -1) {
        const draggedTask = sourceColumn.tasks.splice(draggedTaskIndex, 1)[0];
        targetColumn.tasks.push(draggedTask);

        // Actualiza la columna de la tarea en la base de datos
        this.taskService.update(draggedTask.id, { column_id: targetColumn.id })
        .subscribe((response) => {
          console.log('Tarea actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la tarea:', error);
        });
      }
    }
  }
}
