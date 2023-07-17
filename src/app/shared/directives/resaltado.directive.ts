import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})

export class ResaltadoDirective implements OnChanges {

  color = 'yellow';

  @Input()
  set appResaltado (color: string){
    this.color = color;
  };

  constructor(private elementRef : ElementRef, private renderer2 : Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.establecerColorDeFondo()
  }

  establecerColorDeFondo():void{
    this.renderer2.setStyle(
      this.elementRef.nativeElement, 
      'background-color', 
      this.color
      );      
      this.renderer2.setStyle(
        this.elementRef.nativeElement, 
        'font-size', 
        '20px')
  };
  

}
