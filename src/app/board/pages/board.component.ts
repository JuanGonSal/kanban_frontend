import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { ColumnService } from '../../column/column.service';
import { TaskService } from '../../task/task.service';
import { Column } from '../../column/column';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  columns: Column[] = [];
  name: String = '';
  id!: number;

  constructor(
    private boardService: BoardService, 
    private columnService: ColumnService, 
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.boardService.getById(this.id).subscribe((board: any) => {
        this.name = board.name;
      });
  
      this.columnService.getColumnsByBoard(this.id).subscribe(columns => {
        this.columns = columns;
        for (const column of columns) {
          this.taskService.getTasksByColumn(column.id).subscribe(tasks => {
            column.tasks = tasks;
          });
        }
      });
    });

  }

  onTaskUpdated(updatedColumn: Column): void {
    // Actualizar la columna en el arreglo de columnas
    const columnIndex = this.columns.findIndex(column => column.id === updatedColumn.id);
    if (columnIndex !== -1) {
      this.columns[columnIndex] = updatedColumn;
    }
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
        .subscribe(() => {
          console.log('Tarea actualizada correctamente');
        }, (error) => {
          console.error('Error al actualizar la tarea:', error);
        });
      }
    }
  }
}
