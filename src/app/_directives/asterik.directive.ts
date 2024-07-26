import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAsterik]'
})
export class AsterikDirective {

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const spanEl = this._renderer.createElement('span');
    const spanText = this._renderer.createText("*");
    this._renderer.appendChild(spanEl, spanText);

    this._renderer.setStyle(spanEl, 'color', 'red');
    this._renderer.setStyle(spanEl, 'margin-left', '4px');
    this._renderer.setStyle(spanEl, 'font-weight', 'bold');

    this._renderer.appendChild(this._el.nativeElement, spanEl);
  }
}
