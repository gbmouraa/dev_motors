interface DescriptionItemProps {
  title: string;
  text: string;
  className?: string;
}

export function DescriptionItem({
  title,
  text,
  className,
}: DescriptionItemProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="text-xs ">{title}</h2>
      <strong>{text}</strong>
    </div>
  );
}
