import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-error',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css'
})
export class PageErrorComponent {

}
