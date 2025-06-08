import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale("pt-br");

export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekday)
    .set("hour", parseInt(doctor.availableFromTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableFromTime.split(":")[1]))
    .local();

  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekday)
    .set("hour", parseInt(doctor.availableToTime.split(":")[0]))
    .set("minute", parseInt(doctor.availableToTime.split(":")[1]))
    .local();

  return {
    from,
    to,
  };
};
