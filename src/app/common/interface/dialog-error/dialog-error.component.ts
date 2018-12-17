import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IErrorDialogData } from '../interfaces/i-error-dialog-data';

@Component({
  selector: 'av-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IErrorDialogData
  ) { }

  ngOnInit() {
  }

}
