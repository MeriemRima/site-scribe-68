import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Search, Grid, List } from "lucide-react";

export default function Media() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Media Library</h1>
            <p className="text-muted-foreground">
              Upload and manage your images, videos, and files
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Upload Media
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search media files..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <Card className="border-dashed border-2 mb-6">
          <CardContent className="p-8">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Drop files here or click to upload</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Support for JPG, PNG, GIF, PDF, and more
              </p>
              <Button>Choose Files</Button>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="aspect-square overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    Image {i + 1}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}