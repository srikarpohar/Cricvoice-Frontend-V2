import { useState } from "react";
import { Spinner } from "@srikarpohar/cricvoice-library";
import { AppHeader } from "../../components/app-header/app-header";
import { useRefreshTokenQuery } from "../../redux-state/auth/authApiSlice";
import "./home.page.scss";

interface IProps {}

interface IState {}

export const HomePage = (props: IProps) => {
  const [state, setState] = useState<IState>({});

  const { isLoading } = useRefreshTokenQuery();

  return (
    <div>
      <Spinner show={isLoading} />
      <AppHeader />
    </div>
  );
};
