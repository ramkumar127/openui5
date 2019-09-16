sap.ui.jsview("myfirstapp.Tiles", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf myfirstapp.Tiles
	*/ 
	getControllerName : function() {
		return "myfirstapp.Tiles";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf myfirstapp.Tiles
	*/ 
	createContent : function(oController) {
		
		var tiles1 = new sap.m.StandardTile({
			title: "Bus",
			info: "General Use",
			icon: "sap-icon://car-rental"
		});
		var tiles2 = new sap.m.StandardTile({
			title: "Truck",
			info: "Upload",
			icon: "sap-icon://cargo-train"
		});
		var tiles3 = new sap.m.StandardTile({
			title: "Truck",
			info: "unload",
			icon: "sap-icon://cart-2"
		});		
		var tiles4 = new sap.m.StandardTile({
			title: "Bus",
			info: "TWO in One",
			icon: "sap-icon://cart-3"
		});
		var tilesCon = new sap.m.TileContainer({
			tiles:[
				tiles1,tiles2,tiles3,tiles4
			]
		});
 		return new sap.m.Page({
			title: "Tiles List",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content: [
				tilesCon
			]
		});
	}

});