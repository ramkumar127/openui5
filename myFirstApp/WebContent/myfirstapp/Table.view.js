sap.ui.jsview("myfirstapp.Table", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.Table
	 */
	getControllerName : function() {
		return "myfirstapp.Table";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.Table
	 */
	createContent : function(oController) {
		/* Table Column */

		var col1 = new sap.m.Column({
			header : new sap.m.Label({text:"Name"}) 
		});
		var col2 = new sap.m.Column({
			header : new sap.m.Label({text:"Place"})
		});
		var col0 = new sap.m.Column({
			header : new sap.m.Label({text:"Row"})
		});
		/* Assign columns to Table */
		var oTable = new sap.m.Table({
	/*	title : "List of Animal",*/
		columns : [ col0, col1, col2 ],
		/*itemPress  : [oController.Press_val,oController] */
		});
		/* List of Table Item */
		var oTablel = new sap.m.ColumnListItem({
			
			cells : [ new sap.m.Text({
				text : "{List>Row}"
			}), new sap.m.Text({
				text : "{List>Name}"
			}), new sap.m.Text({
				text : "{List>Place}"
			}),
			],
			type: 'Active',
			press : [oController.Press_val,oController] 
				
		});
		/* Bind Data To Table */
		oTable.bindItems({
			path : "List>/names",
			template : oTablel
		})
		return new sap.m.Page({
			title : "Simple Animal List",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content : [ oTable, oTablel ]
		});
	}

});