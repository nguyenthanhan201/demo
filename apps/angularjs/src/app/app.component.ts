import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentOverviewByCliComponent } from './component-overview-by-cli/component-overview-by-cli.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentOverviewByCliComponent],
  templateUrl: './app.component.html',
  // template: `<h1>123</h1>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularjs';

  updateUser() {
    this.title = 'angularjs2';
  }
}
