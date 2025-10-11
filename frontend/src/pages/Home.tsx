import AccountsCarrusel from "../modules/balance_accounts/components/AccountsCarrusel";
import MovementTable from "../modules/balance_operations/components/MovementTable";
import BaseLayout from "./components/BaseLayout";
import MovementButtons from "./components/MovementButtons";

function Home() {
  return (
    <>
      <BaseLayout>
        <AccountsCarrusel />
        <MovementButtons />
        <MovementTable />
      </BaseLayout>
    </>
  );
}

export default Home;
