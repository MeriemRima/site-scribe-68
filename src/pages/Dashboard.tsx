import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { BlockEditor } from "@/components/editor/BlockEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ViewMode = "templates" | "editor";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setViewMode("editor");
    toast({
      title: "Template Loaded",
      description: "Template has been loaded into the editor. Start customizing!",
    });
  };

  const handleCreateBlank = () => {
    setSelectedTemplate(null);
    setViewMode("editor");
    toast({
      title: "Blank Page",
      description: "Starting with a blank page. Add blocks to begin building!",
    });
  };

  const handleBackToTemplates = () => {
    setViewMode("templates");
    setSelectedTemplate(null);
  };

  const handlePublish = () => {
    toast({
      title: "Publishing...",
      description: "Your WordPress site is being generated and deployed.",
    });
    
    // Simulate publishing process
    setTimeout(() => {
      toast({
        title: "Published Successfully!",
        description: "Your WordPress site is now live and ready to view.",
      });
    }, 2000);
  };

  const renderHeader = () => {
    if (viewMode === "editor") {
      return (
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToTemplates}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {selectedTemplate ? "Template" : "Blank"} Project
              </Badge>
              {selectedTemplate && (
                <span className="text-sm text-muted-foreground">
                  Based on {selectedTemplate}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              Publish to WordPress
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderContent = () => {
    switch (viewMode) {
      case "templates":
        return (
          <div className="p-6">
            <TemplateGallery
              onSelectTemplate={handleSelectTemplate}
              onCreateBlank={handleCreateBlank}
            />
          </div>
        );
      case "editor":
        return (
          <BlockEditor
            key={selectedTemplate} // Force re-render when template changes
            onSave={(blocks) => {
              console.log("Saving blocks:", blocks);
              toast({
                title: "Draft Saved",
                description: "Your changes have been saved locally.",
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {renderHeader()}
      {renderContent()}
    </DashboardLayout>
  );
}