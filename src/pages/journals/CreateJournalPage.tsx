import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  journalSchema,
  type JournalFormData,
} from "./schema/journalSchema";

import { createJournal } from "../../services/journal/journalService";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";

export default function CreateJournalPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
  });

  async function onSubmit(data: JournalFormData) {
    try {
      await createJournal(data);
      toast.success("Journal created successfully");
      navigate("/journals");
    } catch {
      toast.error("Failed to create journal");
    }
  }

  return (
    <div>
      <SectionTitle
        title="Create Journal"
        subtitle="Capture your learning progress"
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
              placeholder="Enter title"
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
              placeholder="Short summary"
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
              placeholder="Detailed notes"
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
            <Select {...register("mood")}>
              <option value="HAPPY">HAPPY</option>
              <option value="SAD">SAD</option>
              <option value="EXCITED">EXCITED</option>
              <option value="MOTIVATED">MOTIVATED</option>
              <option value="TIRED">TIRED</option>
              <option value="NEUTRAL">NEUTRAL</option>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Hours Spent
            </label>
            <Input
              type="number"
              step="0.5"
              placeholder="Hours spent"
              {...register("hoursSpent", { valueAsNumber: true })}
            />
            {errors.hoursSpent && (
              <p className="mt-1 text-sm text-red-500">
                {errors.hoursSpent.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Journal"}
          </Button>
        </form>
      </Card>
    </div>
  );
}