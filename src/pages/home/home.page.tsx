import { useState } from "react";
import { Spinner } from "../../components/loaders/spinner/spinner.component";

interface IProps{

}

interface IState{

}

export const HomePage = (props: IProps) => {
	const [state, setState] = useState<IState>({});

	return (<div>
		<Spinner show={true} />
	</div>);
}