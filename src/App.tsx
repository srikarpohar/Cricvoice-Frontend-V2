import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { IGlobalStoreState } from "./redux-state/stateModels";
import { AppDispatch } from "./redux-state/store";

interface IProps{

}

interface IState{

}

class App extends React.Component<IProps, IState>{

	constructor(props:IProps){
		super(props);
		this.state = {};
	}

	componentDidMount(){
	}

	render(){
		return (<div className="text-center">Hello world</div>);
	}
}

const mapStateToProps = (state: IGlobalStoreState, ownProps: any) => {
	// ... computed data from state and optionally ownProps
	return { loginInfo: state.login };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
	return { };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);
