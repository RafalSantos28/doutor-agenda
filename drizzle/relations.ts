import { relations } from "drizzle-orm/relations";
import { clinics, appointments, patients, doctors, usersToClinics } from "./schema";

export const appointmentsRelations = relations(appointments, ({one}) => ({
	clinic: one(clinics, {
		fields: [appointments.clinicId],
		references: [clinics.id]
	}),
	patient: one(patients, {
		fields: [appointments.patientId],
		references: [patients.id]
	}),
	doctor: one(doctors, {
		fields: [appointments.doctorId],
		references: [doctors.id]
	}),
}));

export const clinicsRelations = relations(clinics, ({many}) => ({
	appointments: many(appointments),
	patients: many(patients),
	doctors: many(doctors),
	usersToClinics: many(usersToClinics),
}));

export const patientsRelations = relations(patients, ({one, many}) => ({
	appointments: many(appointments),
	clinic: one(clinics, {
		fields: [patients.clinicId],
		references: [clinics.id]
	}),
}));

export const doctorsRelations = relations(doctors, ({one, many}) => ({
	appointments: many(appointments),
	clinic: one(clinics, {
		fields: [doctors.clinicId],
		references: [clinics.id]
	}),
}));

export const usersToClinicsRelations = relations(usersToClinics, ({one}) => ({
	clinic: one(clinics, {
		fields: [usersToClinics.clinicId],
		references: [clinics.id]
	}),
}));