import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import { useRoadmaps } from "../../hooks/useRoadmaps";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

import RoadmapCard from "../../components/roadmap/RoadmapCard";

export default function RoadmapsPage() {

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useRoadmaps();

  if (isLoading) {
    return <Loader />;
  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <SectionTitle
          title="Learning Roadmaps"
          subtitle="Plan, organize and complete your learning journey."
        />

        <Button
          onClick={() =>
            navigate(
              "/roadmaps/create"
            )
          }
        >

          <Plus size={18} />

          New Roadmap

        </Button>

      </div>

      {!data?.content.length && (

        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No Roadmaps Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Create your first roadmap to start tracking your learning.
          </p>

          <Button
            className="mt-6"
            onClick={() =>
              navigate(
                "/roadmaps/create"
              )
            }
          >

            <Plus size={18} />

            Create Roadmap

          </Button>

        </div>

      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {data?.content.map(
          roadmap => (

            <RoadmapCard
              key={roadmap.id}
              roadmap={roadmap}
            />

          )
        )}

      </div>

    </div>

  );
}