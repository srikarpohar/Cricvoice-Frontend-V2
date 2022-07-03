import { useState } from "react";
import { Spinner } from "../../common/loaders/spinner/spinner.component";
import { useLoginUserMutation } from "../../redux-state/auth/authApiSlice";
import "./login.page.scss";

interface IProps{

}

interface IState{
	username: string,
	password: string,
	showPassword: boolean,
	errorMessage: string
}

export const LoginPage = (props: IProps) => {
	const [state, setState] = useState<IState>({
		username: '',
		password: '',
		showPassword: false,
		errorMessage: ''
	});

	const [loginUser, {isLoading}] = useLoginUserMutation();

	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();

			if(!state.username || !state.password) {
				setState({
					...state,
					errorMessage: 'Enter both username and password to continue'
				});
				return;
			}

			const result = await loginUser({
				username: state.username,
				password: state.password
			}).unwrap();
			if(result.errorMessage) {
				setState({
					...state,
					errorMessage: result.errorMessage
				});
			}
		} catch(err: any) {
			setState({
				...state,
				errorMessage: err.toString()
			});
		}
	}

	return (<div className="login-container mx-auto h-100 p-2 mt-12 d-flex flex-column align-items-center">
		<h3 className="text-center">Login</h3>
		<Spinner show={isLoading} />
		<form className="w-100 p-2">
			<div className="mb-3">
				<label htmlFor="username" className="form-label">Username<span className="text-danger">*</span></label>
				<input type="text" required className="form-control" id="username" aria-describedby="username"
					onChange={(event) => setState({
						...state,
						username: event.target.value
					})}>
				</input>
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>

				<div className="d-flex">
					<input type={`${state.showPassword ? 'text' : 'password'}`} required 
						className="form-control" id="password" aria-describedby="password"
						onChange={(event) => setState({
							...state,
							password: event.target.value
						})}>
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

			{state.errorMessage && 
				<div className="mb-3">
					<span className="text-danger">{state.errorMessage}</span>
				</div>
			}

			<div className="d-flex justify-content-around">
				<button type="button" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Submit</button>
				<a href="/signup" role="button" className="btn btn-secondary" >SignUp</a>
			</div>
		</form>
	</div>);
}
