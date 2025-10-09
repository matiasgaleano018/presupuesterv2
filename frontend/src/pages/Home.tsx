import AccountsCarrusel from "../modules/balance_accounts/components/AccountsCarrusel";
import MovementTable from "../modules/balance_operations/components/MovementTable";
import MovementButtons from "./components/MovementButtons";
import Navbar from "./components/Navbar";
import UserHeader from "./components/UserHeader";

function Home() {
  return (
    <>
      <div className="layout-boxed">
        <div className="page">
          <UserHeader />
          <Navbar />
          <AccountsCarrusel />
          <MovementButtons />
          <MovementTable />
        </div>
      </div>
    </>
  );
}

export default Home;
