import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'shop-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './shop-layout.component.html',
})
export class ShopLayoutComponent {}
