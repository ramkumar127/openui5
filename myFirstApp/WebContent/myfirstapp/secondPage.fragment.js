sap.ui.jsfragment("myfirstapp.secondPage",{
	createContent: function(oController){
		var oItemTemplate = new sap.m.StandardListItem({
			title:"{List>Name}",
			/*active:true*/
		});
		var oSetdialog = new sap.m.SelectDialog({
			title: "Animals1",
			/*type: "Active"	*/
		});

		oSetdialog.bindAggregation("items","List>/names",oItemTemplate);
	    return oSetdialog;
	}  
})