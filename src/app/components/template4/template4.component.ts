import { Component, ElementRef, inject, PLATFORM_ID, RendererFactory2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IData } from '../../core/interfaces/idata';
import { isPlatformBrowser } from '@angular/common';

interface IExpierence{
  head:string
  desc:string
}

@Component({
  selector: 'app-template4',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './template4.component.html',
  styleUrl: './template4.component.scss'
})
export class Template4Component {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  personeData!:IData

  name!:string
  position!:string
  profile!:string
  address!:string
  email!:string
  phone!:string
  skills:string[] = []
  expierence:IExpierence[] = []
  language:string[] = []
  education!:string
  educationDesc!:string

  resumeFrom:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required]],
    position:[null, [Validators.required]],
    profile:[null, [Validators.required]],
    address:[null, [Validators.required]],
    email:[null, [Validators.required]],
    phone:[null, [Validators.required]],
    education:[null, [Validators.required]],
    educationDesc:[null, [Validators.required]],
  })

  @ViewChild('skillsInputs') skillsContainer!:ElementRef
  addSkills(){
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const newSkill = this._Renderer2.createElement('textarea')
      this._Renderer2.setAttribute(newSkill, 'placeholder', 'New Skills...')
      this._Renderer2.addClass(newSkill, 'form-control')
      this._Renderer2.appendChild(this.skillsContainer.nativeElement, newSkill)

      newSkill.addEventListener('blur', (event: any) => {
        const value = event.target.value;
        this.skills.push(value);
      });
    }
  }

  @ViewChild('expierenceInputs') expierenceContainer!:ElementRef
  addExpierence(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      const currentIndex = this.expierence.length;
      const headExp = this._Renderer2.createElement('input')
      this._Renderer2.setAttribute(headExp, 'placeholder', 'Header New Expierence...')
      this._Renderer2.setAttribute(headExp, 'type', 'text')
      this._Renderer2.addClass(headExp, 'form-control')

      const descExp = this._Renderer2.createElement('textarea')
      this._Renderer2.setAttribute(descExp, 'placeholder', 'New Expierence...')
      this._Renderer2.addClass(descExp, 'form-control')

      this._Renderer2.appendChild(this.expierenceContainer.nativeElement, headExp)
      this._Renderer2.appendChild(this.expierenceContainer.nativeElement, descExp)

      headExp.addEventListener('input', () => {
        this.updateFormData(currentIndex, headExp.value, descExp.value);
      });
      descExp.addEventListener('input', () => {
        this.updateFormData(currentIndex, headExp.value, descExp.value);
      });

      this.expierence.push({ head: '', desc: '' });
    }
  }

  updateFormData(i:number, headExp:string, descExp:string){
    if(this.expierence[i]){
      this.expierence[i].head = headExp
      this.expierence[i].desc = descExp
    }
  }

  @ViewChild('languageInputs') languageContainer!:ElementRef
  addLanguage(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      const newLanguage = this._Renderer2.createElement('textarea')
      this._Renderer2.setAttribute(newLanguage, 'placeholder', 'New Language...')
      this._Renderer2.addClass(newLanguage, 'form-control')
      this._Renderer2.appendChild(this.languageContainer.nativeElement, newLanguage)

      newLanguage.addEventListener('blur', (event:any) => {
        const value = event.target.value
        this.language.push(value)
      })
    }
  }

  resumeSubmit():void{
    this.personeData = this.resumeFrom.value
    this.name = this.personeData.name
    this.position = this.personeData.position
    this.profile = this.personeData.profile
    this.address = this.personeData.address
    this.email = this.personeData.email
    this.phone = this.personeData.phone
    this.education = this.personeData.education
    this.educationDesc = this.personeData.educationDesc
  }


  @ViewChild('template') template!:ElementRef
  download(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      const data = this.template.nativeElement

      html2canvas(data).then(canvas => {
        const imgWidth = 208
        const pageHeight = 295
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const heightLeft = imgHeight

        const pdf = new jsPDF('p', 'mm', 'a4');
        const contentDataURL = canvas.toDataURL('image/png')
        pdf.addImage(contentDataURL, 'png', 0, 0, imgWidth, imgHeight)
        pdf.save('template.pdf')

      })
    }
  }
}
