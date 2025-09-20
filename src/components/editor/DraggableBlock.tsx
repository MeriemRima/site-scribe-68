import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GripVertical,
  Edit,
  Trash2,
  Settings,
} from "lucide-react";

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

interface DraggableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Block>) => void;
  onMove: (dragIndex: number, dropIndex: number) => void;
}

export function DraggableBlock({
  block,
  index,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
}: DraggableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(block.content);

  const handleContentChange = () => {
    onUpdate(block.id, { content: editContent });
    setIsEditing(false);
  };

  const renderBlock = () => {
    const baseStyle = {
      padding: block.style?.padding || "1rem",
      margin: block.style?.margin || "0.5rem",
      fontSize: block.style?.fontSize,
      color: block.style?.color,
      backgroundColor: block.style?.backgroundColor,
    };

    switch (block.type) {
      case "heading":
        return (
          <h2
            style={baseStyle}
            className="text-2xl font-bold cursor-text"
            onClick={() => !isPreviewMode && setIsEditing(true)}
          >
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p
            style={baseStyle}
            className="cursor-text"
            onClick={() => !isPreviewMode && setIsEditing(true)}
          >
            {block.content}
          </p>
        );
      case "button":
        return (
          <Button
            style={baseStyle}
            className="cursor-pointer"
            onClick={() => !isPreviewMode && setIsEditing(true)}
          >
            {block.content}
          </Button>
        );
      case "image":
        return (
          <div
            style={baseStyle}
            className="bg-muted border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer"
            onClick={() => !isPreviewMode && setIsEditing(true)}
          >
            <p className="text-muted-foreground">{block.content}</p>
          </div>
        );
      case "form":
        return (
          <div
            style={baseStyle}
            className="space-y-4 p-4 border rounded-lg cursor-pointer"
            onClick={() => !isPreviewMode && setIsEditing(true)}
          >
            <h3 className="font-semibold">{block.content}</h3>
            <div className="space-y-2">
              <Input placeholder="Name" disabled={isPreviewMode} />
              <Input placeholder="Email" disabled={isPreviewMode} />
              <Textarea placeholder="Message" disabled={isPreviewMode} />
              <Button className="w-full" disabled={isPreviewMode}>
                Submit
              </Button>
            </div>
          </div>
        );
      default:
        return <div>Unknown block type</div>;
    }
  };

  const renderEditor = () => {
    if (block.type === "text") {
      return (
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleContentChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              handleContentChange();
            }
            if (e.key === "Escape") {
              setEditContent(block.content);
              setIsEditing(false);
            }
          }}
          autoFocus
          className="min-h-[100px]"
        />
      );
    }

    return (
      <Input
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        onBlur={handleContentChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleContentChange();
          }
          if (e.key === "Escape") {
            setEditContent(block.content);
            setIsEditing(false);
          }
        }}
        autoFocus
      />
    );
  };

  return (
    <Card
      className={`relative transition-all duration-200 ${
        isSelected && !isPreviewMode
          ? "ring-2 ring-primary shadow-md"
          : "hover:shadow-sm"
      } ${!isPreviewMode ? "cursor-pointer" : ""}`}
      onClick={() => !isPreviewMode && onSelect(block.id)}
    >
      {/* Block Controls - Only in Edit Mode */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-3 -right-3 flex gap-1">
          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // onDelete would be passed down from parent
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="p-4">
        {isEditing && !isPreviewMode ? renderEditor() : renderBlock()}
      </div>
    </Card>
  );
}