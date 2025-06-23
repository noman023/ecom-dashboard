export default function CustomButton({
  logo,
  text,
}: {
  text: string;
  logo?: React.ReactNode;
}) {
  return (
    <button className="flex items-center justify-center gap-2 px-6 py-2 bg-red-600 text-white hover:bg-red-600">
      {logo}
      {text}
    </button>
  );
}
