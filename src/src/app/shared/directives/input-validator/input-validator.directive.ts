import { Directive, ElementRef, Input, SimpleChange } from '@angular/core';
import jsonStrings from '@stringResources/app-strings.json';
import { CustomStyleElements } from './models/InputValidator';

@Directive({
  selector: '[appInputValidator]'
})
export class InputValidatorDirective {

  @Input() validate:  boolean;
  eventsAdded: boolean = false;
  private actionType = {
    Delete: 0,
    Add: 1
  };
  constructor(private elemRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.addEvents();
  }

  ngOnChanges(changes: SimpleChange) {
    if(changes["validate"].currentValue == true){
      this.checkFormElements();
      this.eventsAdded = true;
    }else {
      this.resetFormElements();
    }
  }

  private resetFormElements() {
    this.removeNotificationForTagName('input');
    this.removeNotificationForTagName('app-dropdownlist');
    this.removeNotificationForTagName('re-captcha');
    this.removeNotificationForTagName('app-password');
  }

  //Incluye los eventos a los elementos del formulario
  private addEvents() {
    this.addEventForTagName("input");
    this.addEventForTagName("app-dropdownlist");
    this.addEventForTagName("re-captcha");
    this.addEventForTagName("app-password");
  }

  //Verifica la validez  de los elementos del formulario
  private checkFormElements() {
    this.checkElementForTagName("input");
    this.checkElementForTagName("app-dropdownlist");
    this.checkElementForTagName("app-password");
    this.checkElementForTagName("re-captcha");
  }

  private removeNotificationForTagName(tag: string) {
    let htmlElement = this.elemRef.nativeElement;
    let inputChildrens = htmlElement.getElementsByTagName(tag);

    for(let i = 0; i < inputChildrens.length; i ++){      
      this.removeElementMessage(inputChildrens[i]);
      this.alterClassByElement(inputChildrens[i], this.actionType.Delete);
    }
  }

  //Incluye los eventos de cambio a los elementos de acuerdo con el nombre dado
  private addEventForTagName(tag: string) {
    let htmlElement = this.elemRef.nativeElement;
    let inputChildrens = htmlElement.getElementsByTagName(tag);

    for(let i = 0; i < inputChildrens.length; i ++){      
      this.addElementEvent(inputChildrens[i]);
    }
  }

  //Incluye el evento de cambio al elemento dado
  private addElementEvent(element: any) {
    if (element != null && element != undefined){
      element.addEventListener("change", (res) => {this.checkInvalidElement(res["target"])});
    }
  }

  //Ejecuta la validación de los campos con el tagname dado
  private checkElementForTagName(tag: string) {
    let htmlElement = this.elemRef.nativeElement;
    let inputChildrens = htmlElement.getElementsByTagName(tag);

    Array.from(inputChildrens).forEach(element => this.checkInvalidElement(element));
  }

  //Verifica si un elemento tiene la clase ng-invalid (no acorde a la validación del formulario)
  //y agrega clase para resaltar el error
  checkInvalidElement(element: any){
    if (element != undefined && element.classList != undefined){
      this.removeElementMessage(element);

      if(element.classList.contains("ng-invalid")){
        element.className += " input-error ";
        let messageElement = this.addElementMessage(
          (element.value == undefined || element.value == "") ? "empty": "invalid"
        );
        
        element.parentNode.appendChild(messageElement);        
        this.alterClassByElement(element, this.actionType.Add);
      }else {
        element.className = element.className.replace("input-error", "");
      }
    }
  }

  private alterClassByElement(elementRef: any, actionType: number) {
    const elType = elementRef.type;
    const type: string = elType === undefined || elType === '' ? elementRef.tagName : elType;
    let element: CustomStyleElements[] = [];
    let className: string;

    switch (type.toLocaleLowerCase()) {
      case 'app-dropdownlist':
        element.push({ element: elementRef.childNodes[0], className: 'select-govco--error' });
        element.push({ element: elementRef.previousElementSibling, className: 'label-error' });
        break;
      case 'app-password':
        const inputElement = elementRef.querySelector(".input-govco");        
        element.push({ element: inputElement, className: 'is-invalid' });                
      case 'text':  
      case 'number':
      case 'password': {
        if (elementRef.previousElementSibling != undefined ) {
          element.push({ element: elementRef.previousElementSibling, className: 'label-error' });
        }
        break;
      }
    }

    if (element !== undefined) {
      for (var i = 0; i < element.length; i ++){
        if(element[i].element.classList != undefined){          
          if (actionType === this.actionType.Delete) {
            element[i].element.classList.remove(element[i].className);
          } else if (actionType === this.actionType.Add) {
            element[i].element.classList.add(element[i].className);
          }
        }
      }
    }
  }

  //remueve mensajes de validación incluidos
  removeElementMessage(currentElement: HTMLElement ) {
    let parent = currentElement.parentNode;
    var items = parent.querySelectorAll(".input-validation-error")
    if (items != undefined && items.length > 0){
      for (var i = 0; i < items.length; i ++){
        parent.removeChild(items[i]);
      }
    }
    this.alterClassByElement(currentElement, this.actionType.Delete);
  }

  //Incluye el mensaje 
  addElementMessage(messageType: string): HTMLElement {
    var wrapper = document.createElement('div');
    wrapper.className = messageType == "empty" ? "input-validation-error empty-validation " : "input-validation-error invalid-validation";
    wrapper.innerHTML = messageType == "empty" ? 
        jsonStrings.messages["input-validation"]["empty-input"]: 
        jsonStrings.messages["input-validation"]["invalid-input"];
    
    return wrapper;
  }

}
