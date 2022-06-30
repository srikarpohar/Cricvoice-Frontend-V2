import { QueryResultSelectorResult } from "@reduxjs/toolkit/dist/query/core/buildSelectors";
import React from "react";
import { connect } from "react-redux";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Spinner } from "./components/loaders/spinner/spinner.component";
import { IResponse, IUser } from "./models";
import { authEndPoints } from "./redux-state/auth/authApiSlice";
import { RootState } from "./redux-state/store";
import { LoginPage } from "./pages/login/login.page";
import { SignupPage } from "./pages/signup/signup.page";
import { HomePage } from "./pages/home/home.page";

interface IProps{
	loginInfo: QueryResultSelectorResult<any>,
	getLoginInfo: any
}

interface IState{

}

class App extends React.Component<IProps, IState>{

	constructor(props:IProps){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		this.props.getLoginInfo();
	}

	getInitialComponent() {
		const loginInfo = this.props.loginInfo;
		if(loginInfo.isLoading) {
			return (<Spinner show={true} />)
		}

		if(loginInfo?.data) {
			const { success, data } = loginInfo.data as Omit<IResponse, 'data'> & {
				data: { user: IUser, accessToken: string }
			};

			if(success) {
				if(data.user?.isAdmin) {
					return (<React.Fragment>
						Unauthorized entry to admin
					</React.Fragment>);
				} else {
					return (<HomePage />);
				}
			} else {
				return (<LoginPage />)
			}
		}
	}

	render(){
		return (<Routes>
			<Route path="/" element={this.getInitialComponent()} />

			<Route path="/login" element={<LoginPage />} />

			<Route path="/signup" element={<SignupPage />} />
		</Routes>);
	}
}

const mapStateToProps = (state: RootState, ownProps: any) => {
	// ... computed data from state and optionally ownProps
	return { 
		loginInfo: authEndPoints.refreshToken.select()(state)
	};
};
  
  const mapDispatchToProps = {
	getLoginInfo: authEndPoints.refreshToken.initiate
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
