sap.ui.jsview("myfirstapp.dynView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf myfirstapp.dynView
	*/ 
	getControllerName : function() {
		return "myfirstapp.dynView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf myfirstapp.dynView
	*/ 
	createContent : function(oController) {
		 var oData = {
				 names:[{
					   Name: "Tiger",
					   Place: "Pool"
				     },{
				       Name :"Gangaroo",
				       Place :"Garden"
				     },{
				       Name :"Dog",
				       Place :"House"
				     },{
				       Name : "Lion",
				       Place :"Mountain"
				     }]
		 };
		 
		 var oModel = new sap.ui.model.json.JSONModel();		 
		 var oList = new sap.m.List({
			 headerText:"Animal",
				itemPress: [oController.nav,oController],
				 items:[
					 
				 ]
		 })	
			
			oList.bindItems({
				path:"/names",
				template: new sap.m.StandardListItem({
					title:"{Name}",
					description: "{Place}",
					type: sap.m.ListType.Navigation,
				})
			});

		 oModel.setData(oData);
		 oList.setModel(oModel);

		 
		 return new sap.m.Page({
				title: "Multiple Items ",
				showNavButton : true,
				navButtonPress : function(oEvent){
					app.back();
				},
				content: [
				oList
				]
			});		
	}

});