import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorKey]',
  standalone: true
})
export class ColorKeyDirective {
  private defaultColor = 'black';
  private colorMap: { [key: string]: string } = {
    'r': 'red',
    'g': 'green',
    'b': 'blue',
    'y': 'yellow',
    'o': 'orange'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const color = this.colorMap[key] || this.defaultColor;

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.addClass(this.el.nativeElement, 'highlight');
    setTimeout(() => this.renderer.removeClass(this.el.nativeElement, 'highlight'), 200);
  }
}
