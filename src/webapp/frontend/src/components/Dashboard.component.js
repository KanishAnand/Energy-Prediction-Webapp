import React, { Component } from "react";
import { Container, Nav } from "./styled.component";
import ls from "local-storage";
// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./charts-theme.js";

import config from "./config";
import formatNum from "./format-number";

ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			totalenergy: 0,
			totalexpenditure: 0,
			consumptionArr: [],
			expenditureArr: [],
		};
	}

	fetchInfo = () => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				let batchRowValues = data.valueRanges[0].values;

				const rows = [];
				for (let i = 1; i < batchRowValues.length; i++) {
					let rowObject = {};
					for (let j = 0; j < batchRowValues[i].length; j++) {
						rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
					}
					rows.push(rowObject);
				}
				// console.log(rows);

				let expenditure = 0,
					consumption = 0;

				for (let i = 0; i < rows.length; i++) {
					expenditure += parseInt(rows[i].expenditure);
					consumption += parseInt(rows[i].consumption);
				}

				let consumptionArr = [];
				let expenditureArr = [];

				for (let i = 0; i < rows.length; i++) {
					expenditureArr.push({
						label: rows[i].month,
						value: rows[i].expenditure,
					});
				}

				for (let i = 0; i < rows.length; i++) {
					consumptionArr.push({
						label: rows[i].month,
						value: rows[i].consumption,
					});
				}

				// console.log(consumptionArr);
				// console.log(expenditureArr);

				this.setState({
					totalenergy: consumption,
					totalexpenditure: expenditure,
					expenditureArr: expenditureArr,
					consumptionArr: consumptionArr,
				});
			});
	};

	componentDidMount() {
		if (this.props.match.params.id) {
			if (
				ls.get("username") !== this.props.match.params.id ||
				ls.get("userType") !== this.props.match.params.type
			) {
				ls.clear();
				window.location.href = "/login";
			}
		} else {
			if (ls.get("username") !== null) {
				window.location.href =
					"/" +
					ls.get("userType") +
					"/" +
					ls.get("username") +
					"/home";
			}
		}
		this.fetchInfo();
	}

	render() {
		return (
			<Container>
				{/* static navbar - top */}
				{/* <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
              <Container className="navbar-brand h1 mb-0 text-large font-medium">
                Energy Consumption Dashboard
              </Container>
              <Container className="navbar-nav ml-auto">
                <Container className="user-detail-section">
                  <span className="pr-2">Hi, Sean</span>
                  <span className="img-container">
                    <img
										src={UserImg}
										className="rounded-circle"
										alt="user"
									/>
                  </span>
                </Container>
              </Container>
            </Nav> */}

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
									<span className="text-large pr-1">
										{"  "}
										Kw/hr
									</span>
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
									<span className="text-large pr-1">
										₹{"  "}
									</span>
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
									{this.state.totalenergy}
									<span className="text-large pr-1">
										{"  "}
										Kw/hr
									</span>
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
									<span className="text-large pr-1">
										₹{"  "}
									</span>
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
											// containerBackgroundOpacity: "0",
											dataEmptyMessage: "Loading Data...",
											dataSource: {
												chart: {
													caption:
														"Yearly Energy Consumption",
													numberSuffix: "Kw/hr",
												},
												data: this.state.consumptionArr,
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
											// containerBackgroundOpacity: "0",
											dataEmptyMessage: "Loading Data...",
											dataSource: {
												chart: {
													numberPrefix: "₹",
													caption:
														"Yearly Expenditure",
												},
												data: this.state.expenditureArr,
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
