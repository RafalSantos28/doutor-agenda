"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromWeekDay = parsedInput.availableFromWeekDay;
    const availableToWeekDay = parsedInput.availableToWeekDay;

    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(parsedInput.availableFromTime.split(":")[0]))
      .set("minute", parseInt(parsedInput.availableFromTime.split(":")[1]))
      .utc()
      .toDate();

    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(parsedInput.availableToTime.split(":")[0]))
      .set("minute", parseInt(parsedInput.availableToTime.split(":")[1]))
      .utc()
      .toDate();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }
    if (!session?.user.clinic?.id) {
      throw new Error("Clínica não encontrada");
    }
    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user.clinic?.id,
        availableFromTime: availableFromTimeUTC.format("HH:mm"),
        availableToTime: availableToTimeUTC.format("HH:mm"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: availableFromTimeUTC.format("HH:mm"),
          availableToTime: availableToTimeUTC.format("HH:mm"),
        },
      });
  });
