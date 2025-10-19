import AccountsCarrusel from "../modules/balance_accounts/components/AccountsCarrusel";
import LastMovementTable from "../modules/balance_operations/components/LastMovementTable";
import BaseLayout from "./components/BaseLayout";
import MovementButtons from "./components/MovementButtons";

function Home() {
  return (
    <>
      <BaseLayout>
        <AccountsCarrusel />
        <MovementButtons />
        <LastMovementTable />
      </BaseLayout>
    </>
  );
}

export default Home;
