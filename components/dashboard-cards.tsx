import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Users", value: "1,234" },
  { title: "Revenue", value: "$12,340" },
  { title: "Orders", value: "320" },
  { title: "Growth", value: "12%" },
];

export default function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {stats.map((item) => (
        <Card key={item.title} className="shadow-sm">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
