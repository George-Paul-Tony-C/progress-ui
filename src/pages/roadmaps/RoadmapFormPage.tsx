import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  createRoadmap,
} from "../../services/roadmap/roadmapService";

import RoadmapForm from "../../components/roadmap/RoadmapForm";

import SectionTitle from "../../components/ui/SectionTitle";

export default function RoadmapFormPage() {

  const navigate =
    useNavigate();

  const mutation =
    useMutation({

      mutationFn:
        createRoadmap,

      onSuccess: () => {

        toast.success(
          "Roadmap created successfully"
        );

        navigate(
          "/roadmaps"
        );

      },

      onError: () => {

        toast.error(
          "Failed to create roadmap"
        );

      },

    });

  return (

    <div className="space-y-6">

      <SectionTitle
        title="Create Roadmap"
        subtitle="Plan your learning journey."
      />

      <RoadmapForm

        submitText="Create Roadmap"

        loading={
          mutation.isPending
        }

        onSubmit={(data) =>
          mutation.mutate(data)
        }

      />

    </div>

  );

}