import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from '../task';
import { Tag } from '../../tag/tag';
import { TaskService } from '../task.service';
import { TagService } from '../../tag/tag.service';
import { ModalService } from 'src/app/_services/modal.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output()  taskDeleted: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()  taskUpdated: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()  tagsUpdated: EventEmitter<Tag> = new EventEmitter<Tag>();
  
  allTags?: any=[];
  allUsers?: any[];
  tags?: any=[];
  edit?: boolean;
  // Arreglo de clases de Bootstrap
  tagBootstrapClass = [
    'badge bg-primary',
    'badge bg-secondary',
    'badge bg-success',
    'badge bg-danger',
    'badge bg-warning',
    'badge bg-info',
    'badge bg-dark'
  ];

  form = this.formBuilder.group({
    title: '',
    description: '',
    limit: null,
    assigned_user_id: null
  });

  dropdownSettings: IDropdownSettings;

  constructor(private taskService: TaskService, 
              private formBuilder: FormBuilder,
              protected modalService: ModalService,
              protected tagService: TagService,
              protected userService: UserService
            ) 
  {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
    };
  }

  ngOnInit() {
    console.log(this.task);
    this.tagService.getAll().subscribe((result) => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.allTags = result;
    });

    this.userService.getAll().subscribe((data) => {
      this.allUsers = data;
    });
    
    this.edit = false;
    this.tags = this.task?.tags;
  }

  openTagModal(){
    this.taskUpdated.emit(this.task);
    this.tagsUpdated.emit(this.tags);
    this.modalService.open('modal-tags');

  }

  generarEtiquetasAleatorias(cantidad: number) {
    const etiquetasAleatorias = [];
    for (let i = 0; i < cantidad; i++) {
      const etiqueta = {
        name: 'Etiqueta ' + i,
        class: this.tagBootstrapClass[i]
      };
      etiquetasAleatorias.push(etiqueta);
    }

    return etiquetasAleatorias;
  }

  addTags(){
    this.taskService.addTagsToTask(this.task.id, this.tags).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.edit = false;
    });
    this.tagsUpdated.emit(this.tags);
    this.modalService.close();
  }

  editTask(){
    this.edit = true;
    this.form.value.title = this.task.title;
    this.form.value.description = this.task.description;
    this.form.value.limit = this.task.limit;
  }

  cancel(){
    this.edit = false;
  }

  updateTask(): void {
    this.edit = false;
    const updateTask: Task = {
      id: this.task.id,
      title: this.form.value.title,
      description: this.form.value.description,
      limit: this.form.value.limit,
      order: this.task.order,
      column_id: this.task.column_id,
      created_at: this.task.created_at,
      created_by: this.task.created_by,
      assigned_to: this.task.assigned_to,
      created_user_id: this.task.created_user_id,
      assigned_user_id: this.form.value.assigned_user_id
    }

    // Lógica para actualizar la tarea
    this.taskService.update(this.task.id,updateTask).subscribe((data) => {
      // Lógica adicional después de crear la tarea, si es necesario
      console.log(data);
      this.task.assigned_to = data.assigned_to;
    });
/*     this.task.assigned_to.id = this.form.value.assigned_user_id
    this.task.assigned_to.name = this.form.value.assigned_user_id */
    this.addTags();
    this.taskUpdated.emit(this.task);
  }

  deleteTask(): void {
    this.taskService.delete(this.task.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });

    // Emitir evento de actualización hacia el componente padre
    this.taskDeleted.emit(this.task);
  }
}
