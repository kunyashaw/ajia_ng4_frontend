import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './utility/notFound/404.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { CollectComponent } from './collect/collect.component'
import { ListComponent } from './list/list.component'
import { DetailComponent } from './detail/detail.component'

import { OrderConfirmComponent } from './orderConfirm/children/confirm/orderConfirm.component'
import { PayComponent } from './orderConfirm/children/pay/pay.component'
import { OrderContainerComponent } from './orderConfirm/orderContainer.component'
import { PaySuccessComponent } from './orderConfirm/children/success/paysuccess.component';

import { UserCenterComponent } from './userCenter/userCenter.component'
import { CartComponent } from './cart/cart.component'




const routes: Routes = [
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'collect', component: CollectComponent },
    { path: 'list', component: ListComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'cart', component: CartComponent },
    {
        path: 'orderContainer',
        component: OrderContainerComponent,
        children: [
            { path: 'orderConfirm', component: OrderConfirmComponent },
            { path: 'pay', component: PayComponent },
            { path: 'paySuccess', component: PaySuccessComponent },
            { path: '', redirectTo: 'orderConfirm', pathMatch: 'full' },
        ]
    },
    { path: 'userCenter', component: UserCenterComponent },
    // 第四个路由中的空路径（''）表示应用的默认路径，当URL为空时就会访问那里，因此它通常会作为起点。
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    //最后一个路由中的**路径是一个通配符。当所请求的URL不匹配前面定义的路由表中的任何路径时，路由器就会选择此路由
    //通配符路由的path是两个星号（**），它会匹配任何 URL。 当路由器匹配不上以前定义的那些路由时，它就会选择这个路由。 通配符路由可以导航到自定义的“404 Not Found”组件，也可以重定向到一个现有路由
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
