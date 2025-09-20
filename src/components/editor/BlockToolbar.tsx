import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LucideIcon, Plus, Trash2, Palette } from "lucide-react";

interface Block {
  id: string;
  type: "text" | "image" | "button" | "heading" | "form";
  content: string;
  style?: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
  };
}

interface BlockType {
  type: Block["type"];
  label: string;
  icon: LucideIcon;
  defaultContent: string;
}

interface BlockToolbarProps {
  blockTypes: BlockType[];
  onAddBlock: (type: Block["type"]) => void;
  selectedBlock: Block | null;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
  onDeleteBlock: (id: string) => void;
}

export function BlockToolbar({
  blockTypes,
  onAddBlock,
  selectedBlock,
  onUpdateBlock,
  onDeleteBlock,
}: BlockToolbarProps) {
  const handleStyleUpdate = (property: string, value: string) => {
    if (!selectedBlock) return;
    
    onUpdateBlock(selectedBlock.id, {
      style: {
        ...selectedBlock.style,
        [property]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Add Blocks Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Add Blocks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {blockTypes.map((blockType) => (
            <Button
              key={blockType.type}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
              onClick={() => onAddBlock(blockType.type)}
            >
              <blockType.icon className="h-3 w-3" />
              {blockType.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Block Properties Section */}
      {selectedBlock && (
        <>
          <Separator />
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Block Properties
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteBlock(selectedBlock.id)}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Block Content */}
              <div className="space-y-2">
                <Label className="text-xs">Content</Label>
                <Input
                  value={selectedBlock.content}
                  onChange={(e) =>
                    onUpdateBlock(selectedBlock.id, { content: e.target.value })
                  }
                  className="text-xs"
                  placeholder="Block content"
                />
              </div>

              {/* Style Properties */}
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  Styles
                </Label>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Font Size</Label>
                    <Input
                      value={selectedBlock.style?.fontSize || ""}
                      onChange={(e) => handleStyleUpdate("fontSize", e.target.value)}
                      placeholder="16px"
                      className="text-xs h-7"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs text-muted-foreground">Color</Label>
                    <Input
                      type="color"
                      value={selectedBlock.style?.color || "#000000"}
                      onChange={(e) => handleStyleUpdate("color", e.target.value)}
                      className="text-xs h-7 p-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Padding</Label>
                    <Input
                      value={selectedBlock.style?.padding || ""}
                      onChange={(e) => handleStyleUpdate("padding", e.target.value)}
                      placeholder="1rem"
                      className="text-xs h-7"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs text-muted-foreground">Margin</Label>
                    <Input
                      value={selectedBlock.style?.margin || ""}
                      onChange={(e) => handleStyleUpdate("margin", e.target.value)}
                      placeholder="0.5rem"
                      className="text-xs h-7"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Background</Label>
                  <Input
                    type="color"
                    value={selectedBlock.style?.backgroundColor || "#ffffff"}
                    onChange={(e) => handleStyleUpdate("backgroundColor", e.target.value)}
                    className="text-xs h-7 p-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={() => onAddBlock("text")}
          >
            <Plus className="h-3 w-3" />
            Add Text Block
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={() => onAddBlock("button")}
          >
            <Plus className="h-3 w-3" />
            Add Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}