import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private pdService: ProductService) { }

  ngOnInit() {
    this.products = this.pdService.getAll();
  }

}
