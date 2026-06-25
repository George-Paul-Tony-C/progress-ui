import { useEffect } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  getJournal,
  updateJournal,
} from "../../services/journal/journalService";

import {
  journalSchema,
  type JournalFormData,
} from "./schema/journalSchema";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";

export default function EditJournalPage() {

  const navigate = useNavigate();

  const { journalId } = useParams();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "journal",
      journalId,
    ],
    queryFn: () =>
      getJournal(
        journalId!
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<JournalFormData>({
    resolver: zodResolver(
      journalSchema
    ),
  });

  useEffect(() => {

    if (!data) {
      return;
    }

    reset({
      entryDate: data.entryDate,
      title: data.title,
      summary: data.summary,
      notes: data.notes,
      mood: data.mood,
      hoursSpent: data.hoursSpent,
    });

  }, [
    data,
    reset,
  ]);

  async function onSubmit(
    formData: JournalFormData
  ) {

    try {

      await updateJournal(
        journalId!,
        formData
      );

      toast.success(
        "Journal updated successfully"
      );

      navigate(
        `/journals/${journalId}`
      );

    } catch {

      toast.error(
        "Failed to update journal"
      );
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>

      <SectionTitle
        title="Edit Journal"
        subtitle="Update your journal entry"
      />

      <Card>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div>

            <label className="mb-1 block text-sm font-medium">
              Entry Date
            </label>

            <Input
              type="date"
              {...register("entryDate")}
            />

            {errors.entryDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.entryDate.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Title
            </label>

            <Input
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Summary
            </label>

            <Textarea
              {...register("summary")}
            />

            {errors.summary && (
              <p className="mt-1 text-sm text-red-500">
                {errors.summary.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Notes
            </label>

            <Textarea
              {...register("notes")}
            />

            {errors.notes && (
              <p className="mt-1 text-sm text-red-500">
                {errors.notes.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Mood
            </label>

            <Select
              {...register("mood")}
            >

              <option value="HAPPY">
                HAPPY
              </option>

              <option value="SAD">
                SAD
              </option>

              <option value="EXCITED">
                EXCITED
              </option>

              <option value="MOTIVATED">
                MOTIVATED
              </option>

              <option value="TIRED">
                TIRED
              </option>

              <option value="NEUTRAL">
                NEUTRAL
              </option>

            </Select>

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Hours Spent
            </label>

            <Input
              type="number"
              step="0.5"
              {...register("hoursSpent")}
            />

          </div>

          <div className="flex gap-3">

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Updating..."
                : "Update Journal"}
            </Button>

            <Button
              type="button"
              className="bg-slate-500 hover:bg-slate-600"
              onClick={() =>
                navigate(
                  `/journals/${journalId}`
                )
              }
            >
              Cancel
            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}