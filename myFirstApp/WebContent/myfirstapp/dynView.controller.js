sap.ui.controller("myfirstapp.dynView", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf myfirstapp.dynView
*/
//	onInit: function() {
//
//	},
	nav: function(ovent){
		var VParam = ovent.getParameters();
		var TValue = VParam.listItem.getProperty("title");
		var DValue = VParam.listItem.getProperty("description");
		app.to("idlistdet1");
        		
        var oData = {
        		"TValue": TValue,
        		"DValue": DValue	
        	 }
     var oModel = new sap.ui.model.json.JSONModel(oData);
        sap.ui.getCore().setModel(oModel);
        } ,		
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf myfirstapp.dynView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf myfirstapp.dynView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf myfirstapp.dynView
*/
//	onExit: function() {
//
//	}

});