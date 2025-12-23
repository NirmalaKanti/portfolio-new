import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download } from "lucide-react";

type FilterType = "glitch" | "nature" | "trending" | "glass" | "sepia" | "neon" | "vintage" | "original";

const ImageConverter = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("original");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { id: "original", name: "Original", icon: "🖼️" },
    { id: "glitch", name: "Glitch", icon: "⚡" },
    { id: "nature", name: "Nature", icon: "🌿" },
    { id: "trending", name: "Trending Small", icon: "✨" },
    { id: "glass", name: "Glass Effect", icon: "🔮" },
    { id: "sepia", name: "Vintage Sepia", icon: "📸" },
    { id: "neon", name: "Neon Glow", icon: "💜" },
    { id: "vintage", name: "Retro Film", icon: "🎬" },
  ] as const;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setSelectedFilter("original");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      switch (selectedFilter) {
        case "glitch":
          applyGlitch(ctx, imageData, canvas);
          break;
        case "nature":
          applyNature(data);
          break;
        case "trending":
          applyTrending(data);
          break;
        case "glass":
          applyGlass(ctx, imageData, canvas);
          break;
        case "sepia":
          applySepia(data);
          break;
        case "neon":
          applyNeon(data);
          break;
        case "vintage":
          applyVintage(data);
          break;
        case "original":
          break;
      }

      if (selectedFilter !== "original" && selectedFilter !== "glitch" && selectedFilter !== "glass") {
        ctx.putImageData(imageData, 0, 0);
      }
    };
    img.src = image;
  }, [image, selectedFilter]);

  const applyGlitch = (ctx: CanvasRenderingContext2D, imageData: ImageData, canvas: HTMLCanvasElement) => {
    ctx.putImageData(imageData, 0, 0);
    const sliceHeight = 10 + Math.random() * 20;
    const sliceY = Math.random() * (canvas.height - sliceHeight);

    ctx.filter = "hue-rotate(45deg) saturate(2)";
    ctx.drawImage(canvas, 5, sliceY, canvas.width - 10, sliceHeight, 0, sliceY, canvas.width - 10, sliceHeight);
    ctx.filter = "none";

    ctx.filter = "hue-rotate(-45deg)";
    ctx.drawImage(canvas, -5, sliceY + 15, canvas.width - 10, sliceHeight, 0, sliceY + 15, canvas.width - 10, sliceHeight);
    ctx.filter = "none";
  };

  const applyNature = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.max(0, r - 20);
      data[i + 1] = Math.min(255, g + 30);
      data[i + 2] = Math.max(0, b - 15);
    }
  };

  const applyTrending = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = r * 0.299 + g * 0.587 + b * 0.114;

      data[i] = gray * 0.9;
      data[i + 1] = gray * 1.05;
      data[i + 2] = gray * 1.1;
    }
  };

  const applyGlass = (ctx: CanvasRenderingContext2D, imageData: ImageData, canvas: HTMLCanvasElement) => {
    const radius = 3;
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * radius;
      const offsetY = (Math.random() - 0.5) * radius;
      ctx.globalAlpha = 0.7;
      ctx.drawImage(canvas, offsetX, offsetY);
    }
    ctx.globalAlpha = 1;
    ctx.filter = "blur(0.5px) brightness(1.1)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none";
  };

  const applySepia = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 1.2 + 40);
      data[i + 1] = Math.min(255, g * 0.95 + 20);
      data[i + 2] = Math.max(0, b * 0.7 - 20);
    }
  };

  const applyNeon = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 1.4);
      data[i + 1] = Math.max(0, g * 0.7);
      data[i + 2] = Math.min(255, b * 1.3);
    }
  };

  const applyVintage = (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 1.1 + 20);
      data[i + 1] = Math.min(255, g + 10);
      data[i + 2] = Math.max(0, b - 20);
    }
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `image-${selectedFilter}-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">
            Image Converter
          </h1>
          <p className="text-gray-300 text-lg">Transform your images with creative filters</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20 p-8">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-500/50 rounded-lg p-12 cursor-pointer hover:border-purple-400 transition-colors bg-slate-700/30 hover:bg-slate-700/50"
                data-testid="upload-drop-zone"
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-300 font-medium mb-2">Click to upload image</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="input-image-file"
              />
            </Card>

            {image && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Preview</h3>
                <img
                  src={image}
                  alt="Original"
                  className="w-full rounded-lg border border-purple-500/30"
                  data-testid="img-original-preview"
                />
              </div>
            )}
          </div>

          {/* Filters Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
              <div className="grid grid-cols-2 gap-3" data-testid="filter-options">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as FilterType)}
                    data-testid={`button-filter-${filter.id}`}
                    className={`p-3 rounded-lg font-medium text-sm transition-all ${
                      selectedFilter === filter.id
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/50"
                        : "bg-slate-700/50 text-gray-300 hover:bg-slate-700/80 border border-slate-600/50"
                    }`}
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.name}
                  </button>
                ))}
              </div>
            </Card>

            {image && (
              <Button
                onClick={downloadImage}
                data-testid="button-download"
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-6 rounded-lg transition-all shadow-lg shadow-purple-500/50"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Converted Image
              </Button>
            )}
          </div>
        </div>

        {/* Canvas for processing */}
        {image && (
          <canvas
            ref={canvasRef}
            className="hidden"
            data-testid="canvas-processor"
          />
        )}

        {/* Result Section */}
        {image && (
          <div className="mt-12">
            <Card className="bg-slate-800/50 border-purple-500/20 p-8">
              <h3 className="text-xl font-bold text-white mb-4">Result</h3>
              <div className="rounded-lg overflow-hidden border border-purple-500/30 bg-slate-900">
                <canvas
                  ref={canvasRef}
                  className="w-full"
                  data-testid="canvas-result"
                />
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!image && (
          <div className="mt-12 text-center">
            <Card className="bg-slate-800/30 border-purple-500/20 p-12">
              <div className="text-gray-400">
                <p className="text-lg">Upload an image to get started</p>
                <p className="text-sm mt-2">Choose from 7 different filters to transform your image</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;
