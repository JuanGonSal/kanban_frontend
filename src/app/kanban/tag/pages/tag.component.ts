import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() tag!: Tag;
  @Output()  tagDeleted: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Output()  tagUpdated: EventEmitter<Tag> = new EventEmitter<Tag>();

  form = this.formBuilder.group({
    name: '',
  });
  public edit = false;
  loading = false;
  tags?: any=[];
  editando: boolean = false;
  backupData: any;

  constructor(private tagService: TagService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getRows();
  }

  getRows(){
    this.loading = true;
    this.tagService.getAll().subscribe(tags => {
        tags?.forEach((tag) => { });
        this.tags = tags;
    });
    this.loading = false;
  }

  newRow(){
    const newTag: Tag = {
      id: 0,
      name: prompt('Ingrese un nombre para la etiqueta'),
      task_id: 0
    };

    if (newTag) {
      this.tagService.create(newTag).subscribe((tag: any) => {});
      this.getRows();
    }
  }

  editRow(tag: any) {
    this.editando = true;
    this.backupData = { ...tag };
    tag.editando = true;
  }

  editTag(){
    this.edit = true;
    this.form.value.name = this.tag.name;
  }

  cancel(){
    this.edit = false;
  }

  updateTag(): void {
    const updateTag: Tag = {
      id: this.tag.id,
      name: this.form.value.name,
      task_id: this.tag.task_id
    }

    // Lógica para actualizar la tarea
    this.tagService.update(this.tag.id,updateTag).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.edit = false;
    });
  }

  deleteRow(tag: any) {
      tag.active = false;
      this.tagService.delete(tag.id).subscribe((user: any) => {});
      this.getRows();
  }

  deleteTag(): void {
    this.tagService.delete(this.tag.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });

    // Emitir evento de actualización hacia el componente padre
    this.tagDeleted.emit(this.tag);
  }

  submitForm(tagId: number, tag: any) {
    this.tagService.update(tagId, tag).subscribe((tag: any) => {});
    this.editando = false;
    tag.editando = false;
  }

  cancelEdit(tag: any) {
    this.editando = false;
    Object.assign(tag, this.backupData);
    this.backupData = null;
    tag.editando = false;
  }
}
