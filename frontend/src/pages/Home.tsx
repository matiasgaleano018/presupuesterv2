import AccountsCarrusel from "../modules/balance_accounts/components/AccountsCarrusel";
import MovementButtons from "./components/MovementButtons";
import UserHeader from "./components/UserHeader";

function Home() {
  return (
    <>
      <div className="layout-boxed">
        <div className="page">
          <UserHeader />
          <AccountsCarrusel />
          <MovementButtons />
        </div>
      </div>
    </>
  );
}

export default Home;
