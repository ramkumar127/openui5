sap.ui.jsview("myfirstapp.HelloWorld", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.HelloWorld
	 */
	getControllerName : function() {
		return "myfirstapp.HelloWorld";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.HelloWorld
	 */
	createContent : function(oController) {

		/* Input Field Declaration */

		var oForm = new sap.m.VBox("vBox",{ 
			items : [new sap.m.Input({
				id : "Input",
				placeholder : "User Name",
				width: "60%"
			}).addStyleClass("Input"),
			new sap.m.Input({
				id : "Password",
				placeholder : "Password",
				width: "60%"
			}).addStyleClass("Pass"),
			
			new sap.m.Button({
				press : [ oController.Login, oController ],
				text : "Login",
				width: "60%"
			}).addStyleClass("Login")
		] 
		}).addStyleClass("Form_sm");

	/*	var oLable = new sap.m.Label({
			text : "Enter ID",
			labelFor : "Input",
			textAlign : "Center"
		});
		var oUname = new sap.m.Input({
			id : "Input",
			placeholder : "User Name",
			fieldWidth : "100%",
			width : "27%"
		}).addStyleClass("Input");
		var oPass = new sap.m.Input({
			id : "Password",
			placeholder : "Password",
			fieldWidth : "100%",
			width : "27%"
		}).addStyleClass("Pass");
		/* Button 
		var oButton = new sap.m.Button({
			press : [ oController.Login, oController ],
			text : "Login",
		}).addStyleClass("Login"); */
		
		var oPage = new sap.m.Page({
			title : "SAP Service And Warranty",
			content : [ 
				/*oUname, oPass, oButton*/
				oForm
				]
		});
		return oPage;
	}

});