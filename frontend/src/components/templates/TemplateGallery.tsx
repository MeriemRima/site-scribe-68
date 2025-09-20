import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { TemplateCard } from "./TemplateCard";
import { toast } from "@/hooks/use-toast";

// Import template images
import templateBlog from "@/assets/template-blog.jpg";
import templateBusiness from "@/assets/template-business.jpg";
import templatePortfolio from "@/assets/template-portfolio.jpg";

const templates = [
  {
    id: "blog-minimal",
    title: "Minimal Blog",
    description: "Clean and minimal blog template with focus on typography and readability. Perfect for writers and content creators.",
    image: templateBlog,
    category: "Blog",
    isPro: false,
  },
  {
    id: "business-pro",
    title: "Business Pro",
    description: "Professional business landing page with modern design elements, testimonials, and conversion-focused layout.",
    image: templateBusiness,
    category: "Business",
    isPro: true,
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Stunning portfolio template for designers, photographers, and creative professionals. Showcase your work beautifully.",
    image: templatePortfolio,
    category: "Portfolio",
    isPro: false,
  },
  {
    id: "blog-magazine",
    title: "Magazine Style",
    description: "Feature-rich magazine layout with multiple post formats and advanced typography options.",
    image: templateBlog,
    category: "Blog",
    isPro: true,
  },
  {
    id: "business-startup",
    title: "Startup Landing",
    description: "Modern startup landing page with hero sections, feature highlights, and call-to-action buttons.",
    image: templateBusiness,
    category: "Business",
    isPro: false,
  },
  {
    id: "portfolio-minimal",
    title: "Minimal Portfolio",
    description: "Clean and minimal portfolio design that lets your work speak for itself. Perfect for any creative field.",
    image: templatePortfolio,
    category: "Portfolio",
    isPro: false,
  },
];

const categories = ["All", "Blog", "Business", "Portfolio"];

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
  onCreateBlank: () => void;
}

export function TemplateGallery({ onSelectTemplate, onCreateBlank }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    toast({
      title: "Template Selected",
      description: `Starting with "${template?.title}" template...`,
    });
    onSelectTemplate(templateId);
  };

  const handlePreview = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    toast({
      title: "Preview Mode",
      description: `Previewing "${template?.title}" template`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Choose Template</h1>
          <p className="text-muted-foreground">
            Start with a professionally designed template or create from scratch
          </p>
        </div>
        
        <Button
          onClick={onCreateBlank}
          className="gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="h-4 w-4" />
          Start Blank
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onUseTemplate={handleUseTemplate}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No templates found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}