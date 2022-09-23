sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "jquery.sap.global"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, jQuery) {
        "use strict";

        return Controller.extend("projectoholamundo.controller.Main", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getTarget("TargetMain").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
                
            },
            handleRouteMatched: function(){
                // para recoger el i18n
                this.f_i18n();
                this.i18n = this.getView().getModel("i18n").getResourceBundle();
        
                var oModelPaco =  {
                    "userDataSelected":"",
                    "userData":[
                        {
                            "key": "",
                            "nombre": "Laura"
                        },
                        {
                            "key": "1",
                            "nombre": "Mbye"
                        },{
                            "key": "2",
                            "nombre": "Luis"
                        },{
                            "key": "3",
                            "nombre": "Eduardo"
                        },{
                            "key": "4",
                            "nombre": "David"
                        },{
                            "key": "5",
                            "nombre": "Beatriz"
                        }
                    ]
                };
                var oModelPacoJson = new sap.ui.model.json.JSONModel();
                oModelPacoJson.setData(oModelPaco);
                this.getView().setModel(oModelPacoJson, "pacoModel");
            },
            onPress: function (oEvent) {
                switch( oEvent.getParameters().id ){
                    case "application-projectoholamundo-display-component---Main--_IDGenButton1":
                            //    alert("Hola mundo!!!");
                        oEvent.getSource().setText("Paco");
                        MessageToast.show(oEvent.getSource().getId() + this.i18n.getText("boton") );
                        break;
                    case "application-projectoholamundo-display-component---Main--_IDGenButton2":
                        this.getView().byId("_IDGenInput2").setValue("");
                        this.getView().byId("_IDGenInput3").setValue("");
                        break;
                    case "application-projectoholamundo-display-component---Main--_IDGenButton3":
                        if ( oEvent.getSource().getText() === "Ocultar" ){
                            this.getView().byId("_IDGenInput2").setVisible(false);
                            this.getView().byId("_IDGenInput3").setVisible(false);
                            oEvent.getSource().setText("Ver");
                        }else{
                            this.getView().byId("_IDGenInput2").setVisible(true);
                            this.getView().byId("_IDGenInput3").setVisible(true);
                            oEvent.getSource().setText("Ocultar");
                        }
                        break;
                }
            },
            onPress2: function () {
                this.fragmentDialog = sap.ui.xmlfragment("projectoholamundo.fragments.dialog", this);
                this.getView().addDependent(this.fragmentDialog);
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.fragmentDialog);
                this.fragmentDialog.open();
            },
            closeDialog: function () {
                this.fragmentDialog.close();
                this.fragmentDialog.destroy();
                this.fragmentDialog = undefined;
            },
            onSelect: function (oEvent) {
                switch( oEvent.getParameters().id ){
                    case "application-projectoholamundo-display-component---Main--_IDGenCheckBox1":
                        if (oEvent.getParameters().selected === true) {
                            this.getView().byId("_IDGenButton1").setEnabled(false);
                        } else {
                            this.getView().byId("_IDGenButton1").setEnabled(true);
                        }
                        break;
                    case "application-projectoholamundo-display-component---Main--_IDGenCheckBox2":
                        if (oEvent.getParameters().selected === true) {
                            this.getView().byId("_IDGenButton2").setEnabled(true);
                            this.getView().byId("_IDGenButton3").setEnabled(true);
                            this.getView().byId("_IDGenInput2").setEnabled(true);
                            this.getView().byId("_IDGenInput3").setEnabled(true);
                        } else {
                            this.getView().byId("_IDGenButton2").setEnabled(false);
                            this.getView().byId("_IDGenButton3").setEnabled(false);
                            this.getView().byId("_IDGenInput2").setEnabled(false);
                            this.getView().byId("_IDGenInput3").setEnabled(false);
                        }
                        break;
                }
            },
            f_i18n: function(){

                var oModelNew = new sap.ui.model.json.JSONModel({
                    userData: {
                        nombre: "Laura",
                        email: "llopezburgos@sapas.com"
                    }
                });
                sap.ui.getCore().setModel(oModelNew, "Paco");

                oModelNew = new sap.ui.model.json.JSONModel({
                    userData2: {
                        nombre: "Laura2",
                        email: "llopezburgos@sapas.com2"
                    }
                });
                this.getView().setModel(oModelNew, "Paco2");
                
                // Ini. Ejercicio 1 WS7
                oModelNew = new sap.ui.model.json.JSONModel({
                    fruta: {
                        Plátanos: 2,
                        Melones: 5,
                        Peras: 6
                    }
                });
                this.getView().setModel(oModelNew, "Fruteria");
                //this.getView().getModel("Fruteria").getData() mostrar el JSON
                // Fin. Ejercicio 1 WS7
            },
            onNavegate: function(){
                // navegación sin parametros
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Page2");
            },
            onNavegateWithParams: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Page2WithParameters", { parameter: "test"} ); 
            },
            handleUploadComplete: function(oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;
    
                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },
    
            handleUploadPress: function() {
                var oFileUploader = this.byId("fileUploader");
                if (!oFileUploader.getValue()) {
                    MessageToast.show("Choose a file first");
                    return;
                }
                oFileUploader.checkFileReadable().then(function() {
                    oFileUploader.upload();
                }, function(error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function() {
                    oFileUploader.clear();
                });
            },
    
            handleTypeMissmatch: function(oEvent) {
                var aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function(sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                                        " is not supported. Choose one of the following types: " +
                                        aFileTypes.join(", "));
            },
    
            handleValueChange: function(oEvent) {
                MessageToast.show("Press 'Upload File' to upload file '" +
                                        oEvent.getParameter("newValue") + "'");
            }
        });
    });
