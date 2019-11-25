import React, { Component } from "react";
import "./SignForm.css";
import axios, { post } from 'axios';

class SignForm extends Component {
	constructor() {
		super();
		this.state = { id: null };
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = (event) => {
		const data = new FormData(event.target);
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		
		let body={'visitorname':event.target[0].value,
				'visitorphoneno': event.target[2].value,
				'visitoremail':event.target[1].value,
				'hostname':event.target[3].value,
				'hostphoneno':event.target[5].value,
				'hostemail': event.target[4].value};
		console.log( body)
		post('http://localhost:3000/api/entry',{
			body,
			config
		})
		.then((res)=>{
			this.setState({ id: res.data.message})
		})
	};

	handleClick = (event) => {
		const data = new FormData(event.target);
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		let body={'id':event.target[0].value};

		post('http://localhost:3000/api/exit', {
			body,
			config
		})
	};

	componentDidMount() {
		const signUpButton = document.getElementById("signUp");
		const signInButton = document.getElementById("signIn");
		const container = document.getElementById("container");
		if (this.state.id) {
			container.style.display = "none";
			setTimeout(() => {
				this.setState({ id: null });
				container.style.display = "block";
			}, 5000);
		}

		signUpButton.addEventListener("click", () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener("click", () => {
			container.classList.remove("right-panel-active");
		});
	}

	render() {
		return (
			<>
				<div class="container" id="container">
					<div class="form-container sign-up-container">
						<form id="entryform" onSubmit={ (event) => {
							event.preventDefault()
							this.onSubmit(event);
						}}>
							<h1>Welcome</h1>
							<span>Please enter the details below</span>
							<input type="text" id = "visitorname" placeholder="Your Name" />
							<input type="email" id = "visitoremail" placeholder="Your Email" />
							<input type="Number" id = "visitorphoneno" placeholder="Host Number" />
							<input type="text" id = "hostname" placeholder="Host Name" />
							<input type="email" id = "hostemail" placeholder="Host Email" />
							<input type="Number" id = "hostphoneno" placeholder="Host Number" />
							<button type="submit">Sign Up</button>
						</form>
					</div>

					<div class="form-container sign-in-container">
						<form id="exitform" onSubmit={ (event) => {
							event.preventDefault()
							this.handleClick(event);
						}}>
							<h1>Thanks for Visit</h1>
							<span>Please enter your Id</span>
							<input type="Text" placeholder="Enter Your Id" />
							<button type="submit">Enter</button>
						</form>
					</div>

					<div class="overlay-container">
						<div class="overlay">
							<div class="overlay-panel overlay-left">
								<h1>Going back?</h1>
								<p>
									Give us Your Visit id
								</p>
								<button class="ghost" id="signIn">
									Leave
								</button>
							</div>

							<div class="overlay-panel overlay-right">
								<h1>Hello, Friend!</h1>
								<p>Just came for your meeting? Help us to maintain our record</p>
								<button class="ghost" id="signUp">
									Visit
								</button>
							</div>
						</div>
					</div>
				</div>
				{(this.state.id!=null) ? <h1>Visit id:{this.state.id}</h1>:<h1></h1>}
			</>
		);
	}
}

export default SignForm;
