const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex flex-row gap-2 items-baseline h-6">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
};

export default DetailRow;
