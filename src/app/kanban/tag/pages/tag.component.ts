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
    title: '',
  });
  public edit = false;

  constructor(private tagService: TagService, private formBuilder: FormBuilder) { }

  editTag(){
    this.edit = true;
    this.form.value.title = this.tag.title;
  }

  cancel(){
    this.edit = false;
  }

  updateTag(): void {
    const updateTag: Tag = {
      id: this.tag.id,
      title: this.form.value.title,
      order: this.tag.order,
      task_id: this.tag.task_id
    }

    // Lógica para actualizar la tarea
    this.tagService.update(this.tag.id,updateTag).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      this.edit = false;
    });
  }

  deleteTag(): void {
    this.tagService.delete(this.tag.id).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
    });

    // Emitir evento de actualización hacia el componente padre
    this.tagDeleted.emit(this.tag);
  }
}
