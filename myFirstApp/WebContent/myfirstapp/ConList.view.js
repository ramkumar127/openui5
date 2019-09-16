sap.ui.jsview("myfirstapp.ConList", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.ConList
	 */
	getControllerName : function() {
		return "myfirstapp.ConList";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.ConList
	 */
	createContent : function(oController) {

		var oList = new sap.m.List({
			headerText : "Animal List"
		});

		oList.bindAggregation("items", "List>/names", function(sId, oContext) {
			var Svalue = oContext.getProperty("Place");
			var Svalue1 = oContext.getProperty("Name");
			var dis1 = "Am going to Swim";
			var dis2 = "A waiting for Rain";
			if (Svalue === "Pool") {
				return new sap.m.StandardListItem({
					title : Svalue1 + " Lives in "+ Svalue,
					description : dis1
				});
			} else {
				return new sap.m.StandardListItem({
					title : Svalue1 + " Lives in "+ Svalue,
					description : dis2
				});
			}
		});

		return new sap.m.Page({
			title : "Condition in List",
			showNavButton : true,
			navButtonPress : function(oEvnt) {
				app.back();
			},
			content : [ oList ]
		});
	}

});