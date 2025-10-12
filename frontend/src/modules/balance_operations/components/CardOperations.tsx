import RelativeDate from "../../../components/ui/RelativeDate";

type Props = {
  title: string;
  children: React.ReactNode;
  footer: string;
};
function CardOperations({ title, children, footer }: Props) {
  return (
    <>
      <div className="card">
        <div className="card-header border-0">
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-body">{children}</div>
        <div className="card-footer">
          <RelativeDate date={footer} />
        </div>
      </div>
    </>
  );
}

export default CardOperations;
