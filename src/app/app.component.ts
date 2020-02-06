import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openshift-front';
  test: string;

  constructor(private httpClient: HttpClient) {
  }

  onClick() {
    this.httpClient.get<any>('/test')
      .subscribe(data => {
        console.log('data: ', data);
        this.test = data;
      });
  }
}
