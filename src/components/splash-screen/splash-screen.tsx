import { useState } from "react";
import { APP_THEMES } from "../../redux-state/stateModels";

interface IProps{
	theme: APP_THEMES
}

interface IState{

}

export const SplashScreen = (props: IProps) => {
	const [state, setState] = useState<IState>({});

	return (<div></div>);
}