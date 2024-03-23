import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-view-upload-errors',
  templateUrl: './view-upload-errors.component.html',
  styleUrls: ['./view-upload-errors.component.css']
})
export class ViewUploadErrorsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  downloadAsCSV(){
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Extract header row
    const headerRow = Object.keys(this.data[0]);
    csvContent += headerRow.join(',') + '\n';

    // Extract data rows
    this.data.forEach((item: any) => {
      const row = Object.values(item);
      csvContent += row.join(',') + '\n';
    });

    // Create Blob
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UploadErrors.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
