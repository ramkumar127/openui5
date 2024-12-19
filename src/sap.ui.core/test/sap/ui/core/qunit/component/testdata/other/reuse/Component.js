sap.ui.define(["sap/ui/core/UIComponent"],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("testdata.other.reuse.Component", {
		metadata : {
			"sap.app": {
				"id": "testdata.other.reuse",
				"type": "application",
				"applicationVersion": {
					"version": "1.0.0"
				}
			},
			"sap.ui5": {
				"resources": {
					"css": [
						{
							"uri": "style3.css"
						}
					]
				},
				"models": {
					"": {
						"type": "sap.ui.model.json.JSONModel"
					},
					"myV2Model": {
						"type": "sap.ui.model.odata.v2.ODataModel",
						"uri": "./some/odata/service/"
					},
					"myV4Model": {
						"type": "sap.ui.model.odata.v4.ODataModel",
						"uri": "./some/odata/service/"
					}

				}
			}
		}
	});

	return Component;
});
