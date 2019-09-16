sap.ui.jsview("myfirstapp.ThirdPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf myfirstapp.ThirdPage
	*/ 
	getControllerName : function() {
		return "myfirstapp.ThirdPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf myfirstapp.ThirdPage
	*/ 
	createContent : function(oController) {
		
		var oLabel1 = new sap.m.Label({
			text: "{/key1}"
		});
		var oLabel2 = new sap.m.Label({
			text: "{/key2}"
		});
		var oLabel3 = new sap.m.Label({
			text:"Lab3"
		})
		var oData = {
		  "key1": "Welcome to ",
		  "key2": "SAP DBM" 		
		}
		var oModel = new sap.ui.model.json.JSONModel();
		
		oModel.setData(oData);
		
		oLabel1.setModel(oModel);
		oLabel2.setModel(oModel);
		/*
		oLabel1.placeAt("Content1");
		oLabel2.PlaceAt("Content2");*/
		
 		return new sap.m.Page({
			title: "Title",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content: [
			oLabel3,oLabel1,oLabel2
			]
		});
	}

});