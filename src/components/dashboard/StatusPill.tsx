export default function StatusPill({ status }: { status: "pending" | "success" | "failed" }) {
  const styles = {
    success: "bg-forest-700/10 text-forest-700",
    pending: "bg-gold-500/15 text-gold-700",
    failed: "bg-red-100 text-red-600",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
