import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-test-comp-madzia',
  imports: [],
  templateUrl: './test-comp-madzia.component.html',
  styleUrl: './test-comp-madzia.component.scss'
})
export class TestCompMadziaComponent {

  isShown = input<boolean>(false);

}
