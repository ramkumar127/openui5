sap.ui.jsview("myfirstapp.ListPage", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.ListPage
	 */
	getControllerName : function() {
		return "myfirstapp.ListPage";
	},
    
	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.ListPage
	 */
	createContent : function(oController) {
		var oData = {
			Name : "Tiger",
			Place : "Forest"
		}
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oData);
		/* List Item */
		var oListi = new sap.m.StandardListItem({
			title : "{/Name}",
			description : "{/Place}"
		});
		/* List Call */
		var oList = new sap.m.List({
			headerText : "Animal",
			items : [ oListi ]
		})
    
		oList.setModel(oModel);
		return new sap.m.Page({
			title : "List Page",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content : [ oList ]
		});
	}
});