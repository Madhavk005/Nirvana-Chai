import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Construction className="h-16 w-16 text-sage-400 mx-auto mb-6" />
        <h1 className="text-3xl font-heading font-bold text-sage-800 mb-4">
          {title}
        </h1>
        <p className="text-lg text-sage-600 mb-6">{description}</p>
        <p className="text-sm text-sage-500">
          This page is coming soon. Continue exploring our tea collection or
          contact us for more information.
        </p>
      </div>
    </div>
  );
}
