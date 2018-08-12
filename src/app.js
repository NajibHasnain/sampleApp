import React, { Component } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      columnDefs: [
            {headerName: "Student Name", field: "studentName"},
            {headerName: "Student Roll", field: "studentRoll"},
            {headerName: "Student Class", field: "studentClass"},
            {headerName: "Student Address", field: "studentAddr"},
            {headerName: "Language", field: "language"},

        ],
        rowDefs: ''
    }
  }

  componentDidMount() {
    var that = this;
    var url = 'http://localhost:8000/getdata'
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({rowDefs : data.data})
    });
  }

  render(){
    return(

      <div style={{ height: '1000px', width: '1000px' }} className="ag-theme-balham">
        <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowDefs? this.state.rowDefs : ''}>
        </AgGridReact>
      </div>
    )
  }
}
