interface SummaryCardProps {
  label: string;
  value: string | number;
}

const SummaryCard = ({ label, value }: SummaryCardProps) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default SummaryCard;
