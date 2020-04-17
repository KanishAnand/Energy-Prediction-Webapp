import React, { Component } from "react";
import { Container, Nav } from "./styled.component";

// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./charts-theme.js";

import config from "./config";
// import Dropdown from "react-dropdown";
import formatNum from "./format-number";

// import UserImg from "../assets/images/user-img-placeholder.jpeg";

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			amRevenue: null,
			totalenergy: null,
			totalexpenditure: null,
			myDataSource: null,
		};
	}

	getData = (arg) => {
		// google sheets data
		const arr = this.state.items;
		const arrLen = arr.length;

		// kpi's
		// amazon revenue
		let amRevenue = 0;

		for (let i = 0; i < arrLen; i++) {
			if (arg === arr[i]["month"]) {
				if (arr[i]["source"] === "AM") {
					amRevenue += parseInt(arr[i].revenue);
				}
			}
		}

		// setting state
		this.setState({
			amRevenue: formatNum(amRevenue),
		});
	};

	// updateDashboard = (event) => {
	// 	this.getData(event.value);
	// 	this.setState({ selectedValue: event.value });
	// };

	componentDidMount() {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				let batchRowValues = data.valueRanges[0].values;

				const rows = [];
				for (let i = 1; i < batchRowValues.length; i++) {
					let rowObject = {};
					for (let j = 0; j < batchRowValues[i].length; j++) {
						rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
					}
					rows.push(rowObject);
				}

				// dropdown options
				let dropdownOptions = [];

				for (let i = 0; i < rows.length; i++) {
					dropdownOptions.push(rows[i].month);
				}

				dropdownOptions = Array.from(
					new Set(dropdownOptions)
				).reverse();

				this.setState(
					{
						totalenergy: 8000,
						totalexpenditure: 8000,
						// myDataSource: {
						// 	chart: {
						// 		caption: "Harry's SuperMart",
						// 		subCaption:
						// 			"Top 5 stores in last month by revenue",
						// 		numberPrefix: "$",
						// 	},
						// 	data: [
						// 		{
						// 			label: "Bakersfield Central",
						// 			value: "880000",
						// 		},
						// 		{
						// 			label: "Garden Groove harbour",
						// 			value: "730000",
						// 		},
						// 		{
						// 			label: "Los Angeles Topanga",
						// 			value: "590000",
						// 		},
						// 		{
						// 			label: "Compton-Rancho Dom",
						// 			value: "520000",
						// 		},
						// 		{
						// 			label: "Daly City Serramonte",
						// 			value: "330000",
						// 		},
						// 	],
						// },

						items: rows,
						dropdownOptions: dropdownOptions,
						selectedValue: "Jan 2018",
					},
					() => this.getData("Jan 2018")
				);
			});
	}

	render() {
		return (
			<Container>
				{/* static navbar - top */}
				<Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
					<Container className="navbar-brand h1 mb-0 text-large font-medium">
						Energy Consumption Dashboard
					</Container>
					<Container className="navbar-nav ml-auto">
						<Container className="user-detail-section">
							<span className="pr-2">Hi, Sean</span>
							<span className="img-container">
								{/* <img
									src={UserImg}
									className="rounded-circle"
									alt="user"
								/> */}
							</span>
						</Container>
					</Container>
				</Nav>

				{/* static navbar - bottom */}
				<Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
					<Container className="text-medium">Summary</Container>
					<Container className="navbar-nav ml-auto">
						{/* <Dropdown
							className="pr-2 custom-dropdown"
							options={this.state.dropdownOptions}
							onChange={this.updateDashboard}
							value={this.state.selectedValue}
							placeholder="Select an option"
						/> */}
					</Container>
				</Nav>

				{/* content area start */}
				<Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
					{/* row 1 - revenue */}
					<Container className="row">
						<Container className="col-lg-3 col-sm-6 is-light-text mb-4">
							<Container className="card grid-card is-card-dark">
								<Container className="card-heading">
									<Container className="is-dark-text-light letter-spacing text-small">
										Total Energy Consumption
									</Container>
								</Container>

								<Container className="card-value pt-4 text-x-large">
									{this.state.totalenergy}
								</Container>
							</Container>
						</Container>

						<Container className="col-lg-3 col-sm-6 is-light-text mb-4">
							<Container className="card grid-card is-card-dark">
								<Container className="card-heading">
									<Container className="is-dark-text-light letter-spacing text-small">
										Total Expenditure
									</Container>
									<Container className="card-heading-brand">
										<i className="fab fa-amazon text-large" />
									</Container>
								</Container>

								<Container className="card-value pt-4 text-x-large">
									<span className="text-large pr-1">₹</span>
									{this.state.totalexpenditure}
								</Container>
							</Container>
						</Container>

						<Container className="col-lg-3 col-sm-6 is-light-text mb-4">
							<Container className="card grid-card is-card-dark">
								<Container className="card-heading">
									<Container className="is-dark-text-light letter-spacing text-small">
										Total Energy Consumption
									</Container>
								</Container>

								<Container className="card-value pt-4 text-x-large">
									{this.state.totalenergy}
								</Container>
							</Container>
						</Container>

						<Container className="col-lg-3 col-sm-6 is-light-text mb-4">
							<Container className="card grid-card is-card-dark">
								<Container className="card-heading">
									<Container className="is-dark-text-light letter-spacing text-small">
										Total Expenditure
									</Container>
									<Container className="card-heading-brand">
										<i className="fab fa-amazon text-large" />
									</Container>
								</Container>

								<Container className="card-value pt-4 text-x-large">
									<span className="text-large pr-1">₹</span>
									{this.state.totalexpenditure}
								</Container>
							</Container>
						</Container>
					</Container>

					<Container className="row">
						<ReactFC
							{...{
								id: "revenue-chart",
								renderAt: "revenue-chart-container",
								type: "column2d",
								width: 600,
								height: 400,
								// dataFormat: "json",
								dataSource: {
									chart: {
										caption: "Harry's SuperMart",
										subCaption:
											"Top 5 stores in last month by revenue",
										numberPrefix: "$",
									},
									data: [
										{
											label: "Bakersfield Central",
											value: "880000",
										},
										{
											label: "Garden Groove harbour",
											value: "730000",
										},
										{
											label: "Los Angeles Topanga",
											value: "590000",
										},
										{
											label: "Compton-Rancho Dom",
											value: "520000",
										},
										{
											label: "Daly City Serramonte",
											value: "330000",
										},
									],
								},
							}}
						/>
						,
						{/* <Container className="col-md-8 col-lg-9 is-light-text mb-4">
							<Container className="card is-card-dark chart-card">
								<Container className="row full-height">
									<Container className="col-sm-4 full height">
										<Container className="chart-container full-height">
											<ReactFC
												{...{
													type: "doughnut2d",
													width: "100%",
													height: "100%",
													dataFormat: "json",
													containerBackgroundOpacity:
														"0",
													dataSource: {
														chart: {
															caption:
																"Purchase Rate",
															theme: "ecommerce",
															defaultCenterLabel: 43,
															paletteColors:
																"#3B70C4, #000000",
														},
														data: [
															{
																label: "active",
																value: 43,
															},
															{
																label:
																	"inactive",
																alpha: 5,
																value: `${
																	100 - 43
																}`,
															},
														],
													},
												}}
											/>
										</Container>
									</Container>
									<Container className="col-sm-4 full-height border-left border-right">
										<Container className="chart-container full-height">
											<ReactFC
												{...{
													type: "doughnut2d",
													width: "100%",
													height: "100%",
													dataFormat: "json",
													containerBackgroundOpacity:
														"0",
													dataSource: {
														chart: {
															caption:
																"Checkout Rate",
															theme: "ecommerce",
															defaultCenterLabel: 43,
															paletteColors:
																"#41B6C4, #000000",
														},
														data: [
															{
																label: "active",
																value: 43,
															},
															{
																label:
																	"inactive",
																alpha: 5,
																value: `${
																	100 - 43
																}`,
															},
														],
													},
												}}
											/>
										</Container>
									</Container>
									<Container className="col-sm-4 full-height">
										<Container className="chart-container full-height">
											<ReactFC
												{...{
													type: "doughnut2d",
													width: "100%",
													height: "100%",
													dataFormat: "json",
													containerBackgroundOpacity:
														"0",
													dataSource: {
														chart: {
															caption:
																"Abandoned Cart Rate",
															theme: "ecommerce",
															defaultCenterLabel: 43,
															paletteColors:
																"#EDF8B1, #000000",
														},
														data: [
															{
																label: "active",
																value: 43,
															},
															{
																label:
																	"inactive",
																alpha: 5,
																value: `${
																	100 - 43
																}`,
															},
														],
													},
												}}
											/>
										</Container>
									</Container>
								</Container>
							</Container>
						</Container> */}
					</Container>
				</Container>
			</Container>
		);
	}
}
