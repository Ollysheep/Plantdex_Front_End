import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-form-edit-plant',
  templateUrl: './form-edit-plant.component.html',
  styleUrls: ['./form-edit-plant.component.css'],
})
export class FormEditPlantComponent implements OnInit {
  @Input() plantToEdit: Plant | null = null;

  formPlant!: FormGroup;
  @Output() submitFormPlant = new EventEmitter<Plant>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formPlant = new FormGroup({
      nom: new FormControl('', Validators.required),
      soleil: new FormControl(),
      arrosage: new FormControl(),
      categorie: new FormControl(),
      image: new FormControl(),
    });
    console.log(this.formPlant);
  }

  onSubmitForm() {
    console.log(this.formPlant.value);
    this.submitFormPlant.emit(this.formPlant.value);
  }
}
