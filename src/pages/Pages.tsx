import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Edit, Trash2, Calendar } from "lucide-react";

const mockPages = [
  {
    id: "1",
    title: "Home",
    status: "published",
    lastModified: "2024-09-20",
    template: "business-pro",
  },
  {
    id: "2", 
    title: "About Us",
    status: "draft",
    lastModified: "2024-09-19",
    template: "minimal-page",
  },
  {
    id: "3",
    title: "Contact",
    status: "published", 
    lastModified: "2024-09-18",
    template: "contact-form",
  },
];

export default function Pages() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Pages</h1>
            <p className="text-muted-foreground">
              Manage all your website pages
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>

        <div className="grid gap-4">
          {mockPages.map((page) => (
            <Card key={page.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{page.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Modified {page.lastModified}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={page.status === "published" ? "default" : "secondary"}
                    >
                      {page.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}