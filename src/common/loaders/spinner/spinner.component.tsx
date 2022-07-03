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
		return (<div className="screen">
		<section className="stage">
			<figure className="ball">
				<span className="shadow"></span>
				<span className="line"></span>
			</figure>
		</section>

		<section className="ground">
		</section>

	</div>);
	} else
		return null;
}