sap.ui.jsview("myfirstapp.listdet", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf myfirstapp.listdet
	*/ 
	getControllerName : function() {
		return "myfirstapp.listdet";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf myfirstapp.listdet
	*/ 
	createContent : function(oController) {
		
		var oLabel = new sap.m.Label({
			
			text : "{/TValue}"
			
		});
		
		var oLabesp = new sap.m.Label({
			
			text : "\n"
			
		});

		var oLabeld = new sap.m.Label({
			
			text : "{/DValue}"
			
		});

/*		var oShell = new sap.ui.ux3.Shell({
			
			showFeederTool:true,
			showLogoutButton : true,
			showSearchTool : true,
			content:[ 
				new sap.m.Button({
					text : "Condition in LIst",
					press : [ oController.ConList, oController ]
				})
			]
		});*/
		
		
		return new sap.m.Page({
			title: "List Details",
			showNavButton : true,
			navButtonPress : function(oEvent){
				app.back();
			},
			content: [
		
				oLabel,oLabesp,oLabeld
			]
		});
	}

});