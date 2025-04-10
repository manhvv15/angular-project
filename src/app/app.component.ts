import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from './shared/header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderLayoutComponent, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Basic Project';
  message = '';
  bindingMessage = '';
  onclick() {
    console.log('Button clicked!');
    this.message = 'Button was clicked!';
  }
  products = [
    { image: 'path-to-image1.jpg', name: 'SambaOG', price: 20 },
    { image: 'path-to-image2.jpg', name: 'CoolBrand', price: 30 },
    { image: 'path-to-image3.jpg', name: 'FreshStyle', price: 25 },
  ];
}
