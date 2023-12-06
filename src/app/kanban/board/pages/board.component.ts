import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoardService } from '../board.service';
import { ColumnService } from '../../column/column.service';
import { TaskService } from '../../task/task.service';
import { Column } from '../../column/column';
import { Board } from '../board';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  @Input() board!: Board;
  
  columns: Column[] = [];
  name: string = '';
  id!: number;
  loading = false;
  user?: User | null;
  rolAdmin?: any;
  rolGestor?: any;
  edit = false;

  private columnSuscription?: Subscription;
  private taskSuscription?: Subscription;

  constructor(
    private boardService: BoardService, 
    private columnService: ColumnService, 
    private taskService: TaskService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { 


  }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.profile().pipe(first()).subscribe(user => {
      this.user =  user;
      this.rolAdmin = this.isAdmin();
      this.rolGestor = this.isGestor();
      this.loading = false;
    });
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.boardService.getById(this.id).subscribe((board: any) => {
        this.name = board.name;
        this.board = board;
      });
  
      this.columnSuscription = this.columnService.getColumnsByBoard(this.id).subscribe(columns => {
        this.columns = columns;
        for (const column of columns) {
          this.taskSuscription = this.taskService.getTasksByColumn(column.id).subscribe(tasks => {
            column.tasks = tasks;
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.columnSuscription?.unsubscribe();
    this.taskSuscription?.unsubscribe();
  }

  editBoard(){
    this.edit = true;
  }

  updateBoard(){
    this.board.name = this.name;
    this.boardService.update(this.board.id, this.board).subscribe((board: any) => {
      this.edit = false;
    });
  }

  createColumn(){
    const newColumn: Column = {
      id: 0,
      name: prompt('Ingrese el título de la nueva columna'),
      board_id: this.id,
      order: 0,
      tasks: []
    };

    if (newColumn) {
      this.columns.push(newColumn);
      this.columnService.create(newColumn).subscribe((column: any) => {});
    }
  }

  onColumnDeleted(column: Column): void {
    const index = this.columns.findIndex(t => t.id === column.id);
    if (index > -1) {
      this.columns.splice(index, 1);
    }
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

  isGestor(): boolean {
    return this.user?.roles.some(rol => rol.name === 'gestor') || false;
  }

  isAdmin(): boolean {
    return this.user?.roles.some(rol => rol.name === 'admin') || false;
  }
}
