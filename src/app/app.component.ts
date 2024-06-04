import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  titulo: string = 'DoctorApp';
  usuarios: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get('http://localhost:5166/api/Usuario').subscribe({
    //   next: (response) => (this.usuarios = response),
    //   error: (error) => console.log(console.error()),
    //   complete: () => console.log('La solicitud está completa'),
    // });
  }
}
