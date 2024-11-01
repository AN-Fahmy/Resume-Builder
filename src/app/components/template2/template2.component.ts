import { Component, ElementRef, inject, PLATFORM_ID, RendererFactory2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IData } from '../../core/interfaces/idata';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-template2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './template2.component.html',
  styleUrl: './template2.component.scss'
})
export class Template2Component {
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
  techSkills:string[] = []
  skills:string[] = []
  expierence:string[] = []
  language:string[] = []
  education!:string
  educationDesc!:string
  selectedImage: string | ArrayBuffer | null = null;


  resumeFrom:FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    position: [null, [Validators.required]],
    profile: [null, [Validators.required]],
    address: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    education: [null, [Validators.required]],
    educationDesc: [null, [Validators.required]],
    image: [null, [Validators.required]]
  })


  @ViewChild('techskillsInputs') techSkillsContainer!:ElementRef
  addtechSkills(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      const newtechSkills = this._Renderer2.createElement('textarea')
      this._Renderer2.setAttribute(newtechSkills, 'placeholder', 'New Tech Skills...')
      this._Renderer2.addClass(newtechSkills, 'form-control')
      this._Renderer2.appendChild(this.techSkillsContainer.nativeElement, newtechSkills)

      newtechSkills.addEventListener('blur', (event: any) => {
        const value = event.target.value;
        this.techSkills.push(value);
      });
    }
  }

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
      const newExpierence = this._Renderer2.createElement('textarea')
      this._Renderer2.setAttribute(newExpierence, 'placeholder', 'New Expierence...')
      this._Renderer2.addClass(newExpierence, 'form-control')
      this._Renderer2.appendChild(this.expierenceContainer.nativeElement, newExpierence)

      newExpierence.addEventListener('blur', (event:any) =>{
        const value = event.target.value
        this.expierence.push(value)
      })
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

  resumeSubmit(){
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

  onFileSelected(event:any):void {
    const file = event.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onload = (e:any)=>{
        this.selectedImage = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }


  @ViewChild('template') template!:ElementRef
  download(){
    if (isPlatformBrowser(this._PLATFORM_ID)) {
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
