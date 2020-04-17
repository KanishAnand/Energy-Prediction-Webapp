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
import formatNum from "./format-number";
import { UserNavbar } from "./navbar.component";

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

				<UserNavbar
					username={this.props.match.params.id}
					userType={this.props.match.params.type}
				/>

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
									<span className="text-large pr-1">$</span>
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
									{/* <Container className="card-heading-brand">
										<i className="fab fa-amazon text-large" />
									</Container> */}
								</Container>

								<Container className="card-value pt-4 text-x-large">
									<span className="text-large pr-1">$</span>
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
									{/* <Container className="card-heading-brand">
										<i className="fab fa-ebay text-x-large logo-adjust" />
									</Container> */}
								</Container>

								<Container className="card-value pt-4 text-x-large">
									<span className="text-large pr-1">$</span>
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
									{/* <Container className="card-heading-brand">
										<i className="fab fa-etsy text-medium" />
									</Container> */}
								</Container>

								<Container className="card-value pt-4 text-x-large">
									<span className="text-large pr-1">$</span>
									{this.state.totalexpenditure}
								</Container>
							</Container>
						</Container>
					</Container>

					{/* row 3 - orders trend */}
					<Container className="row" style={{ minHeight: "600px" }}>
						<Container className="col-md-6 mb-4">
							<Container className="card is-card-dark chart-card">
								<Container className="chart-container large full-height">
									<ReactFC
										{...{
											type: "column2d",
											width: "100%",
											height: "100%",
											dataFormat: "json",
											containerBackgroundOpacity: "0",
											dataEmptyMessage: "Loading Data...",
											dataSource: {
												chart: {
													caption:
														"Yearly Energy Consumption",
													numberSuffix: "Kw/hr",
												},
												data: [
													{
														label: "January",
														value: "800",
													},
													{
														label: "February",
														value: "730",
													},
													{
														label: "March",
														value: "590",
													},
													{
														label: "April",
														value: "520",
													},
													{
														label: "May",
														value: "800",
													},
													{
														label: "June",
														value: "730",
													},
													{
														label: "July",
														value: "590",
													},
													{
														label: "August",
														value: "520",
													},
													{
														label: "September",
														value: "800",
													},
													{
														label: "October",
														value: "730",
													},
													{
														label: "November",
														value: "590",
													},
													{
														label: "December",
														value: "520",
													},
												],
											},
										}}
									/>
								</Container>
							</Container>
						</Container>

						<Container className="col-md-6 mb-4">
							<Container className="card is-card-dark chart-card">
								<Container className="chart-container large full-height">
									<ReactFC
										{...{
											type: "pie3d",
											width: "100%",
											height: "100%",
											dataFormat: "json",
											containerBackgroundOpacity: "0",
											dataEmptyMessage: "Loading Data...",
											dataSource: {
												chart: {
													caption:
														"Yearly Energy Consumption",
													numberSuffix: "Kw/hr",
												},
												data: [
													{
														label: "January",
														value: "800",
													},
													{
														label: "February",
														value: "730",
													},
													{
														label: "March",
														value: "590",
													},
													{
														label: "April",
														value: "520",
													},
													{
														label: "May",
														value: "800",
													},
													{
														label: "June",
														value: "730",
													},
													{
														label: "July",
														value: "590",
													},
													{
														label: "August",
														value: "520",
													},
													{
														label: "September",
														value: "800",
													},
													{
														label: "October",
														value: "730",
													},
													{
														label: "November",
														value: "590",
													},
													{
														label: "December",
														value: "520",
													},
												],
											},
										}}
									/>
								</Container>
							</Container>
						</Container>
					</Container>
				</Container>
				{/* content area end */}
			</Container>
		);
	}
}
