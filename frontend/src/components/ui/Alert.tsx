type Props = {
  menssage: string;
  type: "success" | "danger" | "info" | "warning";
};

function Alert({ menssage, type }: Props) {
  return (
    <>
      <div className={`alert alert-${type} my-2`} role="alert">
        {menssage}
      </div>
    </>
  );
}

export default Alert;
