import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Column } from '../column';
import { Task } from '../../task/task';
import { ColumnService } from '../column.service';
import { TaskService } from '../../task/task.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnDestroy{
  user?: User | null;

  @Input() column!: Column;
  @Input() rolGestor!: boolean;
  @Input() rolAdmin!: boolean;

  @Output()  columnDeleted: EventEmitter<Column> = new EventEmitter<Column>();
  
  private authenticationSuscription?: Subscription;
  private taskSuscription?: Subscription;
  
  constructor(
    private columnService: ColumnService,
    private taskService: TaskService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(){
    this.authenticationSuscription = this.authenticationService.profile().subscribe((data) => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.user = data;
    });

    this.taskSuscription = this.taskService.getTasksByColumn(this.column.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });
  }

  ngOnDestroy(): void {
    // Se llama cuando el componente está a punto de ser destruido
    // Desvincular la suscripción para evitar problemas de memoria
    this.authenticationSuscription?.unsubscribe();
    this.taskSuscription?.unsubscribe();
  }

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
      limit: null,
      column_id: this.column.id,
      order: 0,
      created_at: null,
      created_by: null,
      assigned_to: null,
      created_user_id: null,
      assigned_user_id: null
    };

    // Lógica para actualizar la tarea
    this.taskSuscription = this.taskService.create(newTask).subscribe((result) => {
      // Lógica adicional después de crear la tarea, si es necesario
        this.column.tasks.push(result);
    });
  }
}
