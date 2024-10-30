import { Template3Component } from './components/template3/template3.component';
import { Template2Component } from './components/template2/template2.component';
import { Template1Component } from './components/template1/template1.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { Template4Component } from './components/template4/template4.component';
import { Template5Component } from './components/template5/template5.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent, title:'Home'},
  {path:'template1', component:Template1Component, title:'Template 1'},
  {path:'template2', component:Template2Component, title:'Template 2'},
  {path:'template3', component:Template3Component, title:'Template 3'},
  {path:'template4', component:Template4Component, title:'Template 4'},
  {path:'template5', component:Template5Component, title:'Template 5'},
  {path:'**', component:NotfoundComponent, title:'Not Found'},
];
