sap.ui.jsview("myfirstapp.Tiles_data", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.Tiles_data
	 */
	getControllerName : function() {
		return "myfirstapp.Tiles_data";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.Tiles_data
	 */
	createContent : function(oController) {
		var oTiles = new sap.m.StandardTile({
			icon : "{Row}",
			title : "{Name}",
			info : "{Place}"
		});

		var oTilcon = new sap.m.TileContainer({

		});

		oTilcon.bindAggregation("tiles", "/Icon", oTiles);

		return new sap.m.Page({
			title : "Title",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content : [ oTilcon

			]
		});
	}

});