import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  updateMilestone,
} from "../../services/roadmap/roadmapService";

import MilestoneForm from "../../components/roadmap/MilestoneForm";

import SectionTitle from "../../components/ui/SectionTitle";

export default function EditMilestonePage() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const milestone =
    location.state;

  const mutation =
    useMutation({

      mutationFn: (data: {

        title: string;

        description: string;

      }) =>
        updateMilestone(

          milestone.id,

          data

        ),

      onSuccess: () => {

        toast.success(
          "Milestone updated successfully"
        );

        navigate(-1);

      },

      onError: () => {

        toast.error(
          "Failed to update milestone"
        );

      },

    });

  if (!milestone) {

    return (
      <p>
        Milestone not found.
      </p>
    );

  }

  return (

    <div className="space-y-6">

      <SectionTitle
        title="Edit Milestone"
        subtitle="Update milestone details."
      />

      <MilestoneForm

        initialTitle={
          milestone.title
        }

        initialDescription={
          milestone.description ?? ""
        }

        loading={
          mutation.isPending
        }

        submitText="Save Changes"

        onSubmit={(data) =>
          mutation.mutate(data)
        }

      />

    </div>

  );

}