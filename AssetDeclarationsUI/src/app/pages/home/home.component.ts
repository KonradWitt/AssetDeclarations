import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService
      .getPersons()
      .subscribe((persons) => console.log(persons));
  }
}
