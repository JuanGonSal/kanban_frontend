import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TagService } from '../../tag.service';
import { Tag } from '../../tag';


@Component({
  selector: 'app-tag-show',
  templateUrl: './tag-show.component.html',
})
export class TagShowComponent {

  form = this.formBuilder.group({
    title: ''
  });

  constructor(private tagService: TagService, private formBuilder: FormBuilder) { }

  createTag(): void {
    const newTag: Tag = {
      id: -1,
      name: this.form.value.title,
      task_id: 1
    }

    this.tagService.create(newTag).subscribe(() => {
      // Lógica adicional después de crear la tarea, si es necesario
      window.location.reload();
    });
  };


}