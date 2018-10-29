import React, { Component } from 'react';
import Chart from 'chart.js';
import _ from 'underscore'

class Histogram extends Component {
  constructor(props){
    super(props);
    this.state = {
      minFilterAmount: 0,
      maxFilterAmount: Number.MAX_SAFE_INTEGER,
      candidates: null,
      committees: null,
    }
    
    // Bar chart.
    this.barChart = null;
    this.createBarChart = this.createBarChart.bind(this);
    this.updateBarChart = this.updateBarChart.bind(this);
    // this.updateBarChart = _.debounce(this.updateBarChart, 2);
    this.clickBarChartHandler = this.clickBarChartHandler.bind(this);

    // Pie chart.
    this.pieChart = null;
    this.createPieChart = this.createPieChart.bind(this);

    this.handleChange = this.handleChange.bind(this);
  } 
  
  componentDidMount() {
    this.createBarChart();
    this.fetchData("contribution").then(data => {
      this.setState({candidates : data});
    });
  }
  
  componentDidUpdate(prevState){
    if (this.state.candidates !== prevState.candidates ||
       this.state.minFilterAmount !== prevState.minFilterAmount ||
       this.state.maxFilterAmount !== prevState.maxFilterAmount) {
      this.updateBarChart();
    }
    if (this.state.committees != null &&
      this.state.committees !== prevState.committees) {
      this.createPieChart();
    }
  }
  
  /**
   * 
   * @param {*} string 
   * Fetech data and call precessData function.
   */
  //TODO: Error handling
  fetchData(param){
    let url = 'http://localhost:3030/' + param;
    return fetch(url).then(response => response.json());
  }

/**
 * 
 * @param {*} array - array consists of labels
 * @param {*} array - array consists of values 
 * Create Chart.js bar chart. 
 */
  createBarChart(){
    this.barChart = new Chart('bar-chart', {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [{
          label: 'Total Contribution Amount',
          backgroundColor: 'rgba(0, 0, 159, 0.1)',
          data: []
        }]
      },
      options: {
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: false
            }]
        },
        title: {
          display: true,

        }
      }
    })  
  }

  updateBarChart(){
    let candidatesArray = [];
    let totalContributionAmountArray = [];
    this.state.candidates.forEach(candidate => {
      if(candidate.totalContributionAmount > this.state.minFilterAmount &&
        candidate.totalContributionAmount < this.state.maxFilterAmount){
        candidatesArray.push(candidate.name);
        totalContributionAmountArray.push(candidate.totalContributionAmount);
      }
    });
    this.barChart.data.labels = candidatesArray;
    this.barChart.data.datasets[0].data = totalContributionAmountArray;
    this.barChart.update();
  }

  /**
   * 
   * @param {*} event 
   * onclick, open modal to show pie chart.
   */
  clickBarChartHandler(event){
    let candidateOnClick = this.barChart.getElementAtEvent(event)[0]
    // take action only when correct area of the chart is clicked
    if(candidateOnClick !== undefined){
      let index = candidateOnClick._index;
      let candidateID = this.state.candidates[index]["candidateID"]
      this.fetchData('contribution/'+ candidateID).then(data=>{  
        this.setState({committees:data});     
      })
    }
  }

  /**
   * 
   * @param {*} array - array consists of labels  
   * @param {*} array - array consists of values
   * Create Chart.js pie chart. 
   */
  createPieChart(){
    if(this.pieChart !== null){
      this.pieChart.destroy();
    }
    let labels = [];
    let values = [];
    this.state.committees.forEach(committee => {
      labels.push(committee.name);
      values.push(committee.totalContributionAmount);
    });
    this.pieChart = new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Contribution',
          backgroundColor: [
            'rgba(0, 0, 159, 0.1)',
            'rgba(0, 159, 159, 0.1)',
            'rgba(159, 0, 159, 0.1)',
            'rgba(0, 10, 159, 0.1)',
            'rgba(10, 0, 159, 0.1)'
          ],  
          data: values
        }], 
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
        },
        responsive: true
      }
    })
  }

  /**
   *  Updates the displayed value as the user types.
   */
  handleChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render(){
    return (
      <div className='histogram-container'>
        <form>
        <label>
          min value:
          <input type="text" name="minFilterAmount" value={this.state.minFilterAmount} tag="minFilterAmount" onChange={this.handleChange} />
        </label>
        <label>
          max value:
          <input type="text" name="maxFilterAmount" value={this.state.maxFilterAmount} tag="maxFilterAmount" onChange={this.handleChange} />
        </label>
        </form>
        <canvas id='bar-chart' onClick={this.clickBarChartHandler}></canvas>
        <div id='piechart-container'>
          <canvas id='pie-chart'></canvas>
        </div>
      </div>
    );
  }
}
export default Histogram;