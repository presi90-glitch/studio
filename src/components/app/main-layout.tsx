
"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { templates, type Template } from "@/lib/templates";
import { getAiSuggestions } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Sparkles, Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function MainLayout() {
  const [htmlContent, setHtmlContent] = useState<string>(templates[0].content);
  const [cssContent, setCssContent] = useState<string>("");
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const previewContent = useMemo(() => {
    if (!htmlContent) return "";
    const styleTag = `<style>${cssContent}</style>`;
    if (htmlContent.includes("</head>")) {
      return htmlContent.replace("</head>", `${styleTag}</head>`);
    }
    return `<html><head>${styleTag}</head><body>${htmlContent}</body></html>`;
  }, [htmlContent, cssContent]);

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setHtmlContent(template.content);
      setCssContent("");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([previewContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "webstart-project.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGetAiSuggestions = () => {
    startTransition(async () => {
      const result = await getAiSuggestions(htmlContent);
      if (result.success && result.data) {
        setAiSuggestion(result.data);
        setIsDialogOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "An unknown error occurred.",
        });
      }
    });
  };

  const handleApplyStyles = () => {
    setCssContent((prev) => prev + "\n" + aiSuggestion);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Style Assistant Suggestion</DialogTitle>
            <DialogDescription>
              AI has generated these CSS styles based on your HTML. You can apply them to your project.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 w-full rounded-md border p-4 font-code text-sm">
            <pre><code>{aiSuggestion}</code></pre>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleApplyStyles}>
              Apply Styles
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col h-screen bg-background text-foreground animate-in fade-in duration-500">
        <header className="flex items-center justify-between p-4 border-b shrink-0">
          <h1 className="text-2xl font-headline font-bold text-primary">WebStart</h1>
          <Button onClick={handleDownload} variant="default">
            <Download className="mr-2" /> Download
          </Button>
        </header>
        <main className="flex-1 grid lg:grid-cols-2 gap-6 p-6 overflow-hidden">
          <div className="flex flex-col gap-6">
            <Card className="shrink-0">
              <CardHeader>
                <CardTitle className="font-headline">Controls</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2">
                    <Label htmlFor="template-select" className="mb-2 block">Template</Label>
                    <Select defaultValue={templates[0].id} onValueChange={handleTemplateChange} >
                    <SelectTrigger id="template-select" className="w-full">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                            {template.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="w-full sm:w-1/2 self-end">
                    <Button onClick={handleGetAiSuggestions} disabled={isPending} className="w-full">
                    {isPending ? (
                        <Loader2 className="mr-2 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 text-yellow-300" />
                    )}
                    Style Assistant
                    </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex-1 flex flex-col min-h-0">
              <Label htmlFor="html-editor" className="mb-2 font-headline">
                HTML Editor
              </Label>
              <Textarea
                id="html-editor"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="flex-1 font-code text-sm resize-none"
                placeholder="Enter your HTML here..."
              />
            </div>
          </div>

          <div className="flex flex-col min-h-0">
            <Label className="mb-2 font-headline">Live Preview</Label>
            <div className="flex-1 border rounded-lg bg-white shadow-inner overflow-hidden">
              <iframe
                srcDoc={previewContent}
                className="w-full h-full"
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
