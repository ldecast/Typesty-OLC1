import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService: AppService) { }

  title = 'typesty';
  entrada: string = '';
  salida: string = '';
  fname: string = '';

  newTab() {
    window.open("/", "_blank");
  }

  closeTab() {
    window.close();
  }

  onSubmit() {
    const x = { "input": this.entrada }
    this.appService.compile(x).subscribe(
      data => {
        console.log('Data received!', data);
        this.salida = data.output;
      },
      error => console.log('There was an error :(', error)
    );
  }

  saveFile() {
    var f = document.createElement('a');
    f.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entrada));
    console.log(this.fname);
    f.setAttribute('download', this.fname ? this.fname.replace("C:\\fakepath\\","") : 'newFile.ty');

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      f.dispatchEvent(event);
    }
    else {
      f.click();
    }
    console.log('File saved!');
  }

  openDialog() {
    document.getElementById("fileInput")!.click();
  }

  readFile(event: any) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
      //'text' is the content of the file
      var text = reader.result;
      if (text) {
        this.entrada = text.toString();
      }
    }
    reader.readAsText(input.files[0]);
    this.salida = '';
    console.log('File opened!')
  }

}
