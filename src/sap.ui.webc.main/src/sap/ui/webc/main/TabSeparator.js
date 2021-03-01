/*!
 * ${copyright}
 */

// Provides control sap.ui.webc.main.TabSeparator.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/TabSeparator"
], function(WebComponent, library) {
	"use strict";

	/**
	 * Constructor for a new <code>TabSeparator</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * @extends sap.ui.webc.common.WebComponent
	 *
	 * The <code>sap.ui.webc.main.TabSeparator</code> represents a vertical line to separate tabs inside a <code>sap.ui.webc.main.TabContainer</code>.
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimantal Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.TabSeparator
	 * @implements sap.ui.webc.main.ITab
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var TabSeparator = WebComponent.extend("sap.ui.webc.main.TabSeparator", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-tab-separator-ui5",
			interfaces: [
				"sap.ui.webc.main.ITab"
			]
		}
	});

	return TabSeparator;
});