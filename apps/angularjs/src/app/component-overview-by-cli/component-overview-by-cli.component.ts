import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-component-overview-by-cli',
  standalone: true,
  imports: [],
  templateUrl: './component-overview-by-cli.component.html',
  // styleUrl: './component-overview-by-cli.component.css'
  styles: ['h1 { color: red; }'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentOverviewByCliComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    console.log('init');
  }

  @Input() title = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }
}
