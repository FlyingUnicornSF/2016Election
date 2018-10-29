import React, { Component } from 'react';
import Chart from 'chart.js';
import './components.css';

class PieChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      labels: []
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  componentDidMount() {
    let candidateName = console.log(this.props.candidate)
    this.fetchData(candidateName).then((result) => {
      //TODO: load "loading...."
    });
  }
  
  // componentDidUpdate(prevState){
  //   if (this.state.contribution !== prevState.contribution) {
  //   }
  // }
  
  //TODO: Error handling
  fetchData(param){
    let url = 'http://localhost:3030/' + param;
    return fetch(url)
      .then(response => response.json())
      .then(data => this.processData(data))
      //.then(data => console.log(data));   
  }

  processData(data){
    let candidatesArray = [];
    let totalContributionAmountArray = [];
    for (let key in data) {
      if(data[key]["totalContributionAmount"] > this.state.minAmount && data[key]["totalContributionAmount"] < this.state.maxAmount){
        totalContributionAmountArray.push(data[key]["totalContributionAmount"]);
        candidatesArray.push(data[key]["name"]);
      }
    }
    console.log(candidatesArray);
    this.createChart(candidatesArray, totalContributionAmountArray)
  }

/**
 *  pie chart
 */
  createChart(candidatesArray, totalContributionAmountArray){
    this.pie = new Chart('pi-canvas', {
      type: 'pie',
      data: {
        labels: [1, 2, 3, 4, 5],
        datasets: [{
          label: 'Contribution Amount',
          backgroundColor: [
            'rgba(0, 0, 159, 0.1)',
            'rgba(0, 159, 159, 0.1)',
            'rgba(159, 0, 159, 0.1)',
            'rgba(0, 10, 159, 0.1)',
            'rgba(10, 0, 159, 0.1)'
          ],  
          data: [1, 2, 3, 4, 5]
        }], 
      },
      options: {
        title: {
          display: true,
        },
        responsive: true
      }
    })
  }

  clickHandler(event){
    let candidateOnClick = this.stackedBar.getElementAtEvent(event)[0]
    console.log(candidateOnClick)
    // console.log(candidateOnClick._model.label)
  }
  
  render(){
    return (
    <div id='piechart-container' onClick={this.closeHandler}>
      <span className="close">&times;</span>
      <canvas id='pi-canvas' onClick={this.clickHandler}></canvas>
    </div>
    );
  }
}
export default PieChart;