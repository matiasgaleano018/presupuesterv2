import Navbar from "./Navbar";
import UserHeader from "./UserHeader";

type Props = {
  children: React.ReactNode;
};
function BaseLayout({ children }: Props) {
  return (
    <>
      <div className="layout-boxed">
        <div className="page">
          <UserHeader />
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
