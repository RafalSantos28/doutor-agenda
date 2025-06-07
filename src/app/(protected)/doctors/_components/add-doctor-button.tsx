"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

const AddDoctorButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4" />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm onClose={() => {}} />
    </Dialog>
  );
};

export default AddDoctorButton;
