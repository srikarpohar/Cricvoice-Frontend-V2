import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../common/loaders/spinner/spinner.component";
import { useLoginUserMutation, useSignUpUserMutation } from "../../redux-state/auth/authApiSlice";
import './signup.page.scss';

interface IProps{

}

interface IState{
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	profilePic: {
		data?: File,
		showPreview: boolean
	};

	showPassword: boolean;
	errorMessage: string;
}

const defaultState: IState = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	profilePic: {
		showPreview: false
	},

	showPassword: false,
	errorMessage: '',
}

export const SignupPage = (props: IProps) => {
	const [state, setState] = useState<IState>(defaultState);

	const [signUpUser, {isLoading}] = useSignUpUserMutation();

	const [loginUser, {isLoading: isLoginLoading}] = useLoginUserMutation();

	const navigate = useNavigate();

	useEffect(() => {
		let {...stateDetails} = state as any;

		if(stateDetails['password'] != stateDetails['confirmPassword']) {
			setState({
				...state,
				errorMessage: 'Confirm the password in the confirm password field'
			})
		} else {
			setState({
				...state,
				errorMessage: ''
			})
		}
	}, [state.confirmPassword, state.password])

	const onChangeFields = (property: string, value: string | Object) => {
		setState({
			...state,
			[property]: value
		});
	}

	const validateUserData = () => {
		let {...stateDetails} = state as any;
		for(let property in stateDetails) {
			if(property != 'errorMessage' && property != 'showPassword' && !stateDetails[property.toString()])
				return {
					isValid: false,
					message: 'Enter all red marked fields for signing up'
				};
		}

		if(!stateDetails['profilePic']['data'])
			return {
				isValid: false,
				message: 'Provide a profile picture'
			};

		if(stateDetails['password'] != stateDetails['confirmPassword'])
			return {
				isValid: false,
				message: 'Confirm the password before signing up'
			}

		return {
			isValid: true,
			message: ''
		};
	}

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const { isValid, message } = validateUserData();

		if(isValid) {
			const result = await signUpUser({
				firstName: state.firstName,
				lastName: state.lastName,
				username: state.username,
				email: state.email,
				password: state.password,
				profilePic: state.profilePic.data
			}).unwrap();

			if(result.errorMessage) {
				setState({
					...state,
					errorMessage: result.errorMessage
				})
			} else {
				const loginResponse = await loginUser({
						username: state.username,
						password: state.password
					}).unwrap();

				if(loginResponse.errorMessage) {
					setState({
						...state,
						errorMessage: loginResponse.errorMessage
					})
				} else {
					navigate("/")
				}
			}
		} else {
			setState({
				...state,
				errorMessage: message
			})
		}
	}

	return (<div className="signup-container mx-auto my-3 p-1 d-flex flex-column align-items-center">
		<h3 className="text-center">SignUp</h3>
		<Spinner show={isLoading || isLoginLoading} />
		
		<form className="w-100 p-2">
			<div className="mb-3">
				<label htmlFor="firstname" className="form-label">First Name<span className="text-danger">*</span></label>
				<input type="text" required className="form-control" id="firstname" aria-describedby="firstname"
					onChange={(event) => onChangeFields('firstName', event.target.value)}>
				</input>
			</div>

			<div className="mb-3">
				<label htmlFor="lastname" className="form-label">Last Name<span className="text-danger">*</span></label>
				<input type="text" required className="form-control" id="lastname" aria-describedby="lastname"
					onChange={(event) => onChangeFields('lastName', event.target.value)}>
				</input>
			</div>

			<div className="mb-3">
				<label htmlFor="username" className="form-label">Username<span className="text-danger">*</span></label>
				<input type="text" required className="form-control" id="username" aria-describedby="username"
					onChange={(event) => onChangeFields('username', event.target.value)}>
				</input>
			</div>

			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
				<input type="email" required className="form-control" id="email" aria-describedby="email"
					onChange={(event) => onChangeFields('email', event.target.value)}>
				</input>
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
				
				<div className="d-flex">
					<input type={state.showPassword ? "text" : "password"} required className="form-control w-95"
					 	id="password" aria-describedby="password"
						onChange={(event) => onChangeFields('password', event.target.value)}>
					</input>

					<a onClick={(event) => {
						event.preventDefault();
						setState({
							...state,
							showPassword: !state.showPassword
						})
					}}>
						<i className={`bi bi-eye${state.showPassword ? '-fill' : ''} show-icon`}></i>
					</a>
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="confirmPassword" className="form-label">Confirm Password<span className="text-danger">*</span></label>

				<div className="d-flex">
					<input type={state.showPassword ? 'text' : 'password'} required className="form-control w-95" id="confirmPassword" aria-describedby="confirmPassword"
						onChange={(event) => onChangeFields('confirmPassword', event.target.value)}>
					</input>

					<a onClick={() => setState({
							...state,
							showPassword: !state.showPassword
						})}>
						<i className={`bi bi-eye${state.showPassword ? '-fill' : ''} show-icon`}></i>
					</a>
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="profilePic" className="form-label">Profile Picture<span className="text-danger">*</span></label>

				<div className="d-flex">
					<input type="file" required className="form-control" id="profilePic" aria-describedby="profilePic"
						onChange={(event: any) => {
							let value = {
								data: event.target.files[0],
								showPreview: false
							}
							onChangeFields('profilePic', value);
						}}>
					</input>

					<a onClick={() => setState({
							...state,
							profilePic: {
								...state.profilePic,
								showPreview: !state.profilePic.showPreview
							}
						})}>
						<i className={`bi bi-eye${state.profilePic.showPreview ? '-fill' : ''} show-icon`}></i>
					</a>

					<a onClick={() => setState({
						...state,
						profilePic: {
							data: undefined,
							showPreview: false
						}
					})}><i className="bi bi-trash show-icon text-danger"></i></a>
				</div>
			</div>

			{state.errorMessage && 
				<div className="mb-3">
					<span className="text-danger">{state.errorMessage}</span>
				</div>
			}

			{state.profilePic.showPreview && state.profilePic.data &&
				<figure>
					<img src={URL.createObjectURL(state.profilePic.data)} 
						alt="Image Not loaded"
						width={"100%"}></img>
					<figcaption className="text-center">{state.profilePic.data?.name}</figcaption>
				</figure>
			}

			<div className="d-flex justify-content-around">
				<button type="button" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Submit</button>
				<a href="/login" role="button" className="btn btn-secondary">Login</a>
			</div>
		</form>
	</div>);
}