import React, { useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import './DocumentChamber.css';

export const DocumentChamber: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);
  const [status, setStatus] = useState('Draft');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;

  ctx.beginPath();
  ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  setDrawing(true);
};

const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  if (!drawing) return;

  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;

  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.stroke();
};

const stopDrawing = () => {
  setDrawing(false);
};

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(URL.createObjectURL(selected));
  };

  const clearSignature = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-6 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Document Chamber</h3>
        <Badge
  variant={
    status === "Draft"
      ? "warning"
      : status === "In Review"
      ? "primary"
      : "success"
  }
>
  {status}
</Badge>
      </div>

      {/* File Upload */}
      <div className="mb-3">
        <input
          type="file"
          onChange={handleFile}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* File Preview */}
      {file && (
        <iframe
          src={file}
          title="Document Preview"
          className="w-full h-48 border rounded mb-3"
        />
      )}

      {/* Status */}
      <div className="mb-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="Draft">Draft</option>
          <option value="In Review">In Review</option>
          <option value="Signed">Signed</option>
        </select>
      </div>

      {/* Signature Pad */}
      <div className="mb-3">
      <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="border w-full max-w-lg rounded bg-gray-50"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            />    
      </div>

      <Button onClick={clearSignature} size="sm" className="ml-2">
        Clear Signature
      </Button>
    </div>
  );
};