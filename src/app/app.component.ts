import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Covoiturage } from 'src/Models/Covoiturage.model';
import * as CovoiturageActions from './Store/covoiturage.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm: NgForm;
  title = 'covoiturageNGRX';
  editMode = false;
  covoiturages: Observable<{ covoiturages: Covoiturage[] }>;
  i: number;
  isVilleDepart = true;
  filterString: string;

  constructor(private store: Store<{ covoiturageListe: { covoiturages: Covoiturage[] } }>) { }

  ngOnInit() {
    this.covoiturages = this.store.select('covoiturageListe');

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('value 1: ', value);
    const newCovoiturage = new Covoiturage(value.villeDepart, value.villeArrive, value.date, value.genre);
    if (!this.editMode) {
      this.store.dispatch(new CovoiturageActions.addCovoiturage(newCovoiturage))
    } else {
      this.store.dispatch(new CovoiturageActions.updateCovoiturage({ index: this.i, covoiturage: newCovoiturage }))
    }
    this.editMode = false;
    form.reset();
  }

  onSelect(index: number) {
    this.i = index;
    this.covoiturages.subscribe(editedItem => {
      console.log("in index : ", index);
      console.log("in observable : ", editedItem.covoiturages[index]);
      this.slForm.setValue({
        villeDepart: editedItem.covoiturages[index].villeDepart,
        villeArrive: editedItem.covoiturages[index].villeArrive,
        date: editedItem.covoiturages[index].date,
        genre: editedItem.covoiturages[index].genre,
      })
    })
    this.editMode = true;
  }

  onDelete(index: number) {
    this.store.dispatch(new CovoiturageActions.deleteCovoiturage(index));
  }

  filterCovoiturage() {
    this.store.dispatch(new CovoiturageActions.filterCovoiturage({ isDepart: this.isVilleDepart, filter: this.filterString }));
    this.filterString="";
  }

  onItemChange() {
    console.log('is ville depart : ', this.isVilleDepart);
    this.isVilleDepart = !this.isVilleDepart;
    console.log('is ville depart : ', this.isVilleDepart);
  }

  onReset(){
    this.editMode = false;
    this.store.dispatch(new CovoiturageActions.defaultCovoiturage());
    this.slForm.reset();
    this.filterString="";
  }

}
