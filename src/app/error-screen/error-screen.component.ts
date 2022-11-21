import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.scss']
})
export class ErrorScreenComponent implements OnInit {
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  reloadPage() {
   this.router.navigate(['/productsList']);
  }

}
