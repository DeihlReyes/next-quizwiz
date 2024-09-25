import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  value,
  description,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="icon h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
