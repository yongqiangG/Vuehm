import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest('/system/config/menu').then(data => {
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
            store.dispatch('connect');
        }
    })
}

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        /*将router中的每一项赋值给变量*/
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        /*判断是否为一级菜单的children*/
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            /*component字符串特殊处理*/
            component(resolve) {
                if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                } else if (component.startsWith("Set")) {
                    require(['../views/set/' + component + '.vue'], resolve);
                } else if (component.startsWith("Air")) {
                    require(['../views/air/' + component + '.vue'], resolve);
                } else if (component.startsWith("Fw")) {
                    require(['../views/fw/' + component + '.vue'], resolve);
                }else if (component.startsWith("Func")) {
                    require(['../views/func/' + component + '.vue'], resolve);
                } else if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                }

            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}