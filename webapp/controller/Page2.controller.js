sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "projectoholamundo/Router"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Router) {
        "use strict";

        return Router.extend("projectoholamundo.controller.Page2", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getTarget("Page2WithParameters").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
                
            },
            handleRouteMatched: function(oEvent){
                
                oEvent.getParameters().data.parameter;
            }
        });
    });
