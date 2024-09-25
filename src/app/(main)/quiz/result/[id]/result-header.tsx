// components/ResultHeader.tsx
interface ResultHeaderProps {
  quizTitle: string;
  createdAt: string;
}

export const ResultHeader: React.FC<ResultHeaderProps> = ({
  quizTitle,
  createdAt,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">{quizTitle}</h2>
      <p className="text-sm text-gray-500">
        Completed on {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};
