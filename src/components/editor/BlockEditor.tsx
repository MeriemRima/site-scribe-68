import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Type,
  Image,
  Square,
  FileText,
  Mail,
  Eye,
  EyeOff,
  Undo,
  Redo,
  Save,
} from "lucide-react";
import { DraggableBlock } from "./DraggableBlock";
import { DropZone } from "./DropZone";
import { BlockToolbar } from "./BlockToolbar";
import { toast } from "@/hooks/use-toast";

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

interface BlockEditorProps {
  initialBlocks?: Block[];
  onSave?: (blocks: Block[]) => void;
}

const blockTypes = [
  {
    type: "heading" as const,
    label: "Heading",
    icon: Type,
    defaultContent: "Your Heading Here",
  },
  {
    type: "text" as const,
    label: "Text",
    icon: FileText,
    defaultContent: "Add your text content here...",
  },
  {
    type: "image" as const,
    label: "Image",
    icon: Image,
    defaultContent: "Image placeholder",
  },
  {
    type: "button" as const,
    label: "Button",
    icon: Square,
    defaultContent: "Click me",
  },
  {
    type: "form" as const,
    label: "Form",
    icon: Mail,
    defaultContent: "Contact Form",
  },
];

export function BlockEditor({ initialBlocks = [], onSave }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addBlock = (type: Block["type"]) => {
    const blockType = blockTypes.find((b) => b.type === type);
    const newBlock: Block = {
      id: generateId(),
      type,
      content: blockType?.defaultContent || "",
      style: {
        padding: "1rem",
        margin: "0.5rem",
      },
    };

    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    toast({
      title: "Block Added",
      description: `${blockType?.label} block added to your page.`,
    });
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    setSelectedBlockId(null);
    toast({
      title: "Block Removed",
      description: "Block has been removed from your page.",
    });
  };

  const moveBlock = (dragIndex: number, dropIndex: number) => {
    const draggedItem = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedItem);
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    onSave?.(blocks);
    toast({
      title: "Page Saved",
      description: "Your page has been saved successfully.",
    });
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
    setSelectedBlockId(null);
    toast({
      title: isPreviewMode ? "Edit Mode" : "Preview Mode",
      description: isPreviewMode
        ? "You can now edit your blocks"
        : "Viewing how your page will look",
    });
  };

  return (
    <div className="flex h-full bg-background">
      {/* Block Toolbar - Hidden in preview mode */}
      {!isPreviewMode && (
        <div className="w-64 bg-surface border-r border-border p-4 overflow-y-auto">
          <BlockToolbar
            blockTypes={blockTypes}
            onAddBlock={addBlock}
            selectedBlock={
              selectedBlockId
                ? blocks.find((b) => b.id === selectedBlockId)
                : null
            }
            onUpdateBlock={updateBlock}
            onDeleteBlock={deleteBlock}
          />
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {isPreviewMode ? "Preview" : "Edit"} Mode
            </Badge>
            <span className="text-sm text-muted-foreground">
              {blocks.length} blocks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePreviewMode}
              className="gap-2"
            >
              {isPreviewMode ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {isPreviewMode ? "Edit" : "Preview"}
            </Button>
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <Card className="min-h-[600px] bg-surface shadow-lg">
              <CardContent className="p-6">
                {blocks.length === 0 ? (
                  <DropZone
                    ref={dropZoneRef}
                    onDrop={() => {}}
                    className="min-h-[500px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg"
                  >
                    <div className="text-center text-muted-foreground">
                      <Square className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Start building your page</p>
                      <p className="text-sm">
                        {isPreviewMode
                          ? "No content to preview yet"
                          : "Drag blocks from the sidebar or click the + buttons"}
                      </p>
                    </div>
                  </DropZone>
                ) : (
                  <div className="space-y-4">
                    {blocks.map((block, index) => (
                      <DraggableBlock
                        key={block.id}
                        block={block}
                        index={index}
                        isSelected={selectedBlockId === block.id}
                        isPreviewMode={isPreviewMode}
                        onSelect={setSelectedBlockId}
                        onUpdate={updateBlock}
                        onMove={moveBlock}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}