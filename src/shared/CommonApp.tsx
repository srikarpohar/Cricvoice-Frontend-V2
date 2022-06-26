import React from "react";

interface IProps{

}

interface IState{

}

export class CommonApp extends React.Component<IProps, IState>{

	constructor(props:IProps){
		super(props);
		this.state = {};
	}

	componentDidMount(){
	}

	render(){
		return (<div></div>);
	}
}
