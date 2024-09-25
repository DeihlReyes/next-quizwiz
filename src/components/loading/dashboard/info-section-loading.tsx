import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function InfoSectionLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <InfoCardLoading />
      <InfoCardLoading />
      <InfoCardLoading />
      <InfoCardLoading />
      <InfoCardLoading />
      <InfoCardLoading />
    </div>
  );
}

function InfoCardLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-x-8 space-y-0 pb-2">
        <CardTitle className="w-full text-sm font-medium">
          <Skeleton className="h-4 w-full" />
        </CardTitle>
        <div className="icon h-4 w-4 text-muted-foreground">
          <Skeleton className="h-full w-full" />
        </div>
      </CardHeader>
      <CardContent className="w-full space-y-2">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-4 w-full max-w-32" />
      </CardContent>
    </Card>
  );
}
