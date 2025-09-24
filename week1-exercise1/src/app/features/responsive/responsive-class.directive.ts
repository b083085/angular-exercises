import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

export interface ResponsiveRule {
  min?: number;
  max?: number;
  class: string;
}

@Directive({
  selector: '[appResponsiveClass]',
  standalone: true,
})
export class ResponsiveClassDirective implements OnInit {

  @Input('appResponsiveClass') rules?: ResponsiveRule[];

  private currentClass?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (!this.rules || this.rules.length === 0) {
      this.rules = [
        { max: 599, class: 'is-sm' },
        { min: 600, max: 1023, class: 'is-md' },
        { min: 1024, class: 'is-lg' },
      ];
    }
    this.applyClassForWidth(window.innerWidth);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.applyClassForWidth(window.innerWidth);
  }

  private applyClassForWidth(width: number): void {
    const match = this.rules!.find(r => {
      const minOk = r.min === undefined || width >= r.min;
      const maxOk = r.max === undefined || width <= r.max;
      return minOk && maxOk;
    });

    const nextClass = match?.class;

    if (this.currentClass && this.currentClass !== nextClass) {
      this.renderer.removeClass(this.el.nativeElement, this.currentClass);
      this.currentClass = undefined;
    }

    if (nextClass && this.currentClass !== nextClass) {
      this.renderer.addClass(this.el.nativeElement, nextClass);
      this.currentClass = nextClass;
    }
  }
}
