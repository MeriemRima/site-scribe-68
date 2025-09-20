import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  isPro?: boolean;
  onUseTemplate: (id: string) => void;
  onPreview: (id: string) => void;
}

export function TemplateCard({
  id,
  title,
  description,
  image,
  category,
  isPro = false,
  onUseTemplate,
  onPreview,
}: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-surface">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPreview(id)}
            className="shadow-md"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            onClick={() => onUseTemplate(id)}
            className="shadow-md"
          >
            <Download className="h-4 w-4 mr-1" />
            Use Template
          </Button>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Pro badge */}
        {isPro && (
          <div className="absolute top-2 right-2">
            <Badge className="text-xs gradient-primary text-white">
              Pro
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}