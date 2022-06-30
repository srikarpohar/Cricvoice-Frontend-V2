import { useState } from "react";
import './spinner.component.scss';

interface IProps{
	show: boolean
}

interface IState{

}

export const Spinner = (props: IProps) => {
	const [state, setState] = useState<IState>({});

	if(props.show) {
		return (<div className="w-100 h-100 container d-flex justify-content-center align-items-center">
			Hello world
		</div>);
	} else
		return null;
}