sap.ui.controller("myfirstapp.secondPage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf myfirstapp.secondPage
*/
//	onInit: function() {
//
//	},
	pressme : function(oEvent){
		if(this.oFragment === undefined ){
			this.oFragment = sap.ui.jsfragment("myfirstapp.secondPage",this);
			this.oFragment.open();
		}
		else{
			this.oFragment.open();
		}
	},
	Data : function(oEvent){
		app.to("idThirdPage1")
	},
	List : function(oEvent){
		app.to("idListPage1")
	},
	DynList : function(oEvent){
		app.to("idDynList1")
	},
	Table : function(oEvent){
		app.to("idTable1")
	},	
	Table1 : function(oEvent){
		app.to("idTable11")
	},	
	Tiles : function(oEvent){
		app.to("idTiles1")
	},	
	TilesData : function(oEvent){
		app.to("idTiles_data1")
	},		
	ConList : function(oEvent){
		app.to("idConList1")
	},	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf myfirstapp.secondPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf myfirstapp.secondPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf myfirstapp.secondPage
*/
//	onExit: function() {
//
//	}

});