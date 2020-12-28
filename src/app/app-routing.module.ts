import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((module) => module.HomeModule)
    },
    {
        path: 'offerlist',
        loadChildren: () => import('./modules/offers/offers.module').then((module) => module.OffersModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
