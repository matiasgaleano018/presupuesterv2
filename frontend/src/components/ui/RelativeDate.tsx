import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function RelativeDate({ date }: { date: string | Date }) {
  return (
    <span>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: es,
      })}
    </span>
  );
}

export default RelativeDate;
