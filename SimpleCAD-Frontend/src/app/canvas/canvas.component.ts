import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {
  private canvas: fabric.Canvas | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setBackgroundColor('#f0f0f0', this.canvas.renderAll.bind(this.canvas));
  }

  addLine() {
    console.log('addLine called');
    if (this.canvas) {
      const line = new fabric.Line([10, 10, 300, 10], {
        stroke: 'blue',
        strokeWidth: 5,
        selectable: true
      });
      this.canvas.add(line);
      this.canvas.renderAll();
      console.log('Line added:', line);
    }
  }
  
  addCircle() {
    console.log('addCircle called');
    if (this.canvas) {
      const circle = new fabric.Circle({
        radius: 30,
        left: 50,
        top: 50,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 5,
        selectable: true
      });
      this.canvas.add(circle);
      this.canvas.renderAll();
      console.log('Circle added:', circle);
    }
  }

  saveDrawing() {
    console.log('saveDrawing called');
    if (this.canvas) {
      const shapes = this.canvas.getObjects().map(obj => ({
        type: obj.type,
        x: obj.left,
        y: obj.top,
        width: obj.width,
        height: obj.height
      }));
      const drawing = { name: 'MyDrawing', shapes };
      this.http.post('https://localhost:7162/api/drawings', drawing).subscribe({
        next: () => console.log('Drawing saved'),
        error: (err) => console.error('Save failed', err)
      });
    }
  }

  loadDrawing(id: number) {
    console.log('loadDrawing called with id:', id);
    this.http.get<any>(`https://localhost:7162/api/drawings/${id}`).subscribe({
      next: (drawing) => {
        console.log('Received drawing:', JSON.stringify(drawing, null, 2));
        if (this.canvas) {
          this.canvas.clear();
          console.log('Canvas cleared');
          drawing.shapes.forEach((shape: any, index: number) => {
            console.log(`Processing shape ${index}:`, shape);
            const shapeType = shape.type.toLowerCase();
            if (shapeType === 'line') {
              console.log('Adding line with coords:', [shape.x, shape.y, shape.x + shape.width, shape.y]);
              this.canvas!.add(
                new fabric.Line(
                  [shape.x, shape.y, shape.x + shape.width, shape.y],
                  { stroke: 'black', strokeWidth: 2, selectable: true }
                )
              );
            } else if (shapeType === 'circle') {
              console.log('Adding circle with:', {
                left: shape.x,
                top: shape.y,
                radius: shape.width / 2
              });
              this.canvas!.add(
                new fabric.Circle({
                  left: shape.x,
                  top: shape.y,
                  radius: shape.width / 2,
                  stroke: 'black',
                  fill: 'transparent',
                  strokeWidth: 2,
                  selectable: true
                })
              );
            } else {
              console.warn(`Unknown shape type: ${shape.type}`);
            }
          });
          this.canvas.renderAll();
        } else {
          console.error('Canvas not initialized');
        }
      },
      error: (err) => console.error('Load failed:', err)
    });
  }
}