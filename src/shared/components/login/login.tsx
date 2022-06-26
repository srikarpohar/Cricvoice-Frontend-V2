import { useState } from "react";
import { useDispatch } from "react-redux";

interface IProps{

}

interface IState{

}

export const Login = (props: IProps) => {
	const [state, setState] = useState<IState>({});

	// use dispatch hook.
	const dispatch = useDispatch();

	return (<div></div>);
}