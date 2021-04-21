import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
<<<<<<< HEAD
  {path: "user-details", component: UserDetailsComponent},
=======
  {path: "user-details", component: UserDetailsComponent}
>>>>>>> 6c751c693aeb40559c0406ff6b96b5ca16916851
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
