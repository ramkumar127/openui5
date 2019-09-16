sap.ui.jsview("myfirstapp.Table1", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.Table1
	 */
	getControllerName : function() {
		return "myfirstapp.Table1";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.Table1
	 */
	createContent : function(oController) {
		/* Table Column */

		var col0 = new sap.ui.table.Column({
			label : new sap.m.Label({
				text : "Row"
			}),
			template : new sap.m.Text({
				text : "{List>Row}"
			})
		});
		var col1 = new sap.ui.table.Column({
			label : new sap.m.Label({
				text : "Name"
			}),
			template : new sap.m.Text({
				text : "{List>Name}"
			})
		});
		var col2 = new sap.ui.table.Column({
			label : new sap.m.Label({
				text : "Place"
			}),
			template : new sap.m.Text({
				text : "{List>Place}"
			})
		});

		/* Assign columns to Table */
		var oTable = new sap.ui.table.Table({
			/* title : "List of Animal", */
			columns : [ col0, col1, col2 ]
		});
		/* Bind Data To Table */
		oTable.bindRows({
			path : "List>/names"
		})
		return new sap.m.Page({
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content : [ oTable ]
		});
	}

});