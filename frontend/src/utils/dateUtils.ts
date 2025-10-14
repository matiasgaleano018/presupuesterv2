import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const ASUNCION_TZ = 'America/Asuncion';

// Convierte la fecha UTC a Date en zona Asunción
export function toAsuncionDate(date: string | Date): Date {
  const d = dayjs.utc(date).tz(ASUNCION_TZ);
  console.log('Original:', date, '→ Asunción:', d.format()); // para debug
  return d.toDate();
}

// Formatea la fecha UTC a string en horario Asunción
export function formatAsuncionDate(
  date: string | Date,
  format = 'YYYY-MM-DD HH:mm'
): string {
  const formatted = dayjs.utc(date).tz(ASUNCION_TZ).format(format);
  //console.log('UTC:', date, '→ formatted Asunción:', formatted); // para debug
  return formatted;
}
