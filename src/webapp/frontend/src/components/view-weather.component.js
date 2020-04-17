import React, { Component } from "react";
import Card from "./Card.component";
const weatherURL =
	"http://api.openweathermap.org/data/2.5/forecast?id=1269843&appid=95e286bae5647877dbb924f3779736a8&units=imperial";

export default class Weather extends Component {
	state = {
		days: [],
	};

	componentDidMount = () => {
		fetch(weatherURL)
			.then((res) => res.json())
			.then((data) => {
				console.log("Data List Loaded", data.list);
				const dailyData = data.list.filter((reading) =>
					reading.dt_txt.includes("18:00:00")
				);
				this.setState({ days: dailyData });
			});
	};

	formatCards = () => {
		return this.state.days.map((day, index) => (
			<Card day={day} key={index} />
		));
	};

	render() {
		return (
			<div className="container">
				<h1 className="display-1 jumbotron">5-Day Forecast</h1>
				<h5 className="display-5 text-muted">Hyderabad, India</h5>
				<div className="row justify-content-center">
					{this.formatCards()}
				</div>
			</div>
		);
	}
}
