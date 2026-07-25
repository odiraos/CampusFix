import { Badge } from "@/components/ui/badge";

export default function StatusBadge({ value }) {
  const colours = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ASSIGNED: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    RESOLVED: "bg-green-100 text-green-800",

    LOW: "bg-slate-100 text-slate-800",
    MEDIUM: "bg-orange-100 text-orange-800",
    HIGH: "bg-red-100 text-red-800",
    URGENT: "bg-red-700 text-white",
  };

  return (
    <Badge className={colours[value] ?? ""}>
      {value.replaceAll("_", " ")}
    </Badge>
  );
}