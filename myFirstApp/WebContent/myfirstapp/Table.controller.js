sap.ui.controller("myfirstapp.Table", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf myfirstapp.Table
	 */
	onInit : function() {

		var oData = {
			"names" : [ {
				Row : "1",
				Name : "Tiger",
				Place : "Pool"
			}, {
				Row : "2",
				Name : "Gangaroo",
				Place : "Garden"
			}, {
				Row : "3",
				Name : "Dog",
				Place : "House"
			}, {
				Row : "4",
				Name : "Lion",
				Place : "Mountain"
			},
			{
				Row : "9",
				Name : "Tiger",
				Place : "Pool"
			}, {
				Row : "8",
				Name : "Gangaroo",
				Place : "Garden"
			}, {
				Row : "7",
				Name : "Dog",
				Place : "House"
			}, {
				Row : "6",
				Name : "Lion",
				Place : "Mountain"
			}],
			"Icon" : [ {
				Row : "sap-icon://car-rental",
				Name : "Tiger",
				Place : "Pool"
			}, {
				Row : "sap-icon://cargo-train",
				Name : "Gangaroo",
				Place : "Garden"
			}, {
				Row : "sap-icon://cart-2",
				Name : "Dog",
				Place : "House"
			}, {
				Row : "sap-icon://cart-3",
				Name : "Lion",
				Place : "Mountain"
			}, 
			{
				Row : "sap-icon://cart-3",
				Name : "Lion",
				Place : "Mountain"
			}]
		};

		var oModel = new sap.ui.model.json.JSONModel(oData);
		sap.ui.getCore().setModel(oModel,"List");
	},
	Press_val : function(ovent){
		var vName = ovent.getSource().getBindingContext('List').getObject().Name ;
		var vPlace = ovent.getSource().getBindingContext('List').getObject().Place ;
		app.to("idlistdet1");
        /*sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({"TValue": vName ,"DValue": vPlace}))*/
       var oData1 = {
        		"TValue": vName,
        		"DValue": vPlace
        }
     var oModela = new sap.ui.model.json.JSONModel(oData1);
      sap.ui.getCore().setModel(oModela);
	}
  
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf myfirstapp.Table
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf myfirstapp.Table
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf myfirstapp.Table
 */
// onExit: function() {
//
// }
});