import { useState } from "react";
import { useLoginUserMutation } from "../../redux-state/auth/authApiSlice";
import "./login.page.scss";

interface IProps{

}

interface IState{
	username: string,
	password: string
}

export const LoginPage = (props: IProps) => {
	const [state, setState] = useState<IState>({
		username: '',
		password: ''
	});

	const [loginUser, {isLoading}] = useLoginUserMutation();

	const handleSubmit = async (event: any) => {
		try {
			event.preventDefault();
			const result = await loginUser({
				username: state.username,
				password: state.password
			}).unwrap();
			console.log(result)
		} catch(err) {
			console.log(err);
		}
	}

	return (<div className="login-container mx-auto h-100 p-2 mt-12 d-flex flex-column align-items-center">
		<h3 className="text-center">Login</h3>
		{isLoading && <h6>Loading</h6>}
		<form className="w-100 p-2">
			<div className="mb-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text" required className="form-control" id="username" aria-describedby="username"
					onChange={(event) => setState({
						...state,
						username: event.target.value
					})}></input>
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password" required className="form-control" id="password" aria-describedby="password"
					onChange={(event) => setState({
						...state,
						password: event.target.value
					})}></input>
			</div>

			<div className="d-flex justify-content-around">
				<button type="button" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Submit</button>
				<a href="/signup" role="button" className="btn btn-secondary" >SignUp</a>
			</div>
		</form>
	</div>);
}
