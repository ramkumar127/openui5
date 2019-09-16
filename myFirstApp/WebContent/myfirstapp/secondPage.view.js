sap.ui.jsview("myfirstapp.secondPage", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf myfirstapp.secondPage
	 */
	getControllerName : function() {
		return "myfirstapp.secondPage";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf myfirstapp.secondPage
	 */
	createContent : function(oController) {
		var fForm = new sap.ui.layout.form.SimpleForm({
			content : [ new sap.m.Label({
				text : "Simple Form"
			}), new sap.m.Input({
				placeholder : "Simple Form"
			}), new sap.m.Button({
				text : "Press Me",
			    press:[oController.pressme,oController]
			}), new sap.m.Button({
				text : "Drag Me"
			}).addEventDelegate({
				onAfterRendering : function(bevnt) {
					$(bevnt.srcControl.getDomRef()).draggable({
						cancel : false
					});
				}
			}), new sap.m.RatingIndicator({
				value : 4.7,
				maxValue : 8,
				id : "rate"
			}), new sap.m.TextArea({
				value : " Awsome Text Area "
			}), new sap.m.DatePicker({
				placeholder : "Enter Date"
			}), new sap.ui.unified.FileUploader({
				placeholder : "Enter File Name"
			}), new sap.m.Bar({
				contentRight : [ new sap.m.Button({
					text : "Right Side"
				}) ]
			}), new sap.m.VBox({
				items : [ new sap.m.Button({
					text : "Vbox btn1"
				}), new sap.m.Button({
					text : "Vbox btn2"
				}) ]
			}), new sap.m.HBox({
				items : [ new sap.m.Button({
					text : "Hbox btn1"
				}), new sap.m.Button({
					text : "Hbox btn2"
				}) ]
			}), ]
		});
		var oText_i = new sap.m.Text("idLab")
		var oText = new sap.m.Text({
			text : "___Welcome to Service and Waranty!!!"
		});
		var oButton = new sap.m.Button({
			text : "Check Data Binding",
			press : [ oController.Data, oController ]
		});
		var oButtonl = new sap.m.Button({
			text : "Single list item",
			press : [ oController.List, oController ]
		});
		var oButtondl = new sap.m.Button({
			text : "Multiple list Item",
			press : [ oController.DynList, oController ]
		});
		var oButtondt = new sap.m.Button({
			text : "Table View",
			press : [ oController.Table, oController ]
		});
		var oButtondt1 = new sap.m.Button({
			text : "Table View with Selection",
			press : [ oController.Table1, oController ]
		});
		var oButtondt1s = new sap.m.Button({
			text : "Tiles",
			press : [ oController.Tiles, oController ]
		});
		var oButtondt1d = new sap.m.Button({
			text : "Tiles with data",
			press : [ oController.TilesData, oController ]
		});
		var oButtondtcl = new sap.m.Button({
			text : "Condition in LIst",
			press : [ oController.ConList, oController ]
		});
		

		var oPage1 = new sap.m.Page({
			title : "Button&Input Key ",
			showNavButton : true,
			navButtonPress : function(oEvent) {
				app.back();
			},
			content : [ oText_i, oText, fForm, oButton, oButtonl, oButtondl,
					oButtondt, oButtondt1, oButtondt1d, oButtondtcl,
					oButtondt1s]
		});

		return oPage1
	}

});