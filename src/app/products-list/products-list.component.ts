import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { MainHttpService } from '../services/http/main-http.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsData: ProductModel[] = [];
  isDraggable:boolean = false;
  displayedColumns: string[] = ['id',  'category', 'title','price', 'priceinrs', 'description'];
  dataSource:MatTableDataSource<ProductModel>;
  pageSize = 5;
  length = 5;
  filterEntity: ProductModel;
  constructor(private oMainServ:MainService, private oMainHttp:MainHttpService, private router:Router) { }
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort:MatSort){
    if(sort){
      this.dataSource.sort = sort;
    }
  }
  @ViewChild(MatTable) table: MatTable<ProductModel[]>;
  
  ngOnInit(): void {
    let paginator = document.getElementById('paginate');
    paginator.style.display = "none";
    this.oMainHttp.getAllProducts().subscribe(
      res => {
        this.productsData = res;
        this.dataSource = new MatTableDataSource(res);
        paginator.style.display = "block";
        this.dataSource.paginator = this.paginator;

      },
      error => {
        this.router.navigate(['errorScreen']);
      }
    )
   
  }

  sortChange(event){
    if(event.direction){
      this.isDraggable = true;
    }else{
      this.isDraggable = false;
    }
    
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<ProductModel[]>) {
    moveItemInArray(this.dataSource.data,event.previousIndex, event.currentIndex);
    this.table.renderRows();
    this.dataSource._updateChangeSubscription();
  }
  
  clickedRow(data:ProductModel){
   this.router.navigate(['/viewProduct', data.id]);
  }

}
