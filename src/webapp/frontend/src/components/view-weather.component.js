import React, { Component } from "react";
import DayCard from "./Day-card.component";

export default class Weather extends Component {
	state = {
		fullData: [],
		dailyData: [],
	};

	componentDidMount = () => {
		const weatherURL =
			"http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial";

		fetch(weatherURL)
			.then((res) => res.json())
			.then((data) => {
				const dailyData = data.list.filter((reading) =>
					reading.dt_txt.includes("18:00:00")
				);
				this.setState(
					{
						fullData: data.list,
						dailyData: dailyData,
					},
					() => console.log(this.state)
				);
			});
	};

	formatDayCards = () => {
		return this.state.dailyData.map((reading, index) => (
			<DayCard reading={reading} key={index} />
		));
	};

	render() {
		return (
			<div className="container">
				<h1 className="display-1 jumbotron">5-Day Forecast.</h1>
				<h5 className="display-5 text-muted">Hyderabad, India</h5>
				<div className="row justify-content-center">
					{this.formatDayCards()}
				</div>
			</div>
		);
	}
}
