import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { MainHttpService } from '../services/http/main-http.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  productData:ProductModel;
  noDataMsg:string;
  constructor(private oMainHttp:MainHttpService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
   let productId = this.route.snapshot.paramMap.get('id');
   this.oMainHttp.getProductById(productId).subscribe(
    res => {
      if(res){
        this.noDataMsg = "";
        this.productData = res;
      }else{
        this.noDataMsg = `No data for the product id: ${productId}.  Please enter correct product id`
      }
      
    }
   )
  }

  goBack(){
    this.router.navigate(['/productsList']);
  }

}
